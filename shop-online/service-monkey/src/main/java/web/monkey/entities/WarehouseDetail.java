package web.monkey.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.WarehouseDetailDto;

@Entity
@Table(name = "warehouse_details")
public class WarehouseDetail extends BaseEntity {
	public static final String WAREHOUSE_ID = "warehouseId";
	public static final String PRODUCT_ID = "productId";
	private static final long serialVersionUID = 1L;

	@Column(name = "warehouse_id", columnDefinition = BaseEntity.LONG)
	private long warehouseId;

	@Column(name = "product_id", columnDefinition = BaseEntity.LONG)
	private long productId;

	@Column(name = "remaining", columnDefinition = BaseEntity.LONG)
	private long remaining;

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		WarehouseDetailDto dto = (WarehouseDetailDto) baseDto;
		this.warehouseId = dto.getWarehouseId();
		this.productId = dto.getProductId();
		this.remaining = dto.getRemaining();
	}

	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		WarehouseDetailDto dto = (WarehouseDetailDto) baseDto;
		dto.setWarehouseId(warehouseId);
		dto.setProductId(productId);
		dto.setRemaining(remaining);
	}

	public long getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(long warehouseId) {
		this.warehouseId = warehouseId;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public long getRemaining() {
		return remaining;
	}

	public void setRemaining(long remaining) {
		this.remaining = remaining;
	}

}
