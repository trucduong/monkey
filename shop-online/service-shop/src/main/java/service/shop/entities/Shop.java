package service.shop.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;

@Entity
@Table(name = "shops")
public class Shop extends BaseEntity {

	private static final long serialVersionUID = 4974317956527909486L;

//	@Column(name = "id", columnDefinition = SHORT_2)
//	private String id;

	@Column(name = "full_name", columnDefinition = MEDIUM_1)
	private String fullName;

	@Column(name = "short_name", columnDefinition = SHORT_5)
	private String shortName;

	@Column(name = "group", columnDefinition = MEDIUM_1)
	private String group;

	@Column(name = "owner", columnDefinition = SHORT_5)
	private String owner;

	@Column(name = "phone", columnDefinition = SHORT_2)
	private String phone;

	@Column(name = "email", columnDefinition = MEDIUM_1)
	private String email;

	@Column(name = "properties", columnDefinition = MEDIUM_5)
	private String properties;
//
//	@Override
//	public Object getColIdValue() {
//		return id;
//	}
//
//	@Override
//	public String getColIdName() {
//		return "id";
//	}
//	
//	@Override
//	public Object convertToId(String value) {
//		return value;
//	}

//	public String getId() {
//		return id;
//	}
//
//	public void setId(String id) {
//		this.id = id;
//	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProperties() {
		return properties;
	}

	public void setProperties(String properties) {
		this.properties = properties;
	}

	@Override
	public void bind(BaseDto dto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void unBind(BaseDto dto) {
		// TODO Auto-generated method stub
		
	}
}
