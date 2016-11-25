package service.shop.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.entities.BaseEntity;

@Entity
@Table(name = "shops")
public class Shop extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;

	@Column(name = "phone", columnDefinition = SHORT_2)
	private String phone;

	@Column(name = "email", columnDefinition = MEDIUM_1)
	private String email;

	@Column(name = "tax_code", columnDefinition = MEDIUM_1)
	private String taxCode;

	@Column(name = "owner_id", columnDefinition = LONG)
	private Long ownerId;

	@Column(name = "owner_name", columnDefinition = MEDIUM_1)
	private String ownerName;

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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTaxCode() {
		return taxCode;
	}

	public void setTaxCode(String taxCode) {
		this.taxCode = taxCode;
	}

	public Long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

}
