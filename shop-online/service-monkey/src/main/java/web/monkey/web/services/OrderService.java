package web.monkey.web.services;

import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.dao.utils.DaoUtils;
import core.service.error.InvalidValueError;
import core.service.error.ServiceError;
import core.service.services.BaseService;
import core.service.utils.CRUDServiceAction;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import web.monkey.dao.OrderDao;
import web.monkey.dao.ShopDao;
import web.monkey.dao.WarehouseDetailDao;
import web.monkey.entities.Customer;
import web.monkey.entities.Employee;
import web.monkey.entities.Order;
import web.monkey.entities.OrderDetail;
import web.monkey.entities.OrderPayment;
import web.monkey.entities.Product;
import web.monkey.entities.Shop;
import web.monkey.entities.Warehouse;
import web.monkey.pdf.order.OrderPdfGenerator;
import web.monkey.pdf.order.OrderPdfGeneratorModel;
import web.monkey.pdf.order.OrderPdfGeneratorModel.OrderPdfDetail;
import web.monkey.shared.dto.OrderDetailDto;
import web.monkey.shared.dto.OrderDto;
import web.monkey.shared.dto.OrderPaymentDto;
import web.monkey.shared.dto.OrderStatus;
import web.monkey.shared.dto.PaymentStatus;
import web.monkey.shared.dto.WarehouseDetailDto;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.ORDER_SERVICE)
public class OrderService extends BaseService {

	@Autowired
	private OrderDao dao;
	
	@Autowired
	private ShopDao shopDao;

