package service.catalogue.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import service.catalogue.dao.ProductGroupDao;
import service.catalogue.entities.ProductGroup;
import core.service.services.CRUDService;
import service.catalogue.shared.utils.ServiceCatalogueAction;

@RestController
@RequestMapping(ServiceCatalogueAction.PRODUCT_GROUP_SERVICE)
public class ProductGroupService extends CRUDService<ProductGroup> {

	@Autowired
	private ProductGroupDao dao;
	
	@Override
	protected BaseDao<ProductGroup> getDao() {
		return dao;
	}

	@Override
	protected ProductGroup createEntity() {
		return new ProductGroup();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}
}
