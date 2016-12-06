package web.monkey.translation;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import core.service.services.TranslateService;
import web.monkey.dao.SupplierDao;
import web.monkey.entities.Supplier;

@Component
public class SupplierTranslation extends TranslateService {

	@Autowired
	private SupplierDao dao;
	
	@Override
	protected Map<String, String> load() {
		Map<String, String> maps = new HashedMap<String, String>();
		List<Supplier> lists = dao.getAllData();
		for (Supplier item : lists) {
			maps.put(String.valueOf(item.getId()), item.getName());
		}
		
		return maps;
	}

	@Override
	protected String getServiceKey() {
		return "supplier.list";
	}

}
