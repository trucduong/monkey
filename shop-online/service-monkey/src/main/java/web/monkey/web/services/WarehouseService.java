package web.monkey.web.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import web.monkey.dao.ProductDetailDao;
import web.monkey.dao.WarehouseDao;
import web.monkey.dao.WarehouseHistoryDao;
import web.monkey.entities.WareHouseHistory;
import web.monkey.entities.Warehouse;
import web.monkey.shared.dto.ImportExportType;
import web.monkey.shared.dto.WareHouseHistoryDetailDto;
import web.monkey.shared.dto.WareHouseHistoryDto;
import web.monkey.shared.dto.WarehouseDto;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.WAREHOUSE_SERVICE)
public class WarehouseService extends CRUDService<Warehouse, WarehouseDto> {

	@Autowired
	private WarehouseDao dao;

	@Autowired
	private WarehouseHistoryDao historyDao;

	@Autowired
	private ProductDetailDao productDetailDao;

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

	@RequestMapping(value = ServiceActions.WAREHOUSE_IMPORT, method = RequestMethod.POST)
	public ServiceResult importHistory(@RequestBody WareHouseHistoryDto dto) throws CommonException {
		init();
		// validation
		if (dto == null || dto.getDetails() == null || dto.getWarehouseId() <= 0) {
			return error(ServiceErrorCode.PARAMETER_ERROR);
		}

		// prepare data
		dto.setHistoryDateTime(new Date());
		dto.setHistoryType(ImportExportType.IMPORT);

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
		int count = productDetailDao.importDetails(dto.getDetails());

		return success(count);
	}
	
	@RequestMapping(value = ServiceActions.WAREHOUSE_IMPORT_HISTORY, method = RequestMethod.GET)
	public ServiceResult getAllImportHistory() throws CommonException {
		init();
		List<WareHouseHistoryDetailDto> histories = historyDao.getAllHistory(ImportExportType.IMPORT);
		if (histories.isEmpty()) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		
		return success(histories);
	}

}
