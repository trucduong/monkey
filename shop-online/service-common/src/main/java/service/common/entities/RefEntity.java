package service.common.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.common.locate.Language;
import core.dao.entities.BaseEntity;

@Entity
@Table(name = "ref_data")
public class RefEntity extends BaseEntity {
	public static final String TYPE = "refType";
	public static final String ORDER_WEIGHT = "orderWeight";

	private static final long serialVersionUID = 1L;

	// common.ref.unit
	@Column(name = "ref_type", columnDefinition = SHORT_1)
	private String refType;

	// kg, cai, xxx
	@Column(name = "ref_value", columnDefinition = SHORT_1)
	private String refValue;

	@Column(name = "ref_label_vi", columnDefinition = SHORT_5)
	private String refLabelVi;

	@Column(name = "ref_label_en", columnDefinition = SHORT_5)
	private String refLabelEn;

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

	public String getRefLabelVi() {
		return refLabelVi;
	}

	public void setRefLabelVi(String refLabelVi) {
		this.refLabelVi = refLabelVi;
	}

	public String getRefLabelEn() {
		return refLabelEn;
	}

	public void setRefLabelEn(String refLabelEn) {
		this.refLabelEn = refLabelEn;
	}

	public int getOrderWeight() {
		return orderWeight;
	}

	public void setOrderWeight(int orderWeight) {
		this.orderWeight = orderWeight;
	}

	public String getLabel(Language language) {
		switch (language) {
		case ENGLISH:
			return this.refLabelEn;
		case VIET_NAM:
			return this.refLabelVi;
		default:
			return "";
		}
	}
}
