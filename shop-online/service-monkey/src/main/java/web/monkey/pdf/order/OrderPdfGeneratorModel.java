package web.monkey.pdf.order;

import java.util.Date;
import java.util.List;

import web.monkey.pdf.PdfGeneratorModel;

public class OrderPdfGeneratorModel extends PdfGeneratorModel {
	private String company;
	private String address;
	private String taxCode;
	private String phone;
	private Date currentDate;
	private String warehouse;
	private String employee;
	private String description;
	List<OrderPdfDetail> details;

	public String getTaxCode() {
		return taxCode;
	}

	public void setTaxCode(String taxCode) {
		this.taxCode = taxCode;
	}

	public List<OrderPdfDetail> getDetails() {
		return details;
	}

	public void setDetails(List<OrderPdfDetail> details) {
		this.details = details;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getCurrentDate() {
		return currentDate;
	}

	public void setCurrentDate(Date currentDate) {
		this.currentDate = currentDate;
	}

	public String getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(String warehouse) {
		this.warehouse = warehouse;
	}

	public String getEmployee() {
		return employee;
	}

	public void setEmployee(String employee) {
		this.employee = employee;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public class OrderPdfDetail {
		private String productName;
		private String remaining;
		private String description;

		public String getProductName() {
			return productName;
		}

		public void setProductName(String productName) {
			this.productName = productName;
		}

		public String getRemaining() {
			return remaining;
		}

		public void setRemaining(String remaining) {
			this.remaining = remaining;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

	}
}
