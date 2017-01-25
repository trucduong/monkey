package web.monkey.entities;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.RevenuesDto;
import web.monkey.shared.dto.RevenuesType;

@Entity
@Table(name = "revenues")
public class Revenues extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "employee_name", columnDefinition = MEDIUM_1)
	private String employeeName;
	
	@Column(name = "create_date", columnDefinition = TIMESTAMP)
	private Date createDate;
	
	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;
	
	@Column(name = "total", columnDefinition = CURRENCY)
	private BigDecimal total;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "revenues_type", columnDefinition = SHORT_5)
	private RevenuesType revenuesType;

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		RevenuesDto dto = (RevenuesDto) baseDto;
		this.createDate = dto.getCreateDate();
		this.description = dto.getDescription();
		this.employeeName = dto.getEmployeeName();
		this.revenuesType = dto.getRevenuesType();
		this.total = dto.getTotal();
	}
	
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		RevenuesDto dto = (RevenuesDto) baseDto;
		dto.setCreateDate(createDate);
		dto.setDescription(description);
		dto.setEmployeeName(employeeName);
		dto.setRevenuesType(revenuesType);
		dto.setTotal(total);
	}
	
	
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
