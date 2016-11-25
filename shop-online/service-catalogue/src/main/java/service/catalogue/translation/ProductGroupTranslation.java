package service.catalogue.translation;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import core.service.services.TranslateService;
import service.catalogue.dao.ProductGroupDao;
import service.catalogue.entities.ProductGroup;

@Component
public class ProductGroupTranslation extends TranslateService {
	
	@Autowired
	private ProductGroupDao dao;
	
	@Override
	protected Map<String, String> load() {
		Map<String, String> maps = new HashedMap<String, String>();
		List<ProductGroup> lists = dao.getAllData();
		for (ProductGroup productGroup : lists) {
			maps.put(String.valueOf(productGroup.getId()), productGroup.getName());
		}
		
		return maps;
	}

	@Override
	protected String getServiceKey() {
		return "catalogue.product.group";
	}

}
