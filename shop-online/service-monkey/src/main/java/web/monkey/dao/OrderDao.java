package web.monkey.dao;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseDao;
import web.monkey.entities.Order;

@Repository
public class OrderDao extends BaseDao<Order> {
	private static final long serialVersionUID = 1L;

//	@Transactional
//	public void create(OrderDto dto) throws CommonException {
//		Order order = new Order();
//		order.bind(dto);
//
//		Employee employee = getEm().find(Employee.class, dto.getEmployeeId());
//		order.setEmployee(employee);
//
//		Customer customer = getEm().find(Customer.class, dto.getCustomerId());
//		order.setCustomer(customer);
//
//		Warehouse warehouse = getEm().find(Warehouse.class, dto.getWarehouseId());
//		order.setWarehouse(warehouse);
//		for (OrderDetailDto detailDto : dto.getDetails()) {
//			OrderDetail detail = new OrderDetail();
//			detail.bind(detailDto);
//			Product product = getEm().find(Product.class, detailDto.getPruductId());
//			detail.setProduct(product);
//			detail.setOrder(order);
//			order.addDetail(detail);
//		}
//
//		if (dto.getPayments() != null && dto.getPayments().size() > 0) {
//			for (OrderPaymentDto paymentDto : dto.getPayments()) {
//				OrderPayment payment = new OrderPayment();
//				payment.bind(paymentDto);
//				payment.setOrder(order);
//				order.addPayment(payment);
//			}
//		}
//
//		getEm().merge(order);
//	}
}
