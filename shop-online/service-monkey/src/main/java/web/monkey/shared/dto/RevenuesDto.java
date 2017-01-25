package web.monkey.shared.dto;

import java.math.BigDecimal;
import java.util.Date;

import core.dao.dto.BaseDto;

public class RevenuesDto extends BaseDto {
	private String employeeName;

	private Date createDate;

	private String description;

	private BigDecimal total;

	private RevenuesType revenuesType;

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public RevenuesType getRevenuesType() {
		return revenuesType;
	}

	public void setRevenuesType(RevenuesType revenuesType) {
		this.revenuesType = revenuesType;
	}

}
