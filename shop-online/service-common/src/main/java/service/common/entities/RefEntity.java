package service.common.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import service.common.shared.dto.RefDto;

@Entity
@Table(name = "ref_data")
public class RefEntity extends BaseEntity {
	public static final String TYPE = "refType";
	public static final String ORDER_WEIGHT = "orderWeight";

	private static final long serialVersionUID = 1L;

	// common.ref.unit
	@Column(name = "ref_type", columnDefinition = MEDIUM_1)
	private String refType;

	// kg, cai, xxx
	@Column(name = "ref_value", columnDefinition = MEDIUM_1)
	private String refValue;

	@Column(name = "order_weight", columnDefinition = INT)
	private int orderWeight;

	public String getRefType() {
		return refType;
	}

	public void setRefType(String refType) {
		this.refType = refType;
	}

	public String getRefValue() {
		return refValue;
	}

	public void setRefValue(String refValue) {
		this.refValue = refValue;
	}

	public int getOrderWeight() {
		return orderWeight;
	}

	public void setOrderWeight(int orderWeight) {
		this.orderWeight = orderWeight;
	}

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		RefDto dto = (RefDto) baseDto;
		this.refType = dto.getRefType();
		this.refValue = dto.getRefValue();
		this.orderWeight = dto.getOrderWeight();
	}

	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		RefDto dto = (RefDto) baseDto;
		dto.setRefType(refType);
		dto.setRefValue(refValue);
		dto.setOrderWeight(orderWeight);
	}
}
