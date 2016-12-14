package web.monkey.shared.dto;

import java.math.BigDecimal;
import java.util.Date;

import core.dao.dto.BaseDto;

public class WareHouseHistoryDetailDto extends BaseDto {

	private String warehouse;

	private String referenceNo;

	private Date historyDateTime;

	private WarehouseHistoryType historyType;

	private String supplier;

	private String customer;

	private String employee;

	private String product;

	private long remaining;

	private BigDecimal inputPrice;

	private BigDecimal wholesalePrice;

	private BigDecimal retailPrice;

	public String getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(String warehouse) {
		this.warehouse = warehouse;
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

	public String getEmployee() {
		return employee;
	}
	
	public void setEmployee(String employee) {
		this.employee = employee;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public long getRemaining() {
		return remaining;
	}

	public void setRemaining(long remaining) {
		this.remaining = remaining;
	}

	public BigDecimal getInputPrice() {
		return inputPrice;
	}

	public void setInputPrice(BigDecimal inputPrice) {
		this.inputPrice = inputPrice;
	}

	public BigDecimal getWholesalePrice() {
		return wholesalePrice;
	}

	public void setWholesalePrice(BigDecimal wholesalePrice) {
		this.wholesalePrice = wholesalePrice;
	}

	public BigDecimal getRetailPrice() {
		return retailPrice;
	}

	public void setRetailPrice(BigDecimal retailPrice) {
		this.retailPrice = retailPrice;
	}

}
