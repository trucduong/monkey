package service.catalogue.web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import service.catalogue.dao.ProductDao;
import service.catalogue.dao.ProductDetailDao;
import service.catalogue.entities.Product;
import service.catalogue.entities.ProductDetail;
import service.catalogue.shared.dto.ProductDto;
import service.catalogue.shared.utils.ProductStatus;
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
		ProductDto dto = new ProductDto();
		entity.bind(dto);
		
		//ProductDetail detail = detailDao.find(ProductDetail.PRODUCT_ID, id);
		ProductDetail detail = entity.getDetail();
		if (detail != null) {
			detail.bind(dto);
		}
		
		return success(dto);
	}
	
	@RequestMapping(value = ServiceCatalogueAction.UPDATE_D, method = RequestMethod.POST)
	public ServiceResult update(@RequestBody ProductDto dto, @PathVariable("id") long id) throws CommonException {
		init();
		Product product = dao.find(id);
		if (product == null) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		
		//ProductDetail detail = detailDao.find(ProductDetail.PRODUCT_ID, id);
		ProductDetail detail = product.getDetail();
		if (detail == null) {
			detail = new ProductDetail();
		}
		detail.unBind(dto);
		detail.setProduct(product);
		detailDao.update(detail);

		return success(dto);
	}
	
	@RequestMapping(value = ServiceCatalogueAction.READ_ALL_D, method = RequestMethod.GET)
	public ServiceResult readAllWithDetail() throws CommonException {
		init();
		List<ProductDto> products = dao.getAllWithDetail(ProductStatus.ACTIVE);
		if (products .size() == 0) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		
		return success(products);
	}
}
