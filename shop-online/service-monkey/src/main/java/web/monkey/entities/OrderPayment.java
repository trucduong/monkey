package web.monkey.entities;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.OrderPaymentDto;

@Entity
@Table(name = "order_payments")
public class OrderPayment extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;

	@Column(name = "create_date", columnDefinition = TIMESTAMP)
	private Date createDate;

	@Column(name = "total", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal total;

	@Column(name = "employee_name", columnDefinition = MEDIUM_1)
	private String employeeName;

	@Column(name = "customer_name", columnDefinition = MEDIUM_1)
	private String customerName;

	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		OrderPaymentDto dto = (OrderPaymentDto) baseDto;
		this.description = dto.getDescription();
		this.createDate = dto.getCreateDate();
		this.customerName = dto.getCustomerName();
		this.employeeName = dto.getEmployeeName();
		this.description = dto.getDescription();
		this.total = dto.getReceived();
	}

	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		OrderPaymentDto dto = (OrderPaymentDto) baseDto;
		dto.setDescription(description);
		dto.setCreateDate(createDate);
		dto.setCustomerName(customerName);
		dto.setEmployeeName(employeeName);
		dto.setOrderId(order.getId());
//		dto.setTotal(total);
		dto.setReceived(total);
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
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

}
