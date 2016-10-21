package service.common.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.entities.BaseEntity;

@Entity
@Table(name="ref_data")
public class RefEntity extends BaseEntity {
	public static final String TYPE = "refType";
	public static final String ORDER_WEIGHT = "orderWeight";
	
	private static final long serialVersionUID = 1L;
	
	@Column(name = "ref_type", columnDefinition = SHORT_1)
	private String refType;
	
	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;
	
	@Column(name = "ref_key", columnDefinition = SHORT_5)
	private String refKey;

	@Column(name = "order_weight", columnDefinition = INT)
	private int orderWeight;

	public String getRefType() {
		return refType;
	}

	public void setRefType(String refType) {
		this.refType = refType;
	}

	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getRefKey() {
		return refKey;
	}
	
	public void setRefKey(String refKey) {
		this.refKey = refKey;
	}

	public int getOrderWeight() {
		return orderWeight;
	}

	public void setOrderWeight(int orderWeight) {
		this.orderWeight = orderWeight;
	}
}
