package service.partner.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import service.partner.dao.CustomerDao;
import service.partner.entities.Customer;
import service.partner.shared.utils.ServicePartnerAction;

@RestController
@RequestMapping(ServicePartnerAction.CUSTOMER_SERVICE)
public class CustomerService extends CRUDService<Customer> {

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
	protected Class<?> getThis() {
		return this.getClass();
	}
}
