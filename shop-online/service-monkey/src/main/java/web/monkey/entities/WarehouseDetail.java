package web.monkey.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.WarehouseDetailDto;

@Entity
@Table(name = "warehouse_details")
public class WarehouseDetail extends BaseEntity {
//	public static final String WAREHOUSE_ID = "warehouseId";
//	public static final String PRODUCT_ID = "productId";
	private static final long serialVersionUID = 1L;
	
	@ManyToOne
	@JoinColumn(name="warehouse_id")
	private Warehouse warehouse;

	@ManyToOne
	@JoinColumn(name="product_id")
	private Product product;
	
	@Column(name = "remaining", columnDefinition = LONG)
	private long remaining;
	
	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;
	
	

	public Warehouse getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public long getRemaining() {
		return remaining;
	}

	public void setRemaining(long remaining) {
		this.remaining = remaining;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		WarehouseDetailDto dto = (WarehouseDetailDto) baseDto;
		this.remaining = dto.getRemaining();
		this.description = dto.getDescription();
	}

	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		WarehouseDetailDto dto = (WarehouseDetailDto) baseDto;
		dto.setRemaining(remaining);
		dto.setWarehouseId(warehouse.getId());
		dto.setWarehouseName(warehouse.getName());
		dto.setProductId(product.getId());
		dto.setProductName(product.getName());
		dto.setDescription(description);
	}

}
