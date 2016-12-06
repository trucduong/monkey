package web.monkey.translation;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import core.service.services.TranslateService;
import web.monkey.dao.EmployeeDao;
import web.monkey.entities.Employee;

@Component
public class EmployeeTranslation extends TranslateService {

	@Autowired
	private EmployeeDao dao;
	
	@Override
	protected Map<String, String> load() {
		Map<String, String> maps = new HashedMap<String, String>();
		List<Employee> lists = dao.getAllData();
		for (Employee item : lists) {
			maps.put(String.valueOf(item.getId()), item.getName());
		}
		
		return maps;
	}

	@Override
	protected String getServiceKey() {
		return "employee.list";
	}

}
