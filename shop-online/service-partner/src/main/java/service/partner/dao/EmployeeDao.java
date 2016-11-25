package service.partner.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Service;

import core.common.convert.ConverterUtils;
import core.dao.utils.BaseDao;
import core.dao.utils.QueryBuilder;
import service.partner.entities.Employee;
import service.partner.shared.dto.EmployeeDto;
import service.partner.shared.dto.WorkingStatus;

@Service
public class EmployeeDao extends BaseDao<Employee> {
	private static final long serialVersionUID = 1L;

	public List<EmployeeDto> getAllWithDetail(WorkingStatus status) {
		List<EmployeeDto> products = new ArrayList<EmployeeDto>();
		QueryBuilder builder = new QueryBuilder();
		builder.append("SELECT e.id, e.name, e.title, e.phone, e.sex, d.faceAmount, d.joinDate")
				.append(" FROM Employee as e LEFT JOIN e.detail as d")
				.append(" WHERE 1=1");
		if (status != null) {
			builder.append(" AND e.workingStatus = :status", "status", status);
		}

		Query query = builder.build(getEm());
		List<Object[]> resultList = query.getResultList();
		for (Object[] objects : resultList) {
			EmployeeDto dto = new EmployeeDto();
			int i = 0;
			dto.setId(ConverterUtils.toLong(objects[i++]));
			dto.setName(ConverterUtils.toString(objects[i++]));
			dto.setTitle(ConverterUtils.toString(objects[i++]));
			dto.setPhone(ConverterUtils.toString(objects[i++]));
			dto.setSex(ConverterUtils.toString(objects[i++]));
			dto.setFaceAmount(ConverterUtils.toBigDecimal(objects[i++]));
			dto.setJoinDate(ConverterUtils.toDate(objects[i++]));

			products.add(dto);
		}

		return products;
	}
}
