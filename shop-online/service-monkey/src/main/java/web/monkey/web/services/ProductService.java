package web.monkey.web.services;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.common.xsl.ExcelMappingProvider;
import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import web.monkey.dao.ProductDao;
import web.monkey.dao.ProductDetailDao;
import web.monkey.dto.xsl.ProductPricesSheet;
import web.monkey.entities.Product;
import web.monkey.entities.ProductDetail;
import web.monkey.shared.dto.ProductDto;
import web.monkey.shared.dto.ProductStatus;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.PRODUCT_SERVICE)
public class ProductService extends CRUDService<Product, ProductDto> {

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
	
	@Override
	protected ProductDto createDto() {
		return new ProductDto();
	}

	@RequestMapping(value = ServiceActions.READ_ALL_REF, method = RequestMethod.GET)
	public ServiceResult readAllRef() throws CommonException {
		init();
		List<ProductDto> products = dao.getProductRef(ProductStatus.ACTIVE);
		if (products.size() == 0) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		return success(products);
	}
	
	@RequestMapping(value = ServiceActions.UPDATE_D, method = RequestMethod.POST)
	public ServiceResult updateDetail(@RequestBody ProductDto dto, @PathVariable("id") long id) throws CommonException {
		init();
		Product product = dao.find(id);
		if (product == null) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		// create or update detail
		ProductDetail detail = detailDao.find(id);
		if (detail == null) {
			detail = new ProductDetail();
		}
		detail.bind(dto);
		detailDao.update(detail);

		return success(dto);
	}
	
	@RequestMapping(value = ServiceActions.READ_ALL_D, method = RequestMethod.GET)
	public ServiceResult readAllWithDetail() throws CommonException {
		init();
		List<ProductDto> products = dao.getAllWithDetail(ProductStatus.ACTIVE);
		if (products.size() == 0) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		return success(products);
	}

	@RequestMapping(value = ServiceActions.DOWNLOAD_PRICES, method = RequestMethod.GET)
	public void exportPrices(HttpServletResponse response) throws IOException, CommonException {
		try {
			init();
			// load prices
			List<ProductPricesSheet> products = dao.getProductPriceToExport(ProductStatus.ACTIVE);
			if (products.size() == 0) {
				throw new CommonException(ServiceErrorCode.NOT_FOUND);
			}

			InputStream file = getClass().getClassLoader().getResourceAsStream("template/product/product_prices_export_vi.xlsx");

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

			/*
			 * "Content-Disposition : attachment" will be directly download, may
			 * provide save as popup, based on your browser setting
			 */
			response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", "Bang Gia.xlsx"));

			// response.setContentLength(resource.getContent().length);

			boolean result = ExcelMappingProvider.write(ProductPricesSheet.class, products, file, response.getOutputStream());
			if (!result) {
				throw new CommonException(ServiceErrorCode.NOT_FOUND);
			}
		} catch (Exception e) {
			String errorMessage = "Sorry. The file you are looking for does not exist";
            OutputStream outputStream = response.getOutputStream();
            outputStream.write(errorMessage.getBytes(Charset.forName("UTF-8")));
            outputStream.close();
		}
	}
	
	@Override
	protected void onDeleteSucceed(long id) {
		// remove detail
		detailDao.delete(id);
	}
}
