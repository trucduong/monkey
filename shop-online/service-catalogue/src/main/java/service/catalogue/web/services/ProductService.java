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
		
		updateDetail(product, dto);

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
//	
//	@RequestMapping(value="/download/{type}", method = RequestMethod.GET)
//	public void downloadFile(HttpServletResponse response, @PathVariable("type") String type) throws IOException {
//	
//		File file = null;
//		
//		if(type.equalsIgnoreCase("internal")){
//			ClassLoader classloader = Thread.currentThread().getContextClassLoader();
//			file = new File(classloader.getResource(INTERNAL_FILE).getFile());
//		}else{
//			file = new File(EXTERNAL_FILE_PATH);
//		}
//		
//		if(!file.exists()){
//			String errorMessage = "Sorry. The file you are looking for does not exist";
//			System.out.println(errorMessage);
//			OutputStream outputStream = response.getOutputStream();
//			outputStream.write(errorMessage.getBytes(Charset.forName("UTF-8")));
//			outputStream.close();
//			return;
//		}
//		
//		String mimeType= URLConnection.guessContentTypeFromName(file.getName());
//		if(mimeType==null){
//			System.out.println("mimetype is not detectable, will take default");
//			mimeType = "application/octet-stream";
//		}
//		
//		System.out.println("mimetype : "+mimeType);
//		
//        response.setContentType(mimeType);
//        
//        /* "Content-Disposition : inline" will show viewable types [like images/text/pdf/anything viewable by browser] right on browser 
//            while others(zip e.g) will be directly downloaded [may provide save as popup, based on your browser setting.]*/
//        response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() +"\""));
//
//        
//        /* "Content-Disposition : attachment" will be directly download, may provide save as popup, based on your browser setting*/
//        //response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
//        
//        response.setContentLength((int)file.length());
//
//		InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
//
//        //Copy bytes from source to destination(outputstream in this example), closes both streams.
//        FileCopyUtils.copy(inputStream, response.getOutputStream());
//	}
//	
//	
	
	private int updateDetails(List<ProductDto> items) {
		int count = 0;
		List<Product> products = dao.getAllData();
		for (ProductDto item : items) {
			for (Product product : products) {
				if (item.getId() == product.getId()) {
					updateDetail(product, item);
					count ++;
				}
			}
		}
		
		return count;
	}
	
	private ProductDetail updateDetail(Product product, ProductDto productDto) {
		ProductDetail detail = product.getDetail();
		if (detail == null) {
			detail = new ProductDetail();
		}
		detail.unBind(productDto);
		detail.setProduct(product);
		detailDao.update(detail);
		return detail;
	}
}
