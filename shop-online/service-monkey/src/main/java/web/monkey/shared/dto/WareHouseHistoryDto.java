package web.monkey.shared.dto;

import java.math.BigDecimal;
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

	private List<ProductDto> details;

	private String description;

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

	public List<ProductDto> getDetails() {
		return details;
	}

	public void setDetails(List<ProductDto> details) {
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



	public class ProductDto {
		private long id;
		private String name;

		private long remaining;

		private BigDecimal inputPrice;

		private BigDecimal wholesalePrice;

		private BigDecimal retailPrice;
		
		private String description;

		public long getId() {
			return id;
		}
		
		public void setId(long id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
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

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}
	}

}
