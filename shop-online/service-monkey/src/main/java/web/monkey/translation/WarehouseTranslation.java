package web.monkey.translation;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import core.service.services.TranslateService;
import web.monkey.dao.WarehouseDao;
import web.monkey.entities.Warehouse;

@Component
public class WarehouseTranslation extends TranslateService {

	@Autowired
	private WarehouseDao dao;
	
	@Override
	protected Map<String, String> load() {
		Map<String, String> maps = new HashedMap<String, String>();
		List<Warehouse> lists = dao.getAllData();
		for (Warehouse item : lists) {
			maps.put(String.valueOf(item.getId()), item.getName());
		}
		
		return maps;
	}

	@Override
	protected String getServiceKey() {
		return "warehouse.list";
	}

}
