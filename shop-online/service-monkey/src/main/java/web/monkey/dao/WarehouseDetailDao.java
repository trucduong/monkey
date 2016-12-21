package web.monkey.dao;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import core.dao.utils.BaseDao;
import core.dao.utils.DaoUtils;
import core.dao.utils.NativeQueryBuilder;
import core.dao.utils.QueryBuilder;
import web.monkey.dto.xsl.WarehouseDetailSheet;
import web.monkey.entities.WarehouseDetail;
import web.monkey.shared.dto.WarehouseDetailDto;

@Repository
public class WarehouseDetailDao extends BaseDao<WarehouseDetail> {
	private static final long serialVersionUID = 1L;
	
	public WarehouseDetailDto getDetail(long warehouseId, long productId) {
		NativeQueryBuilder builder = new NativeQueryBuilder();
		builder.append("select d.id, d.warehouse_id, d.product_id, d.remaining, d.description from warehouse_details d");
		builder.append(" where d.warehouse_id = :warehouseId and d.product_id = :productId", "warehouseId", warehouseId,
				"productId", productId);
		
		
		String[] columns = new String[] {"id", "warehouseId", "productId", "remaining", "description"};
		WarehouseDetailDto dto = DaoUtils.selectFirst(getEm(), builder, WarehouseDetailDto.class, columns);
		return dto;
	}

	public List<WarehouseDetailDto> getDetailsByProduct(long... productIds) {
		String idStr = StringUtils.join(productIds, ",");
		NativeQueryBuilder builder = new NativeQueryBuilder();
		builder.append("select d.id, d.warehouse_id, d.product_id, d.remaining, d.description from warehouse_details d");
		builder.append(" WHERE d.product_id IN (" + idStr + ")");
		
		String[] columns = new String[] {"id", "warehouseId", "productId", "remaining", "description"};
		List<WarehouseDetailDto> dtos = DaoUtils.selectAll(getEm(), builder, WarehouseDetailDto.class, columns);
		return dtos;
	}

	public List<WarehouseDetailDto> getDetailsByWarehouse(long... warehouseIds) {
		String idStr = StringUtils.join(warehouseIds, ",");
		NativeQueryBuilder builder = new NativeQueryBuilder();
		builder.append("select d.id, d.warehouse_id, d.product_id, d.remaining, d.description from warehouse_details d");
		builder.append(" WHERE d.warehouse_id IN (" + idStr + ")");
		
		String[] columns = new String[] {"id", "warehouseId", "productId", "remaining", "description"};
		List<WarehouseDetailDto> dtos = DaoUtils.selectAll(getEm(), builder, WarehouseDetailDto.class, columns);
		return dtos;
	}
	
	public List<WarehouseDetailSheet> getDetailsToExport() {
		QueryBuilder builder = new QueryBuilder();
		builder.append("select w.name, p.name, e.remaining from WarehouseDetail e LEFT JOIN e.warehouse w LEFT JOIN e.product p order by w.name asc, p.name asc");
		
		String[] columns = new String[] {"warehouse", "product", "remaining"};
		List<WarehouseDetailSheet> dtos = DaoUtils.selectAll(getEm(), builder, WarehouseDetailSheet.class, columns);
		return dtos;
	}
}
