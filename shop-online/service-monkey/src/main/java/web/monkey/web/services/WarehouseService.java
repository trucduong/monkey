package web.monkey.web.services;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.common.xsl.ExcelMappingProvider;
import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import web.monkey.dao.WarehouseDao;
import web.monkey.dao.WarehouseDetailDao;
import web.monkey.dao.WarehouseHistoryDao;
import web.monkey.dto.xsl.WarehouseDetailSheet;
import web.monkey.entities.WareHouseHistory;
import web.monkey.entities.Warehouse;
import web.monkey.shared.dto.WareHouseHistoryDto;
import web.monkey.shared.dto.WarehouseDetailDto;
import web.monkey.shared.dto.WarehouseDto;
import web.monkey.shared.dto.WarehouseHistoryType;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.WAREHOUSE_SERVICE)
public class WarehouseService extends CRUDService<Warehouse, WarehouseDto> {

	@Autowired
	private WarehouseDao dao;

	@Autowired
	private WarehouseHistoryDao historyDao;

//	@Autowired
//	private ProductDetailDao productDetailDao;

	@Autowired
	private WarehouseDetailDao warehouseDetailDao;

	@Override
	protected BaseDao<Warehouse> getDao() {
		return dao;
	}

	@Override
	protected Warehouse createEntity() {
		return new Warehouse();
	}

	@Override
	protected WarehouseDto createDto() {
		return new WarehouseDto();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}

	@RequestMapping(value = ServiceActions.WAREHOUSE_TRACKING, method = RequestMethod.POST)
	public ServiceResult importHistory(@PathVariable("type") String type, @RequestBody WareHouseHistoryDto dto)
			throws CommonException {
		init();
		// validation
		if (dto == null || dto.getDetails() == null || dto.getWarehouseId() <= 0) {
			return error(ServiceErrorCode.PARAMETER_ERROR);
		}

		// prepare data
		dto.setHistoryDateTime(new Date());
		WarehouseHistoryType historyType = WarehouseHistoryType.fromString(type);
		dto.setHistoryType(historyType);

		// get warehouse
		Warehouse warehouse = dao.find(dto.getWarehouseId());
		if (warehouse == null) {
			return error(ServiceErrorCode.NOT_FOUND, "Warehouse not found!");
		}

		// insert history
		WareHouseHistory history = new WareHouseHistory();
		history.bind(dto);
		historyDao.create(history);

		// update product detail
//		if (historyType == WarehouseHistoryType.IMPORT) {
//			productDetailDao.importDetails(dto.getDetails());
//		}

		// update product remaining
//		for (ProductDto product : dto.getDetails()) {
//			WarehouseDetail detail = warehouseDetailDao.find(
//					new String[] { WarehouseDetail.WAREHOUSE_ID, WarehouseDetail.PRODUCT_ID },
//					new Long[] { dto.getWarehouseId(), product.getId() });
//			if (detail == null) {
//				detail = new WarehouseDetail();
//				detail.setProductId(product.getId());
//				detail.setWarehouseId(dto.getWarehouseId());
//				detail.setRemaining(0);
//			}
//
//			if (historyType == WarehouseHistoryType.IMPORT 
//					|| historyType == WarehouseHistoryType.IMPORT_RETURNS) {
//				detail.setRemaining(detail.getRemaining() + product.getRemaining());
//
//			} else if (historyType == WarehouseHistoryType.EXPORT
//					|| historyType == WarehouseHistoryType.EXPORT_RETURNS) {
//				long remaining = detail.getRemaining() - product.getRemaining();
//				remaining = remaining > 0 ? remaining : 0;
//				detail.setRemaining(remaining);
//
//			} else if (historyType == WarehouseHistoryType.DETAIL) {
//				detail.setRemaining(product.getRemaining());
//				
//			} else if (historyType == WarehouseHistoryType.TRANSFER) {
//				long remaining = detail.getRemaining() - product.getRemaining();
//				remaining = remaining > 0 ? remaining : 0;
//				detail.setRemaining(remaining);
//				
//				
//				WarehouseDetail detail2 = warehouseDetailDao.find(
//						new String[] { WarehouseDetail.WAREHOUSE_ID, WarehouseDetail.PRODUCT_ID },
//						new Long[] { dto.getCustomer(), product.getId() }); // use customerfield as second warehouse
//				if (detail2 == null) {
//					detail2 = new WarehouseDetail();
//					detail2.setWarehouseId(dto.getCustomer());
//					detail2.setProductId(product.getId());
//					detail2.setRemaining(0);
//				} else {
//					detail2.setRemaining(detail2.getRemaining() + product.getRemaining());
//				}
//				warehouseDetailDao.update(detail2);
//			}
//
//			warehouseDetailDao.update(detail);
//		}

		return success(true);
	}

//	@RequestMapping(value = ServiceActions.WAREHOUSE_HISTORY, method = RequestMethod.GET)
//	public ServiceResult getAllImportHistory(@PathVariable("type") String type, WarehouseSearchCondition condition) throws CommonException {
//		init();
//		WarehouseHistoryType historyType = WarehouseHistoryType.fromString(type);
//		List<WareHouseHistoryDetailDto> histories = historyDao.getAllHistory(historyType, condition);
//		if (histories.isEmpty()) {
//			return error(ServiceErrorCode.NOT_FOUND);
//		}
//
//		return success(histories);
//	}


	@RequestMapping(value = ServiceActions.WAREHOUSE_DETAIL, method = RequestMethod.GET)
	public ServiceResult readBy(
			@RequestParam(name = "warehouse", required = false, defaultValue = "0") long warehouseId,
			@RequestParam(name = "product", required = false, defaultValue = "0") long productId)
			throws CommonException {
		init();
		if (warehouseId > 0) {
			if (productId > 0) {
				WarehouseDetailDto detail = warehouseDetailDao.getDetail(warehouseId, productId);
				if (detail == null) {
					return error(ServiceErrorCode.NOT_FOUND);
				}
				return success(detail);
			} else {
				List<WarehouseDetailDto> details = warehouseDetailDao.getDetailsByWarehouse(warehouseId);
				if (details.size() == 0) {
					return error(ServiceErrorCode.NOT_FOUND);
				}
				return success(details);
			}
		} else {
			List<WarehouseDetailDto> details = warehouseDetailDao.getDetailsByProduct(productId);
			if (details.size() == 0) {
				return error(ServiceErrorCode.NOT_FOUND);
			}
			return success(details);
		}
	}

	@RequestMapping(value = ServiceActions.DOWNLOAD_DETAILS, method = RequestMethod.GET)
	public void exportPrices(HttpServletResponse response) throws IOException, CommonException {
		try {
			init();
			// load
			List<WarehouseDetailSheet> items = warehouseDetailDao.getDetailsToExport();
			if (items.size() == 0) {
				throw new CommonException(ServiceErrorCode.NOT_FOUND);
			}

			InputStream file = getClass().getClassLoader()
					.getResourceAsStream("template/warehouse/warehouse_detail_export_vi.xlsx");

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

			/*
			 * "Content-Disposition : attachment" will be directly download, may
			 * provide save as popup, based on your browser setting
			 */
			response.setHeader("Content-Disposition",
					String.format("attachment; filename=\"%s\"", "Bang Kiem Kho.xlsx"));

			// response.setContentLength(resource.getContent().length);

			boolean result = ExcelMappingProvider.write(WarehouseDetailSheet.class, items, file,
					response.getOutputStream());
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
}
