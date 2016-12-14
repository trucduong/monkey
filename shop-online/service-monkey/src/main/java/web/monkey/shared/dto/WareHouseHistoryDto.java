package web.monkey.shared.dto;

import java.util.Date;
import java.util.List;

import core.dao.dto.BaseDto;

public class WareHouseHistoryDto extends BaseDto {
	
	private long warehouseId;
	
	private String referenceNo;

	private Date historyDateTime;

	private WarehouseHistoryType historyType;

	private Long supplier;

	private Long customer;

	private Long employeeId;

	private List<ProductDto> details;
	
	private String description;

	public String getReferenceNo() {
		return referenceNo;
	}

	public void setReferenceNo(String referenceNo) {
		this.referenceNo = referenceNo;
	}

	public Date getHistoryDateTime() {
		return historyDateTime;
	}

	public void setHistoryDateTime(Date historyDateTime) {
		this.historyDateTime = historyDateTime;
	}

	public WarehouseHistoryType getHistoryType() {
		return historyType;
	}

	public void setHistoryType(WarehouseHistoryType historyType) {
		this.historyType = historyType;
	}

	public Long getSupplier() {
		return supplier;
	}

	public void setSupplier(Long supplier) {
		this.supplier = supplier;
	}

	public Long getCustomer() {
		return customer;
	}

	public void setCustomer(Long customer) {
		this.customer = customer;
	}

	public Long getEmployeeId() {
		return employeeId;
	}
	
	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public List<ProductDto> getDetails() {
		return details;
	}
	
	public void setDetails(List<ProductDto> details) {
		this.details = details;
	}
	
	public long getWarehouseId() {
		return warehouseId;
	}
	
	public void setWarehouseId(long warehouseId) {
		this.warehouseId = warehouseId;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
}
