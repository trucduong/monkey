package web.monkey.entities;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.OrderDto;
import web.monkey.shared.dto.OrderStatus;
import web.monkey.shared.dto.PaymentStatus;

@Entity
@Table(name = "orders")
public class Order extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "create_date", columnDefinition = TIMESTAMP)
	private Date createDate;

	@ManyToOne
	@JoinColumn(name="employee_id")
	private Employee employee;
	
	@ManyToOne
	@JoinColumn(name="customer_id")
	private Customer customer;

	@Column(name = "description", columnDefinition = LONG_1)
	private String description;

	@Enumerated(EnumType.STRING)
	@Column(name = "order_status", columnDefinition = SHORT_5)
	private OrderStatus status;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "payment_status", columnDefinition = SHORT_5)
	private PaymentStatus paymentStatus;

	@Column(name = "total", columnDefinition = CURRENCY)
	private BigDecimal total;

	@Column(name = "total_discount", columnDefinition = CURRENCY)
	private BigDecimal totalDiscount;
	
	@OneToMany(mappedBy="order")
	private Set<OrderDetail> details;

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		OrderDto dto = (OrderDto) baseDto;
		this.createDate = dto.getCreateDate();
		this.description = dto.getDescription();
		this.total = dto.getTotal();
		this.totalDiscount = dto.getTotalDiscount();
		this.status = dto.getStatus();
		this.paymentStatus = dto.getPaymentStatus();
	}

	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		OrderDto dto = (OrderDto) baseDto;
		dto.setCreateDate(createDate);
		dto.setDescription(description);
		dto.setTotal(total);
		dto.setTotalDiscount(totalDiscount);
		dto.setStatus(status);
		dto.setPaymentStatus(paymentStatus);
		
		if (employee != null) {
			dto.setEmployeeId(employee.getId());
			dto.setEmployeeName(employee.getName());
		}
		
		if (customer != null) {
			dto.setCustomerId(customer.getId());
			dto.setCustomerName(customer.getName());
		}
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
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

	public Set<OrderDetail> getDetails() {
		return details;
	}

	public void setDetails(Set<OrderDetail> details) {
		this.details = details;
	}
}
