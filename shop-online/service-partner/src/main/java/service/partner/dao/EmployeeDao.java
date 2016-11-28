package service.partner.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.dao.entities.BaseEntity;
import core.dao.utils.BaseDao;
import service.partner.entities.Employee;
import service.partner.entities.EmployeeDetail;
import service.partner.shared.dto.EmployeeDto;
import service.partner.shared.dto.WorkingStatus;

@Service
public class EmployeeDao extends BaseDao<Employee> {
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private EmployeeDetailDao detailDao;

	public List<EmployeeDto> getAllWithDetail(WorkingStatus status) {
		Map<Long, EmployeeDto> maps = new HashedMap<>();
		List<EmployeeDto> dtos = new ArrayList<EmployeeDto>();
		List<Employee> entities = this.getAllDataByColumn(Employee.WORKING_STATUS, status);
		for (Employee entity : entities) {
			EmployeeDto dto = new EmployeeDto();
			entity.unBind(dto);
			
			maps.put(dto.getId(), dto);
			dtos.add(dto);
		}
		
		if (!maps.isEmpty()) {
			List<EmployeeDetail> details = detailDao.getAllDataByColumns(BaseEntity.ID, maps.keySet().toArray());
			for (EmployeeDetail employeeDetail : details) {
				employeeDetail.unBind(maps.get(employeeDetail.getId()));
			}
		}

		return dtos;
	}
}
