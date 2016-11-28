package service.catalogue.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import service.catalogue.dao.ProductGroupDao;
import service.catalogue.entities.ProductGroup;
import service.catalogue.shared.dto.ProductGroupDto;
import service.catalogue.shared.utils.ServiceCatalogueAction;

@RestController
@RequestMapping(ServiceCatalogueAction.PRODUCT_GROUP_SERVICE)
public class ProductGroupService extends CRUDService<ProductGroup, ProductGroupDto> {

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
	protected ProductGroupDto createDto() {
		return new ProductGroupDto();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}
}
