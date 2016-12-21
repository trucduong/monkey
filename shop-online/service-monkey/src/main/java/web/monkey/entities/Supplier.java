package web.monkey.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseCachedEntity;
import web.monkey.shared.dto.SupplierDto;

@Entity
@Table(name="suppliers")
public class Supplier extends BaseCachedEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;

	@Column(name = "phone", columnDefinition = SHORT_2)
	private String phone;
	
	@Column(name = "email", columnDefinition = MEDIUM_1)
	private String email;

	@Column(name = "address", columnDefinition = MEDIUM_2)
	private String address;
	
	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;

	@ManyToOne
	@JoinColumn(name="supplier_group")
	private SupplierGroup supplierGroup;
	
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

	public String getAddress() {
		return address;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public SupplierGroup getSupplierGroup() {
		return supplierGroup;
	}
	
	public void setSupplierGroup(SupplierGroup supplierGroup) {
		this.supplierGroup = supplierGroup;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		SupplierDto dto = (SupplierDto) baseDto;
		this.address = dto.getAddress();
		this.description = dto.getDescription();
		this.email = dto.getEmail();
		this.name = dto.getName();
		this.phone = dto.getPhone();
	}
	
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		SupplierDto dto = (SupplierDto) baseDto;
		dto.setAddress(address);
		dto.setDescription(description);
		dto.setEmail(email);
		dto.setName(name);
		dto.setPhone(phone);
		
		if (supplierGroup != null) {
			dto.setGroupId(supplierGroup.getId());
			dto.setGroupName(supplierGroup.getName());
		}
	}
}
