package web.monkey.entities;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import com.google.gson.reflect.TypeToken;

import core.common.format.json.JsonFormatter;
import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.OrderDetailDto;
import web.monkey.shared.dto.OrderDto;
import web.monkey.shared.dto.OrderStatus;

@Entity
@Table(name = "orders")
public class Order extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "create_date", columnDefinition = TIMESTAMP)
	private Date createDate;

	@Column(name = "employeeId", columnDefinition = LONG)
	private long employeeId;

	@Column(name = "customerId", columnDefinition = LONG)
	private long customerId;

	@Column(name = "warehouseId", columnDefinition = LONG)
	private long warehouseId;

	@Column(name = "description", columnDefinition = LONG_1)
	private String description;

	@Column(name = "details", columnDefinition = LONG_1)
	private String details;

	@Enumerated(EnumType.STRING)
	@Column(name = "product_status", columnDefinition = SHORT_5)
	private OrderStatus status;

	@Column(name = "total", columnDefinition = CURRENCY)
	private BigDecimal total;

	@Column(name = "total_discount", columnDefinition = CURRENCY)
	private BigDecimal totalDiscount;

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		OrderDto dto = (OrderDto) baseDto;
		this.createDate = dto.getCreateDate();
		this.customerId = dto.getCustomerId();
		this.description = dto.getDescription();
		this.details = JsonFormatter.toJson(dto.getDetails());
		this.employeeId = dto.getEmployeeId();
		this.warehouseId = dto.getWarehouseId();
		this.total = dto.getTotal();
		this.totalDiscount = dto.getTotalDiscount();
	}

	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		OrderDto dto = (OrderDto) baseDto;
		dto.setCreateDate(createDate);
		dto.setCustomerId(customerId);
		dto.setDescription(description);
		dto.setEmployeeId(employeeId);
		Type listType = new TypeToken<ArrayList<OrderDetailDto>>() {
		}.getType();
		dto.setDetails((List<OrderDetailDto>) JsonFormatter.fromJson(details, listType));
		dto.setWarehouseId(warehouseId);
		dto.setTotal(total);
		dto.setTotalDiscount(totalDiscount);
	}

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

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public long getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(long warehouseId) {
		this.warehouseId = warehouseId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
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

}
