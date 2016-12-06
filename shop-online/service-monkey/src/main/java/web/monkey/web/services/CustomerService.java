package web.monkey.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import web.monkey.dao.CustomerDao;
import web.monkey.entities.Customer;
import web.monkey.shared.dto.CustomerDto;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.CUSTOMER_SERVICE)
public class CustomerService extends CRUDService<Customer, CustomerDto> {

	@Autowired
	private CustomerDao dao;
	
	@Override
	protected BaseDao<Customer> getDao() {
		return dao;
	}

	@Override
	protected Customer createEntity() {
		return new Customer();
	}
	
	@Override
	protected CustomerDto createDto() {
		return new CustomerDto();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}
}
