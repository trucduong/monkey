package web.monkey.shared.dto;

import core.dao.dto.BaseDto;

public class WarehouseDto extends BaseDto {
	private String name;

	private String ownerName;

	private Long ownerId;

	private String phone;

	private WarehouseStatus status;

	private String address;

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

	public Long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
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

}
