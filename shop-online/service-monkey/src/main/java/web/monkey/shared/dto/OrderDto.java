package web.monkey.shared.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import core.dao.dto.BaseDto;

public class OrderDto extends BaseDto {

	private Date createDate;

	private long employeeId;

	private String employeeName;

	private long customerId;

	private String customerName;

	private String description;

	private OrderStatus status;

	private PaymentStatus paymentStatus;

	private BigDecimal total;

	private BigDecimal totalDiscount;

	private Set<OrderDetailDto> details;

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public BigDecimal getTotalDiscount() {
		return totalDiscount;
	}

	public void setTotalDiscount(BigDecimal totalDiscount) {
		this.totalDiscount = totalDiscount;
	}

	public Set<OrderDetailDto> getDetails() {
		return details;
	}

	public void setDetails(Set<OrderDetailDto> details) {
		this.details = details;
	}
}
