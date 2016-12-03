package service.catalogue.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import service.catalogue.shared.dto.WarehouseDto;
import service.catalogue.shared.dto.WarehouseStatus;

@Entity
@Table(name = "warehouses")
public class Warehouse extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;

	@Column(name = "owner_name", columnDefinition = MEDIUM_1)
	private String ownerName;

	@Column(name = "phone", columnDefinition = SHORT_2)
	private String phone;

	@Enumerated(EnumType.STRING)
	@Column(name = "warehouse_status", columnDefinition = SHORT_5)
	private WarehouseStatus status;

	@Column(name = "address_detail", columnDefinition = MEDIUM_2)
	private String addressDetail;

	@Column(name = "address_1", columnDefinition = SHORT_5)
	private String address1;

	@Column(name = "address_2", columnDefinition = SHORT_5)
	private String address2;

	@Column(name = "address_3", columnDefinition = SHORT_5)
	private String address3;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
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

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		WarehouseDto dto = (WarehouseDto) baseDto;
		this.address1 = dto.getAddress1();
		this.address2 = dto.getAddress2();
		this.address3 = dto.getAddress3();
		this.addressDetail = dto.getAddressDetail();
		this.name = dto.getName();
		this.ownerName = dto.getOwnerName();
		this.phone = dto.getPhone();
		this.status = dto.getStatus();
	}
	
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		WarehouseDto dto = (WarehouseDto) baseDto;
		dto.setAddress1(address1);
		dto.setAddress2(address2);
		dto.setAddress3(address3);
		dto.setAddressDetail(addressDetail);
		dto.setName(name);
		dto.setOwnerName(ownerName);
		dto.setPhone(phone);
		dto.setStatus(status);
	}
}
