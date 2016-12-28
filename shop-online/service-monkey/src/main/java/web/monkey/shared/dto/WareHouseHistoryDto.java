package web.monkey.shared.dto;

import java.util.Date;
import java.util.List;

import core.dao.dto.BaseDto;

public class WareHouseHistoryDto extends BaseDto {

	private long warehouseId;
	private String warehouseName;
	
	private long warehouseId1;
	private String warehouseName1;

	private String referenceNo;

	private Date historyDateTime;

	private WarehouseHistoryType historyType;

	private Long supplierId;
	private String supplierName;

	private Long customerId;
	private String customerName;

	private Long employeeId;
	private String employeeName;

	private List<WarehouseProductDto> details;

	private String description;

	public WareHouseHistoryDto() {
	}
	
	public long getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(long warehouseId) {
		this.warehouseId = warehouseId;
	}

	public String getWarehouseName() {
		return warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}

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

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public List<WarehouseProductDto> getDetails() {
		return details;
	}

	public void setDetails(List<WarehouseProductDto> details) {
		this.details = details;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public long getWarehouseId1() {
		return warehouseId1;
	}

	public void setWarehouseId1(long warehouseId1) {
		this.warehouseId1 = warehouseId1;
	}

	public String getWarehouseName1() {
		return warehouseName1;
	}

	public void setWarehouseName1(String warehouseName1) {
		this.warehouseName1 = warehouseName1;
	}

}
