package web.monkey.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import web.monkey.dao.ProductGroupDao;
import web.monkey.entities.ProductGroup;
import web.monkey.shared.dto.ProductGroupDto;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.PRODUCT_GROUP_SERVICE)
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
