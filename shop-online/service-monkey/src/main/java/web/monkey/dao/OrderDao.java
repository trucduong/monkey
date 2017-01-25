package web.monkey.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseDao;
import core.dao.utils.DaoUtils;
import core.dao.utils.QueryBuilder;
import web.monkey.entities.Order;
import web.monkey.shared.dto.OrderDto;
import web.monkey.shared.dto.OrderSearchCondition;

@Repository
public class OrderDao extends BaseDao<Order> {
	private static final long serialVersionUID = 1L;

//	public List<OrderDto> search(SearchCondition searchCondition) {
//		NativeQueryBuilder builder = new NativeQueryBuilder();
//		builder.append("select o.id, o.createDate, o.description, o.status, o.paymentStatus, o.total, o.totalDiscount, w.id as wid, w.name as wname, e.id as eid, e.name as ename");
//		
//		// from
//		builder.append(" from Order o left join o.warehouse w left join o.employee e");
//		
//		// where
//		if (searchCondition.hasFilter()) {
//			builder.append(" where 1=1");
//			if (searchCondition.getFilter(OrderFieldTransformation.FROM_DATE) != null) {
//				builder.append(" AND o.createDate >= :formDate", "formDate", searchCondition.getFilter(OrderFieldTransformation.FROM_DATE));
//			}
//			
//			if (searchCondition.getFilter(OrderFieldTransformation.TO_DATE) != null) {
//				builder.append(" AND o.createDate <= :toDate", "toDate", searchCondition.getFilter(OrderFieldTransformation.TO_DATE));
//			}
//			
//			if (searchCondition.getFilter(OrderFieldTransformation.EMPLOYEE) != null) {
//				builder.append(" AND e.id == :employeeId", "employeeId", searchCondition.getFilter(OrderFieldTransformation.EMPLOYEE));
//			}
//			
//			if (searchCondition.getFilter(OrderFieldTransformation.WAREHOUSE) != null) {
//				builder.append(" AND w.id == :warehouseId", "warehouseId", searchCondition.getFilter(OrderFieldTransformation.WAREHOUSE));
//			}
//			
//			if (searchCondition.getFilter(OrderFieldTransformation.PAYMENT_STATUS) != null) {
//				builder.append(" AND o.paymentStatus == :paymentStatus", "paymentStatus", searchCondition.getFilter(OrderFieldTransformation.PAYMENT_STATUS));
//			}
//		}
//		
//		// paging
//		
//		// order
//		if (searchCondition.getOrder() != null) {
//			FieldTransformation transformer = new OrderFieldTransformation();
//			builder.appendSort(searchCondition.getOrder(), transformer);
//		}
//		
//		String[] columns = new String[] {"id", "createDate", "description", "status", "paymentStatus", "total", "totalDiscount", "warehouseId", "warehouseName", "employeeId", "employeeName"};
//		List<OrderDto> results = DaoUtils.selectAll(getEm(), builder, OrderDto.class, columns);
//		return results;
//	}
	
	public List<OrderDto> search(OrderSearchCondition searchCondition) {
		QueryBuilder builder = new QueryBuilder();
		builder.append("select o.id, o.createDate, o.description, o.status, o.paymentStatus, o.total, o.totalDiscount, w.id as wid, w.name as wname, e.id as eid, e.name as ename");
		
		// from
		builder.append(" from Order o left join o.warehouse w left join o.employee e");
		
		// where
		builder.append(" where 1=1");
		if (searchCondition.getFromDate() != null) {
			builder.append(" AND o.createDate >= :formDate", "formDate", searchCondition.getFromDate());
		}
		
		if (searchCondition.getToDate() != null) {
			builder.append(" AND o.createDate <= :toDate", "toDate", searchCondition.getToDate());
		}
		
		if (searchCondition.getEmployee() != null) {
			builder.append(" AND e.id == :employeeId", "employeeId", searchCondition.getEmployee());
		}
		
		if (searchCondition.getWarehouse() != null) {
			builder.append(" AND w.id == :warehouseId", "warehouseId", searchCondition.getWarehouse());
		}
		
		if (searchCondition.getPaymentStatus() != null) {
			builder.append(" AND o.paymentStatus == :paymentStatus", "paymentStatus", searchCondition.getPaymentStatus());
		}
		
		// paging
		
		// order
		builder.append(" order by o.createDate desc");
		
		String[] columns = new String[] {"id", "createDate", "description", "status", "paymentStatus", "total", "totalDiscount", "warehouseId", "warehouseName", "employeeId", "employeeName"};
		List<OrderDto> results = DaoUtils.selectAll(getEm(), builder, OrderDto.class, columns);
		return results;
	}
	
	
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
