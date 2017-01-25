package web.monkey.shared.dto;

import java.util.Date;

public class OrderSearchCondition {
	private Date fromDate;
	private Date toDate;
	private Long employee;
	private Long warehouse;
	private PaymentStatus paymentStatus;

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public Long getEmployee() {
		return employee;
	}

	public void setEmployee(Long employee) {
		this.employee = employee;
	}

	public Long getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(Long warehouse) {
		this.warehouse = warehouse;
	}

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
}
