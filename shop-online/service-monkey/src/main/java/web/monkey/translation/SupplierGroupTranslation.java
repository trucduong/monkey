package web.monkey.translation;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import core.service.services.TranslateService;
import web.monkey.dao.SupplierGroupDao;
import web.monkey.entities.SupplierGroup;

@Component
public class SupplierGroupTranslation extends TranslateService {
	
	@Autowired
	private SupplierGroupDao dao;
	
	@Override
	protected Map<String, String> load() {
		Map<String, String> maps = new HashedMap<String, String>();
		List<SupplierGroup> lists = dao.getAllData();
		for (SupplierGroup SupplierGroup : lists) {
			maps.put(String.valueOf(SupplierGroup.getId()), SupplierGroup.getName());
		}
		
		return maps;
	}

	@Override
	protected String getServiceKey() {
		return "supplier.group";
	}

}
