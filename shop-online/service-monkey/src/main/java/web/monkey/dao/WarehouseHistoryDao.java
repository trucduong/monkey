package web.monkey.dao;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.gson.reflect.TypeToken;

import core.common.convert.ConverterUtils;
import core.common.format.json.JsonFormatter;
import core.dao.utils.BaseDao;
import core.dao.utils.QueryBuilder;
import web.monkey.entities.WareHouseHistory;
import web.monkey.shared.dto.ProductDto;
import web.monkey.shared.dto.WareHouseHistoryDetailDto;
import web.monkey.shared.dto.WarehouseHistoryType;
import web.monkey.shared.dto.WarehouseSearchCondition;
import web.monkey.translation.EmployeeTranslation;
import web.monkey.translation.SupplierTranslation;
import web.monkey.translation.WarehouseTranslation;

@Repository
public class WarehouseHistoryDao extends BaseDao<WareHouseHistory> {
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private WarehouseTranslation warehouseTranslation;
	
	@Autowired
	private EmployeeTranslation employeeTranslation;
	
	@Autowired
	private SupplierTranslation supplierTranslation;

	public List<WareHouseHistoryDetailDto> getAllHistory(WarehouseHistoryType type, WarehouseSearchCondition condition) {
		List<WareHouseHistoryDetailDto> list = new ArrayList<>();
		QueryBuilder queryBuilder = new QueryBuilder();
		queryBuilder.append("select h.referenceNo, h.historyDateTime, h.warehouseId, h.supplier, h.customer, h.employee, h.details from WareHouseHistory h where 1=1");
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
			queryBuilder.append(" and h.supplier = :supplier", "supplier", condition.getSupplierId());
		}
		
		if (condition.getCustomerId() != null) {
			queryBuilder.append(" and h.customer = :customer", "customer", condition.getCustomerId());
		}
		
		if (condition.getEmployeeId() != null) {
			queryBuilder.append(" and h.employee = :employee", "employee", condition.getEmployeeId());
		}
		
		if (condition.getProductId() != null) {
			String productCondition = "%,\"id\":" + condition.getProductId() + ",%";
			queryBuilder.append(" and h.details like :product", "product", productCondition);
		}
		
		List<Object[]> histories = queryBuilder.build(getEm()).getResultList();
		for (Object[] history : histories) {
			Type listType = new TypeToken<ArrayList<ProductDto>>(){}.getType();
			List<ProductDto> products = JsonFormatter.fromJson(ConverterUtils.toString(history[6]), listType);
			for (ProductDto product : products) {
				if (condition.getProductId() != null && !condition.getProductId().equals(product.getId())) {
					continue;
				}
				WareHouseHistoryDetailDto dto = new WareHouseHistoryDetailDto();
//				dto.setCustomer(history.getCustomer());
				dto.setEmployee(employeeTranslation.translate(ConverterUtils.toString(history[5])));
				dto.setHistoryDateTime(ConverterUtils.toDate(history[1]));
				dto.setId(product.getId());
				dto.setInputPrice(product.getInputPrice());
				dto.setProduct(product.getName());
				dto.setReferenceNo(ConverterUtils.toString(history[0]));
				dto.setRemaining(product.getRemaining());
				dto.setRetailPrice(product.getRetailPrice());
				dto.setSupplier(supplierTranslation.translate(ConverterUtils.toString(history[3])));
				dto.setWholesalePrice(product.getWholesalePrice());
				dto.setWarehouse(warehouseTranslation.translate(ConverterUtils.toString(history[2])));
				
				list.add(dto);
			}
		}
		
		return list;
	}
}
