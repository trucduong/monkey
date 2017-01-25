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
import core.dao.utils.DaoUtils;
import core.service.services.CRUDService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import web.monkey.dao.EmployeeDao;
import web.monkey.dao.ProductDao;
import web.monkey.dao.WarehouseDao;
import web.monkey.dao.WarehouseDetailDao;
import web.monkey.dao.WarehouseHistoryDao;
import web.monkey.dto.xsl.WarehouseDetailSheet;
import web.monkey.entities.Employee;
import web.monkey.entities.WareHouseHistory;
import web.monkey.entities.Warehouse;
import web.monkey.shared.dto.WareHouseHistoryDto;
import web.monkey.shared.dto.WarehouseDetailDto;
import web.monkey.shared.dto.WarehouseDto;
import web.monkey.shared.dto.WarehouseHistoryType;
import web.monkey.shared.dto.WarehouseProductDto;
import web.monkey.shared.dto.WarehouseSearchCondition;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.WAREHOUSE_SERVICE)
public class WarehouseService extends CRUDService<Warehouse, WarehouseDto> {

	@Autowired
	private WarehouseDao dao;
	
	@Autowired
	private ProductDao productDao;

	@Autowired
	private WarehouseHistoryDao historyDao;

	@Autowired
	private WarehouseDetailDao warehouseDetailDao;
	
	@Autowired
	private EmployeeDao employeeDao;

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

		//update product detail
		if (historyType == WarehouseHistoryType.IMPORT) {
			productDao.updatePrices(dto.getDetails());
		}

		// update product remaining
		for (WarehouseProductDto product : dto.getDetails()) {
			WarehouseDetailDto detailDto = warehouseDetailDao.getDetail(dto.getWarehouseId(), product.getId());
			if (detailDto == null) {
				detailDto = new WarehouseDetailDto();
				detailDto.setProductId(product.getId());
				detailDto.setWarehouseId(dto.getWarehouseId());
				detailDto.setRemaining(0);
				detailDto.setDescription(product.getDescription());
			}

			if (historyType == WarehouseHistoryType.IMPORT 
					|| historyType == WarehouseHistoryType.IMPORT_RETURNS) {
				detailDto.setRemaining(detailDto.getRemaining() + product.getRemaining());

			} else if (historyType == WarehouseHistoryType.EXPORT
					|| historyType == WarehouseHistoryType.EXPORT_RETURNS) {
				long remaining = detailDto.getRemaining() - product.getRemaining();
				remaining = remaining > 0 ? remaining : 0;
				detailDto.setRemaining(remaining);

			} else if (historyType == WarehouseHistoryType.DETAIL) {
				detailDto.setRemaining(product.getRemaining());
				
			} else if (historyType == WarehouseHistoryType.TRANSFER) {
				long remaining = detailDto.getRemaining() - product.getRemaining();
				remaining = remaining > 0 ? remaining : 0;
				detailDto.setRemaining(remaining);
				
				WarehouseDetailDto detailDto2 = warehouseDetailDao.getDetail(dto.getWarehouseId1(), product.getId());
				if (detailDto2 == null) {
					detailDto2 = new WarehouseDetailDto();
					detailDto2.setWarehouseId(dto.getWarehouseId1());
					detailDto2.setProductId(product.getId());
					detailDto2.setRemaining(0);
				} else {
					detailDto2.setRemaining(detailDto2.getRemaining() + product.getRemaining());
				}
				warehouseDetailDao.createOrUpdate(detailDto2);
			}

			warehouseDetailDao.createOrUpdate(detailDto);
		}

		return success(true);
	}

	@RequestMapping(value = ServiceActions.WAREHOUSE_HISTORY, method = RequestMethod.GET)
	public ServiceResult getAllImportHistory(@PathVariable("type") String type, WarehouseSearchCondition condition) throws CommonException {
		init();
		WarehouseHistoryType historyType = WarehouseHistoryType.fromString(type);
		List<WareHouseHistoryDto> histories = historyDao.getAllHistory(historyType, condition);
		if (histories.isEmpty()) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		return success(histories);
	}


	@RequestMapping(value = ServiceActions.WAREHOUSE_DETAIL, method = RequestMethod.GET)
	public ServiceResult readBy(
			@RequestParam(name = "warehouse", required = false, defaultValue = "0") Long warehouseId,
			@RequestParam(name = "product", required = false, defaultValue = "0") Long productId)
			throws CommonException {
		init();
		if (DaoUtils.isValidId(warehouseId)) {
			if (DaoUtils.isValidId(productId)) {
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
	
	@RequestMapping(value = ServiceActions.WAREHOUSE_DETAIL_STATUS, method = RequestMethod.GET)
	public ServiceResult readBy(@RequestParam(name = "warehouse", required = false, defaultValue = "0") Long warehouseId)
			throws CommonException {
		init();
		List<WarehouseDetailDto> details = warehouseDetailDao.getWarehouseDetail(warehouseId);
		if (details.size() == 0) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		return success(details);
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
	
	@RequestMapping(value = ServiceActions.WAREHOUSE_DOWNLOAD_STATUS, method = RequestMethod.GET)
	public void exportStatus(@PathVariable("id") long warehouseId, HttpServletResponse response) throws IOException, CommonException {
		try {
			init();
			// load
			List<WarehouseDetailSheet> items = warehouseDetailDao.getDetailsToExport(warehouseId);
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
					String.format("attachment; filename=\"%s\"", "Ton Kho.xlsx"));

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
	
	
	@Override
	protected void bindRealtionShip(Warehouse entity, WarehouseDto dto) {
		if(DaoUtils.isValidId(dto.getOwnerId())) {
			Employee employee = employeeDao.find(dto.getOwnerId());
			entity.setOwner(employee);
		}
	}
}
