package web.monkey.dao;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import core.dao.utils.BaseDao;
import web.monkey.entities.Customer;
import web.monkey.entities.Employee;
import web.monkey.entities.Order;
import web.monkey.entities.OrderDetail;
import web.monkey.entities.Product;
import web.monkey.shared.dto.OrderDetailDto;
import web.monkey.shared.dto.OrderDto;

@Repository
public class OrderDao extends BaseDao<Order> {
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private OrderDetailDao detailDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private EmployeeDao employeeDao;
	
	@Autowired
	private CustomerDao customerDao; 
	
	@Transactional
	public void create(OrderDto dto) {
		Order order = new Order();
		order.bind(dto);
		
		Employee employee = employeeDao.find(dto.getEmployeeId());
		order.setEmployee(employee);
		
		Customer customer = customerDao.find(dto.getCustomerId());
		order.setCustomer(customer);
		create(order);
		
		for (OrderDetailDto detailDto : dto.getDetails()) {
			OrderDetail detail = detailDao.find(detailDto.getId());
			detail.bind(detailDto);
			detail.setOrder(order);
			
			Product product = productDao.find(detailDto.getPruductId());
			detail.setProduct(product);
			
			detailDao.create(detail);
		}
	}
}
