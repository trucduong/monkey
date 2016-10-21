package service.catalogue.web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.common.reflect.ObjectModifier;
import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import service.catalogue.dao.ProductDao;
import service.catalogue.dao.ProductDetailDao;
import service.catalogue.entities.Product;
import service.catalogue.entities.ProductDetail;
import service.catalogue.shared.dto.ProductDto;
import service.catalogue.shared.utils.ServiceCatalogueAction;

@RestController
@RequestMapping(ServiceCatalogueAction.PRODUCT_SERVICE)
public class ProductService extends CRUDService<Product> {

	@Autowired
	private ProductDao dao;
	
	@Autowired
	private ProductDetailDao detailDao;
	
	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}
	
	@Override
	protected BaseDao<Product> getDao() {
		return dao;
	}

	@Override
	protected Product createEntity() {
		return new Product();
	}
	
	@RequestMapping(value = ServiceCatalogueAction.READ_D, method = RequestMethod.GET)
	public ServiceResult readWithDetail(@PathVariable(value = ServiceCatalogueAction.PARAM_ID) long id) throws CommonException {
		init();
		Product entity = dao.find(id);
		if (entity == null) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		
		ProductDetail detail = detailDao.find(id);
		if (detail == null) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		ProductDto dto = new ProductDto();
		ObjectModifier.bind(entity, dto);
		ObjectModifier.bind(detail, dto);
		
		return success(dto);
	}
	
	@RequestMapping(value = ServiceCatalogueAction.READ_BY_D, method = RequestMethod.GET)
	public ServiceResult readByWithDetail(@PathVariable(value = ServiceCatalogueAction.PARAM_NAME) String name,
			@PathVariable(value = ServiceCatalogueAction.PARAM_VALUE) String value) throws CommonException {
		init();
		
		Product entity;
		ProductDetail detail;
		
		List<Product> entities = dao.getAllDataByColumn(name, value);
		if (entities.isEmpty()) {
			List<ProductDetail> details = detailDao.getAllDataByColumn(name, value);
			if (details.isEmpty()) {
				return error(ServiceErrorCode.NOT_FOUND);
			}
			
			detail = details.get(0);
			entity = dao.find(detail.getId());
		} else {
			entity = entities.get(0);
			detail = detailDao.find(entity.getId());
		}
		
		ProductDto dto = new ProductDto();
		ObjectModifier.bind(entity, dto);
		ObjectModifier.bind(detail, dto);
		
		return error(ServiceErrorCode.NOT_FOUND);
	}
}
