package web.monkey.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.ShopDto;

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
	
	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		ShopDto dto = (ShopDto) baseDto;
		this.email = dto.getEmail();
		this.name = dto.getName();
		this.ownerId = dto.getOwnerId();
		this.ownerName = dto.getOwnerName();
		this.phone = dto.getPhone();
		this.taxCode = dto.getTaxCode();
	}
	
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		ShopDto dto = (ShopDto) baseDto;
		dto.setEmail(email);
		dto.setName(name);
		dto.setOwnerId(ownerId);
		dto.setOwnerName(ownerName);
		dto.setPhone(phone);
		dto.setTaxCode(taxCode);
	}
}
