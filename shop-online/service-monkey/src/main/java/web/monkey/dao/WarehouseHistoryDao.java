package web.monkey.dao;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.gson.reflect.TypeToken;

import core.common.format.json.JsonFormatter;
import core.dao.utils.BaseDao;
import web.monkey.entities.WareHouseHistory;
import web.monkey.shared.dto.ImportExportType;
import web.monkey.shared.dto.ProductDto;
import web.monkey.shared.dto.WareHouseHistoryDetailDto;
import web.monkey.translation.EmployeeTranslation;
import web.monkey.translation.WarehouseTranslation;

@Repository
public class WarehouseHistoryDao extends BaseDao<WareHouseHistory> {
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private WarehouseTranslation warehouseTranslation;
	
	@Autowired
	private EmployeeTranslation employeeTranslation;

	public List<WareHouseHistoryDetailDto> getAllHistory(ImportExportType type) {
		List<WareHouseHistoryDetailDto> list = new ArrayList<>();
		
		List<WareHouseHistory> histories = this.getAllDataByColumn(WareHouseHistory.TYPE, type);
		for (WareHouseHistory history : histories) {
			Type listType = new TypeToken<ArrayList<ProductDto>>(){}.getType();
			List<ProductDto> products = JsonFormatter.fromJson(history.getDetails(), listType);
			for (ProductDto product : products) {
				WareHouseHistoryDetailDto dto = new WareHouseHistoryDetailDto();
				dto.setCustomer(history.getCustomer());
				dto.setEmployee(employeeTranslation.translate(String.valueOf(history.getEmployee())));
				dto.setHistoryDateTime(history.getHistoryDateTime());
				dto.setId(history.getId());
				dto.setInputPrice(product.getInputPrice());
				dto.setProduct(product.getName());
				dto.setReferenceNo(history.getReferenceNo());
				dto.setRemaining(product.getRemaining());
				dto.setRetailPrice(product.getRetailPrice());
				dto.setSupplier(history.getSupplier());
				dto.setWholesalePrice(product.getWholesalePrice());
				dto.setWarehouse(warehouseTranslation.translate(String.valueOf(history.getWarehouseId())));
				
				list.add(dto);
			}
		}
		
		return list;
	}
}
