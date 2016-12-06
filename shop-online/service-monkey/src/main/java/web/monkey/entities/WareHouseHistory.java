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
import web.monkey.shared.dto.ImportExportType;
import web.monkey.shared.dto.ProductDto;
import web.monkey.shared.dto.WareHouseHistoryDto;

@Entity
@Table(name = "warehouse_histories")
public class WareHouseHistory extends BaseEntity {
	public static final String TYPE = "historyType";

	private static final long serialVersionUID = 1L;

	@Column(name = "warehouse_id", columnDefinition = LONG)
	private long warehouseId;
	
	@Column(name = "reference_no", columnDefinition = MEDIUM_1)
	private String referenceNo;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "history_date", columnDefinition = TIMESTAMP)
	private Date historyDateTime;

	@Enumerated(EnumType.STRING)
	@Column(name = "history_type", columnDefinition = SHORT_5)
	private ImportExportType historyType;

	@Column(name = "supplier_name", columnDefinition = MEDIUM_1)
	private String supplier;

	@Column(name = "customer_name", columnDefinition = MEDIUM_1)
	private String customer;

	@Column(name = "employee_id", columnDefinition = LONG)
	private Long employee;

	@Column(name = "details", columnDefinition = LONG_1)
	private String details;
	// @Column(name = "product_id", columnDefinition = BaseEntity.LONG)
	// private long productId;
	//
	// @Column(name = "remaining", columnDefinition = BaseEntity.LONG)
	// private long remaining;
	//
	// @Column(name = "input_price", columnDefinition = BaseEntity.CURRENCY)
	// private BigDecimal inputPrice;
	//
	// @Column(name = "wholesale_price", columnDefinition = BaseEntity.CURRENCY)
	// private BigDecimal wholesalePrice;
	//
	// @Column(name = "retail_price", columnDefinition = BaseEntity.CURRENCY)
	// private BigDecimal retailPrice;

	
	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		WareHouseHistoryDto dto = (WareHouseHistoryDto) baseDto;
		this.warehouseId = dto.getWarehouseId();
		this.customer = dto.getCustomer();
		this.details = JsonFormatter.toJson(dto.getDetails());
		this.employee = dto.getEmployeeId();
		this.historyDateTime = dto.getHistoryDateTime();
		this.historyType = dto.getHistoryType();
		this.referenceNo = dto.getReferenceNo();
		this.supplier = dto.getSupplier();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		WareHouseHistoryDto dto = (WareHouseHistoryDto) baseDto;
		dto.setWarehouseId(warehouseId);
		dto.setCustomer(customer);
		Type listType = new TypeToken<ArrayList<ProductDto>>(){}.getType();
		dto.setDetails((List<ProductDto>) JsonFormatter.fromJson(details, listType));
		dto.setEmployeeId(employee);
		dto.setHistoryDateTime(historyDateTime);
		dto.setHistoryType(historyType);
		dto.setReferenceNo(referenceNo);
		dto.setSupplier(supplier);
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

	public Long getEmployee() {
		return employee;
	}

	public void setEmployee(Long employee) {
		this.employee = employee;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public long getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(long warehouseId) {
		this.warehouseId = warehouseId;
	}

}
