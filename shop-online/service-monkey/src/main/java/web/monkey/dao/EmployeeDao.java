package web.monkey.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseCachedDao;
import web.monkey.entities.Employee;
import web.monkey.shared.dto.EmployeeDto;
import web.monkey.shared.dto.WorkingStatus;

@Repository
public class EmployeeDao extends BaseCachedDao<Employee> {
	private static final long serialVersionUID = 1L;

	public List<EmployeeDto> getAllWithDetail(WorkingStatus status) {
		List<EmployeeDto> dtos = new ArrayList<EmployeeDto>();
		List<Employee> entities = this.getAllDataByColumn(Employee.WORKING_STATUS, status);
		for (Employee entity : entities) {
			EmployeeDto dto = new EmployeeDto();
			entity.unBind(dto);
			
			dtos.add(dto);
		}

		return dtos;
	}
}
