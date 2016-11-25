package service.partner.translation;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import core.service.services.TranslateService;
import service.partner.dao.CustomerGroupDao;
import service.partner.entities.CustomerGroup;

@Component
public class CustomerGroupTranslation extends TranslateService {
	
	@Autowired
	private CustomerGroupDao dao;
	
	@Override
	protected Map<String, String> load() {
		Map<String, String> maps = new HashedMap<String, String>();
		List<CustomerGroup> lists = dao.getAllData();
		for (CustomerGroup CustomerGroup : lists) {
			maps.put(String.valueOf(CustomerGroup.getId()), CustomerGroup.getName());
		}
		
		return maps;
	}

	@Override
	protected String getServiceKey() {
		return "catalogue.customer.group";
	}

}
