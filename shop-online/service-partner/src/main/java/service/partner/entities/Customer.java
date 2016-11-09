package service.partner.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;

@Entity
@Table(name="customers")
public class Customer extends BaseEntity {
	private static final long serialVersionUID = 6487120504006748908L;

	@Column(name = "name", columnDefinition = SHORT_5)
	private String name;
	
	@Column(name = "phone", columnDefinition = SHORT_2)
	private String phone;
	
	@Column(name = "birth_day", columnDefinition = DATE)
	private Date birthDay;
	
	@Column(name = "sex", columnDefinition = SHORT_2)
	private String sex;
	
	@Column(name = "address_detail", columnDefinition = SHORT_5)
	private String addressDetail;
	
	@Column(name = "address_1", columnDefinition = SHORT_5)
	private String address1;
	
	@Column(name = "address_2", columnDefinition = SHORT_5)
	private String address2;
	
	@Column(name = "address_3", columnDefinition = SHORT_5)
	private String address3;
	
	@Column(name = "properties", columnDefinition = LONG_1)
	private String properties;
//
//	@Override
//	public Object getColIdValue() {
//		return phone;
//	}
//
//	@Override
//	public String getColIdName() {
//		return "phone";
//	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getBirthDay() {
		return birthDay;
	}

	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getAddressDetail() {
		return addressDetail;
	}

	public void setAddressDetail(String addressDetail) {
		this.addressDetail = addressDetail;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getAddress3() {
		return address3;
	}

	public void setAddress3(String address3) {
		this.address3 = address3;
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
	
//	@Override
//	public Object convertToId(String value) {
//		return value;
//	}
}
