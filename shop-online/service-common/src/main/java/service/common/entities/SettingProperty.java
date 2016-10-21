package service.common.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.entities.BaseEntity;

@Entity
@Table(name="setting_properties")
public class SettingProperty extends BaseEntity {

	private static final long serialVersionUID = 6855669084665754697L;
	
//	@Column(name = "locale", columnDefinition = SHORT_1)
//	private String locale;
	
	// include locale
	@Column(name = "pro_key", columnDefinition = MEDIUM_1)
	private String key;
	
	@Column(name = "pro_value", columnDefinition = MEDIUM_2)
	private String value;
//
//	@Override
//	public Object getColIdValue() {
//		return key;
//	}
//
//	@Override
//	public String getColIdName() {
//		return "pro_key";
//	}
//	
//	@Override
//	public Object convertToId(String value) {
//		return value;
//	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
