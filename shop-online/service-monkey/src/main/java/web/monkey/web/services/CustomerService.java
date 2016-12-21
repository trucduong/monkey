package web.monkey.web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import core.service.utils.CRUDServiceAction;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
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
	
	
	@RequestMapping(value = ServiceActions.READ_D, method = RequestMethod.GET)
	public ServiceResult readD(@PathVariable(value = CRUDServiceAction.PARAM_ID) long id) throws CommonException {
		CustomerDto dto = dao.findD(id);
		if (dto == null) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		return success(dto);
	}

	@RequestMapping(value = ServiceActions.READ_ALL_D, method = RequestMethod.GET)
	public ServiceResult readAllD() throws CommonException {
		List<CustomerDto> dtos = dao.getAllDataD();
		if (dtos.isEmpty()) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		return success(dtos);
	}
}
