package service.common.shared.dto;

import core.dao.dto.BaseDto;

public class RefDto extends BaseDto {

	private String refType;

	private String refValue;

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
}
