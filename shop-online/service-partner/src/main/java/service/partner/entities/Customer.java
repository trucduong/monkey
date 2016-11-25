package service.partner.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.entities.BaseEntity;

@Entity
@Table(name="customers")
public class Customer extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;
	
	@Column(name = "phone", columnDefinition = SHORT_2)
	private String phone;
	
	@Column(name = "sex", columnDefinition = SHORT_5)
	private String sex;
	
	@Column(name = "email", columnDefinition = MEDIUM_1)
	private String email;
	
	@Column(name = "address_detail", columnDefinition = MEDIUM_2)
	private String addressDetail;
	
	@Column(name = "address_1", columnDefinition = SHORT_5)
	private String address1;
	
	@Column(name = "address_2", columnDefinition = SHORT_5)
	private String address2;
	
	@Column(name = "address_3", columnDefinition = SHORT_5)
	private String address3;
	
	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;
	
	@Column(name = "details", columnDefinition = LONG_1)
	private String details;

	@Column(name="customer_group", columnDefinition=LONG)
	private Long group;
	
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

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public Long getGroup() {
		return group;
	}
	
	public void setGroup(Long group) {
		this.group = group;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
}
