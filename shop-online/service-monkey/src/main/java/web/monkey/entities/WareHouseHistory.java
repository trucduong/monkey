package web.monkey.entities;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.google.gson.reflect.TypeToken;

import core.common.format.json.JsonFormatter;
import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.WareHouseHistoryDto;
import web.monkey.shared.dto.WarehouseHistoryType;
import web.monkey.shared.dto.WarehouseProductDto;

@Entity
@Table(name = "warehouse_histories")
public class WareHouseHistory extends BaseEntity {
	public static final String TYPE = "historyType";

	private static final long serialVersionUID = 1L;

	@Column(name = "warehouse_id", columnDefinition = LONG)
	private Long warehouseId;

	@Column(name = "warehouse_name", columnDefinition = MEDIUM_1)
	private String warehouseName;

	@Column(name = "warehouse_id1", columnDefinition = LONG)
	private Long warehouseId1;

	@Column(name = "warehouse_name1", columnDefinition = MEDIUM_1)
	private String warehouseName1;

	@Column(name = "supplier_id", columnDefinition = LONG)
	private Long supplierId;

	@Column(name = "supplier_name", columnDefinition = MEDIUM_1)
	private String supplierName;

	@Column(name = "customer_id", columnDefinition = LONG)
	private Long customerId;

	@Column(name = "customer_name", columnDefinition = MEDIUM_1)
	private String customerName;

	@Column(name = "employee_id", columnDefinition = LONG)
	private Long employeeId;

	@Column(name = "employee_name", columnDefinition = MEDIUM_1)
	private String employeeName;

	@Column(name = "reference_no", columnDefinition = MEDIUM_1)
	private String referenceNo;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "history_date", columnDefinition = TIMESTAMP)
	private Date historyDateTime;

	@Enumerated(EnumType.STRING)
	@Column(name = "history_type", columnDefinition = SHORT_5)
	private WarehouseHistoryType historyType;

	@Column(name = "details", columnDefinition = LONG_1)
	private String details;

	@Column(name = "description", columnDefinition = LONG_1)
	private String description;

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		WareHouseHistoryDto dto = (WareHouseHistoryDto) baseDto;
		this.details = JsonFormatter.toJson(dto.getDetails());
		this.historyDateTime = dto.getHistoryDateTime();
		this.historyType = dto.getHistoryType();
		this.referenceNo = dto.getReferenceNo();
		this.description = dto.getDescription();
		this.warehouseId = dto.getWarehouseId();
		this.warehouseName = dto.getWarehouseName();
		this.warehouseId1 = dto.getWarehouseId1();
		this.warehouseName1 = dto.getWarehouseName1();
		this.customerId = dto.getCustomerId();
		this.customerName = dto.getCustomerName();
		this.employeeId = dto.getEmployeeId();
		this.employeeName = dto.getEmployeeName();
		this.supplierId = dto.getSupplierId();
		this.supplierName = dto.getSupplierName();	
	}

	@SuppressWarnings("unchecked")
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		WareHouseHistoryDto dto = (WareHouseHistoryDto) baseDto;
		Type listType = new TypeToken<ArrayList<WarehouseProductDto>>() { }.getType();
		dto.setDetails((List<WarehouseProductDto>) JsonFormatter.fromJson(details, listType));
		dto.setHistoryDateTime(historyDateTime);
		dto.setHistoryType(historyType);
		dto.setReferenceNo(referenceNo);
		dto.setDescription(description);
		dto.setWarehouseId(warehouseId);
		dto.setWarehouseName(warehouseName);
		dto.setWarehouseId1(warehouseId1);
		dto.setWarehouseName1(warehouseName1);
		dto.setCustomerId(customerId);
		dto.setCustomerName(customerName);
		dto.setSupplierId(supplierId);
		dto.setSupplierName(supplierName);
		dto.setEmployeeId(employeeId);
		dto.setEmployeeName(employeeName);
	}

	public Long getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(Long warehouseId) {
		this.warehouseId = warehouseId;
	}

	public String getWarehouseName() {
		return warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}

	public Long getWarehouseId1() {
		return warehouseId1;
	}

	public void setWarehouseId1(Long warehouseId1) {
		this.warehouseId1 = warehouseId1;
	}

	public String getWarehouseName1() {
		return warehouseName1;
	}

	public void setWarehouseName1(String warehouseName1) {
		this.warehouseName1 = warehouseName1;
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

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
