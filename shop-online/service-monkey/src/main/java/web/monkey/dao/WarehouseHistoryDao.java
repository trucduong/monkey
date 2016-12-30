package web.monkey.dao;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.google.gson.reflect.TypeToken;

import core.common.convert.Converter;
import core.common.convert.ConverterUtils;
import core.common.format.json.JsonFormatter;
import core.dao.utils.BaseDao;
import core.dao.utils.DaoUtils;
import core.dao.utils.QueryBuilder;
import web.monkey.entities.WareHouseHistory;
import web.monkey.shared.dto.WareHouseHistoryDto;
import web.monkey.shared.dto.WarehouseHistoryType;
import web.monkey.shared.dto.WarehouseProductDto;
import web.monkey.shared.dto.WarehouseSearchCondition;

@Repository
public class WarehouseHistoryDao extends BaseDao<WareHouseHistory> {
	private static final long serialVersionUID = 1L;

	public List<WareHouseHistoryDto> getAllHistory(WarehouseHistoryType type, WarehouseSearchCondition condition) {
		QueryBuilder queryBuilder = new QueryBuilder();
		queryBuilder.append("SELECT h.warehouseId, h.warehouseName, h.warehouseId1, h.warehouseName1");
		queryBuilder.append(", h.supplierId, h.supplierName, h.customerId, h.customerName, h.employeeId, h.employeeName");
		queryBuilder.append(", h.referenceNo, h.historyDateTime, h.historyType, h.description, h.details");
		queryBuilder.append(" FROM WareHouseHistory h");
		queryBuilder.append(" WHERE 1=1");
		
		if (type != null) {
			queryBuilder.append(" and h.historyType = :historyType", "historyType", type);
		}
		
		if (StringUtils.isNotEmpty(condition.getHistoryDateTime())) {
			queryBuilder.append(" and date(h.historyDateTime) = date(:historyDateTime)", "historyDateTime", condition.getHistoryDateTime());
		}
		
		if (StringUtils.isNotEmpty(condition.getReferenceNo())) {
			queryBuilder.append(" and h.referenceNo like :referenceNo", "referenceNo", "%" + condition.getReferenceNo() + "%");
		}
		
		if (condition.getWarehouseId() != null) {
			queryBuilder.append(" and h.warehouseId = :warehouseId", "warehouseId", condition.getWarehouseId());
		}
		
		if (condition.getSupplierId() != null) {
			queryBuilder.append(" and h.supplierId = :supplierId", "supplierId", condition.getSupplierId());
		}
		
		if (condition.getCustomerId() != null) {
			queryBuilder.append(" and h.customerId = :customerId", "customerId", condition.getCustomerId());
		}
		
		if (condition.getEmployeeId() != null) {
			queryBuilder.append(" and h.employeeId = :employeeId", "employeeId", condition.getEmployeeId());
		}
		
		if (condition.getProductId() != null) {
			String productCondition = "%\"id\":" + condition.getProductId() + ",%";
			queryBuilder.append(" and h.details like :product", "product", productCondition);
		}
		
		
		String[] columns = new String[] {"warehouseId", "warehouseName", "warehouseId1", "warehouseName1", "supplierId", "supplierName", "customerId", "customerName", "employeeId", "employeeName", 
				"referenceNo", "historyDateTime", "historyType", "description", "details"};
		Map<String, Converter<?>> converters = new HashedMap<>();
		converters.put("details", new Converter<List<WarehouseProductDto>>() {

			@Override
			public List<WarehouseProductDto> convert(Object value) {
				Type listType = new TypeToken<ArrayList<WarehouseProductDto>>(){}.getType();
				List<WarehouseProductDto> products = JsonFormatter.fromJson(ConverterUtils.toString(value), listType);
				return products;
			}
		});
		
		List<WareHouseHistoryDto> histories = DaoUtils.selectAll(getEm(), queryBuilder, WareHouseHistoryDto.class, columns, converters);
		
		return histories;
	}
}
