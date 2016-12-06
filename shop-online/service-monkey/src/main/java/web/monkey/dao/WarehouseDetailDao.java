package web.monkey.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Query;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import core.common.convert.ConverterUtils;
import core.dao.utils.BaseDao;
import core.dao.utils.QueryBuilder;
import web.monkey.entities.WarehouseDetail;
import web.monkey.shared.dto.WarehouseDetailDto;

@Repository
public class WarehouseDetailDao extends BaseDao<WarehouseDetail> {
	private static final long serialVersionUID = 1L;

	public WarehouseDetailDto getDetail(long warehouseId, long productId) {
		WarehouseDetailDto dto = null;
		QueryBuilder builder = new QueryBuilder();
		builder.append("select d.id, d.warehouseId, d.productId, d.remaining from WarehouseDetail d");
		builder.append(" where d.warehouseId = :warehouseId and d.productId = :d.productId", 
				"warehouseId", warehouseId,
				"productId", productId);
		Query query = builder.build(getEm());
		List<Object[]> resultList = query.getResultList();
		if (resultList.size()>=0) {
			Object[] objects = resultList.get(0);
			dto = new WarehouseDetailDto();
			dto.setId(ConverterUtils.toLong(objects[0]));
			dto.setWarehouseId(warehouseId);
			dto.setProductId(productId);
			dto.setRemaining(ConverterUtils.toLong(objects[3]));
		}
		
		return dto;
	}
	
	public List<WarehouseDetailDto> getDetailsByProduct(long... productIds) {
		List<WarehouseDetailDto> dtos = new ArrayList<>();
		String idStr = StringUtils.join(productIds, ",");
		QueryBuilder builder = new QueryBuilder();
		builder.append("SELECT d.id, d.warehouseId, d.productId, d.remaining from WarehouseDetail d");
		builder.append(" WHERE d.productId IN (:productIds)", 
				"productIds", idStr);
		Query query = builder.build(getEm());
		List<Object[]> resultList = query.getResultList();
		for (Object[] objects : resultList) {
			WarehouseDetailDto dto = new WarehouseDetailDto();
			dto.setId(ConverterUtils.toLong(objects[0]));
			dto.setWarehouseId(ConverterUtils.toLong(objects[1]));
			dto.setProductId(ConverterUtils.toLong(objects[2]));
			dto.setRemaining(ConverterUtils.toLong(objects[3]));
			
			dtos.add(dto);
		}
		
		return dtos;
	}
	
	public List<WarehouseDetailDto> getDetailsByWarehouse(long... warehouseIds) {
		List<WarehouseDetailDto> dtos = new ArrayList<>();
		String warehouseIdStr = StringUtils.join(warehouseIds, ",");
		QueryBuilder builder = new QueryBuilder();
		builder.append("SELECT d.id, d.warehouseId, d.productId, d.remaining from WarehouseDetail d");
		builder.append(" WHERE d.warehouseId IN (:warehouseIds)", 
				"warehouseIds", warehouseIdStr);
		Query query = builder.build(getEm());
		List<Object[]> resultList = query.getResultList();
		for (Object[] objects : resultList) {
			WarehouseDetailDto dto = new WarehouseDetailDto();
			dto.setId(ConverterUtils.toLong(objects[0]));
			dto.setWarehouseId(ConverterUtils.toLong(objects[1]));
			dto.setProductId(ConverterUtils.toLong(objects[2]));
			dto.setRemaining(ConverterUtils.toLong(objects[3]));
			
			dtos.add(dto);
		}
		
		return dtos;
	}
	
	public Map<Long, Long> getProductRemaining(Object... productIds) {
		Map<Long, Long> map = new HashMap<>();
		String idStr = StringUtils.join(productIds, ",");
		QueryBuilder builder = new QueryBuilder();
		builder.append("SELECT d.productId, d.remaining from WarehouseDetail d");
		builder.append(" WHERE d.productId IN ("+idStr+")");
		Query query = builder.build(getEm());
		List<Object[]> resultList = query.getResultList();
		for (Object[] objects : resultList) {
			Long productId = ConverterUtils.toLong(objects[0]);
			long remaining = ConverterUtils.toLong(map.get(productId)) + ConverterUtils.toLong(objects[1]);
			map.put(productId, remaining);
		}
		
		return map;
	}
}
