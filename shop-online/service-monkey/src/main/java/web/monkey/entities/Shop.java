package web.monkey.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseCachedEntity;
import web.monkey.shared.dto.ShopDto;

@Entity
@Table(name = "shops")
public class Shop extends BaseCachedEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;

	@Column(name = "phone", columnDefinition = SHORT_2)
	private String phone;

	@Column(name = "email", columnDefinition = MEDIUM_1)
	private String email;

	@Column(name = "tax_code", columnDefinition = MEDIUM_1)
	private String taxCode;
	
	@Column(name = "address", columnDefinition = MEDIUM_2)
	private String address;

	@ManyToOne
	@JoinColumn(name="owner_id")
	private Employee owner;

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

	public Employee getOwner() {
		return owner;
	}
	
	public void setOwner(Employee owner) {
		this.owner = owner;
	}
	
	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		ShopDto dto = (ShopDto) baseDto;
		this.email = dto.getEmail();
		this.name = dto.getName();
		this.phone = dto.getPhone();
		this.taxCode = dto.getTaxCode();
		this.address = dto.getAddress();
	}
	
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		ShopDto dto = (ShopDto) baseDto;
		dto.setEmail(email);
		dto.setName(name);
		dto.setPhone(phone);
		dto.setTaxCode(taxCode);
		dto.setAddress(address);
		
		if (owner != null) {
			dto.setOwnerId(owner.getId());
			dto.setOwnerName(owner.getName());
		}
	}
}