	@Autowired
	private WarehouseDetailDao warehouseDetailDao;

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}

	@RequestMapping(value = CRUDServiceAction.CREATE, method = RequestMethod.POST)
	public ServiceResult create(@RequestBody OrderDto dto) throws CommonException {
		// validation
		List<ServiceError> errors = new ArrayList<ServiceError>();
		List<WarehouseDetailDto> warehouseDetails = new ArrayList<WarehouseDetailDto>();
		for (OrderDetailDto detail : dto.getDetails()) {
			WarehouseDetailDto warehouseDetail = warehouseDetailDao.getDetail(dto.getWarehouseId(),
					detail.getProductId());
			long currentRemaining = warehouseDetail != null ? warehouseDetail.getRemaining() : 0;
			if (detail.getRemaining() <= 0 || detail.getRemaining() > currentRemaining) {
				errors.add(InvalidValueError.greaterThan("remaining", detail.getRemaining(), currentRemaining,
						detail.getProductName()));
			} else {
				warehouseDetail.setRemaining(currentRemaining - detail.getRemaining());
				warehouseDetails.add(warehouseDetail);
			}
		}

		if (errors.size() > 0) {
			return error(ServiceErrorCode.INVALID_VALUE, errors);
		}

		// set default value
		dto.setCreateDate(new Date());
		dto.setStatus(OrderStatus.ACTIVE);
		if (dto.getPayments() == null || dto.getPayments().size() == 0) {
			dto.setPaymentStatus(PaymentStatus.NOT_PAID);
		}

		// create order
		Order order = new Order();
		order.bind(dto);
		String employeeName = "";
		if (DaoUtils.isValidId(dto.getEmployeeId())) {
			Employee employee = dao.getEm().find(Employee.class, dto.getEmployeeId());
			order.setEmployee(employee);
			employeeName = employee.getName();
		}
		String customerName = "";
		if (DaoUtils.isValidId(dto.getCustomerId())) {
			Customer customer = dao.getEm().find(Customer.class, dto.getCustomerId());
			order.setCustomer(customer);
			customerName = customer.getName();
		}
		Warehouse warehouse = dao.getEm().find(Warehouse.class, dto.getWarehouseId());
		order.setWarehouse(warehouse);

		// create payment
		if (dto.getPayments() != null) {
			BigDecimal total = BigDecimal.ZERO;
			for (OrderPaymentDto paymentDto : dto.getPayments()) {
				OrderPayment payment = new OrderPayment();
				payment.bind(paymentDto);
				payment.setCustomerName(customerName);
				payment.setEmployeeName(employeeName);
				payment.setOrder(order);
				order.addPayment(payment);
				total = total.add(payment.getTotal());
			}

			if (order.getTotal().equals(total)) {
				order.setPaymentStatus(PaymentStatus.PAID_DONE);
			} else {
				order.setPaymentStatus(PaymentStatus.PAID);
			}
		}

		// create detail
		for (OrderDetailDto detailDto : dto.getDetails()) {
			OrderDetail detail = new OrderDetail();
			detail.bind(detailDto);
			detail.setId(0);
			Product product = dao.getEm().find(Product.class, detailDto.getProductId());
			detail.setProduct(product);
			detail.setOrder(order);
			order.addDetail(detail);
		}

		dao.create(order);

		// update product remaining
		for (WarehouseDetailDto warehouseDetail : warehouseDetails) {
			warehouseDetailDao.createOrUpdate(warehouseDetail);
		}

		dto.setId(order.getId());
		return success(dto);
	}

	@RequestMapping(value = CRUDServiceAction.READ, method = RequestMethod.GET)
	public ServiceResult read(@PathVariable(value = CRUDServiceAction.PARAM_ID) long id) throws CommonException {

		Order entity = dao.find(id);

		if (entity == null) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		OrderDto dto = new OrderDto();
		entity.unBind(dto);

		return success(dto);
	}
	
	@RequestMapping(value = ServiceActions.DOWNLOAD_ORDER, method = RequestMethod.GET)
	public void exportPrices(@PathVariable(value = CRUDServiceAction.PARAM_ID) long id, HttpServletResponse response) throws IOException, CommonException {
		try {
			init();
			OrderPdfGenerator generator = new OrderPdfGenerator(id);
			OrderPdfGeneratorModel model = createOrderPdfModel(id);
			
			boolean result = generator.generate(model, response.getOutputStream());
			if (!result) {
				throw new CommonException(ServiceErrorCode.NOT_FOUND);
			}
			response.setContentType("application/pdf");
			response.setHeader("Content-Disposition", String.format("inline; filename=\"%s\"", "Phieu Xuat Kho.pdf"));
		} catch (Exception e) {
			String errorMessage = "Sorry. The file you are looking for does not exist";
            OutputStream outputStream = response.getOutputStream();
            outputStream.write(errorMessage.getBytes(Charset.forName("UTF-8")));
            outputStream.close();
		}
	}
	
	private OrderPdfGeneratorModel createOrderPdfModel(long orderId) throws CommonException {
		OrderPdfGeneratorModel model = new OrderPdfGeneratorModel();
		model.setCurrentDate(new Date());
		
		// Shop
		List<Shop> shops = shopDao.getAllData();
		if (shops.size() > 0) {
			Shop shop = shops.get(0);
			model.setCompany(shop.getName());
			model.setPhone(shop.getPhone());
			model.setAddress(shop.getAddress());
		}
		
		// Order
		Order order = dao.find(orderId);
		if (order == null) {
			throw new CommonException(ServiceErrorCode.NOT_FOUND);
		}
		model.setDescription(order.getDescription());
		Employee employee = order.getEmployee();
		if (employee != null) {
			model.setEmployee(employee.getName() + ", SDT: " + employee.getPhone());
		}
		// TODO: check customer here
		
		Warehouse warehouse = order.getWarehouse();
		model.setWarehouse(warehouse.getName() + ", SDT: " + warehouse.getPhone());
		
		// Order detail
		Set<OrderDetail> details = order.getDetails();
		List<OrderPdfDetail> modelDetails = new ArrayList<OrderPdfDetail>();
		for (OrderDetail orderDetail : details) {
			OrderPdfDetail detail = model.new OrderPdfDetail();
			detail.setDescription(orderDetail.getDescription());
			detail.setProductName(orderDetail.getProduct().getName());
			detail.setRemaining(String.valueOf(orderDetail.getRemaining()));
			modelDetails.add(detail);
		}
		model.setDetails(modelDetails);
		
		return model;
	}
}
