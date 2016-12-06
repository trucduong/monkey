package web.monkey.shared.dto;

import java.util.Date;
import java.util.List;

import core.dao.dto.BaseDto;

public class WareHouseHistoryDto extends BaseDto {
	
	private long warehouseId;
	
	private String referenceNo;

	private Date historyDateTime;

	private ImportExportType historyType;

	private String supplier;

	private String customer;

	private Long employeeId;

	private List<ProductDto> details;

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

	public ImportExportType getHistoryType() {
		return historyType;
	}

	public void setHistoryType(ImportExportType historyType) {
		this.historyType = historyType;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
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
}
