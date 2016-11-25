package service.partner.web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import service.partner.dao.EmployeeDao;
import service.partner.dao.EmployeeDetailDao;
import service.partner.entities.Employee;
import service.partner.entities.EmployeeDetail;
import service.partner.shared.dto.EmployeeDto;
import service.partner.shared.dto.WorkingStatus;
import service.partner.shared.utils.ServicePartnerAction;

@RestController
@RequestMapping(ServicePartnerAction.EMPLOYEE_SERVICE)
public class EmployeeService extends CRUDService<Employee> {

	@Autowired
	private EmployeeDao dao;
	
	@Autowired
	private EmployeeDetailDao detailDao;
	
	@Override
	protected BaseDao<Employee> getDao() {
		return dao;
	}

	@Override
	protected Employee createEntity() {
		return new Employee();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}
	
	@RequestMapping(value = ServicePartnerAction.UPDATE_D, method = RequestMethod.POST)
	public ServiceResult update(@RequestBody EmployeeDto dto, @PathVariable("id") long id) throws CommonException {
		init();
		Employee entity = dao.find(id);
		if (entity == null) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		updateDetail(entity, dto);

		return success(dto);
	}

	@RequestMapping(value = ServicePartnerAction.READ_ALL_D, method = RequestMethod.GET)
	public ServiceResult readAllWithDetail() throws CommonException {
		init();
		List<EmployeeDto> dtos = dao.getAllWithDetail(WorkingStatus.WORKING);
		if (dtos.size() == 0) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		return success(dtos);
	}
	
	private EmployeeDetail updateDetail(Employee entity, EmployeeDto dto) {
		EmployeeDetail detail = entity.getDetail();
		if (detail == null) {
			detail = new EmployeeDetail();
		}
		detail.bind(dto);
		detail.setEmployee(entity);
		detailDao.update(detail);
		return detail;
	}
}
