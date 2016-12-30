package web.monkey.shared.dto;

import java.math.BigDecimal;

import core.dao.dto.BaseDto;

public class OrderDetailDto extends BaseDto {
	private long orderId;
	private long pruductId;
	private String pruductName;
	private long remaining;
	private BigDecimal discount;
	private BigDecimal prices;
	private BigDecimal total;
	private String description;

	public long getPruductId() {
		return pruductId;
	}

	public void setPruductId(long pruductId) {
		this.pruductId = pruductId;
	}

	public long getRemaining() {
		return remaining;
	}

	public void setRemaining(long remaining) {
		this.remaining = remaining;
	}

	public BigDecimal getDiscount() {
		return discount;
	}

	public void setDiscount(BigDecimal discount) {
		this.discount = discount;
	}

	public BigDecimal getPrices() {
		return prices;
	}

	public void setPrices(BigDecimal prices) {
		this.prices = prices;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public String getPruductName() {
		return pruductName;
	}

	public void setPruductName(String pruductName) {
		this.pruductName = pruductName;
	}

}
