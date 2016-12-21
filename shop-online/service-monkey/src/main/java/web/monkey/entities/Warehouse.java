package web.monkey.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseCachedEntity;
import web.monkey.shared.dto.WarehouseDto;
import web.monkey.shared.dto.WarehouseStatus;

@Entity
@Table(name = "warehouses")
public class Warehouse extends BaseCachedEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;

	@ManyToOne
	@JoinColumn(name="owner_id")
	private Employee owner;

	@Column(name = "phone", columnDefinition = SHORT_2)
	private String phone;

	@Enumerated(EnumType.STRING)
	@Column(name = "warehouse_status", columnDefinition = SHORT_5)
	private WarehouseStatus status;

	@Column(name = "address", columnDefinition = SHORT_5)
	private String address;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Employee getOwner() {
		return owner;
	}

	public void setOwner(Employee owner) {
		this.owner = owner;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public WarehouseStatus getStatus() {
		return status;
	}

	public void setStatus(WarehouseStatus status) {
		this.status = status;
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
		WarehouseDto dto = (WarehouseDto) baseDto;
		this.address = dto.getAddress();
		this.name = dto.getName();
		this.phone = dto.getPhone();
		this.status = dto.getStatus();
	}
	
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		WarehouseDto dto = (WarehouseDto) baseDto;
		dto.setAddress(address);
		dto.setName(name);
		dto.setPhone(phone);
		dto.setStatus(status);
		
		if (owner != null) {
			dto.setOwnerId(owner.getId());
			dto.setOwnerName(owner.getName());
		}
	}
}
