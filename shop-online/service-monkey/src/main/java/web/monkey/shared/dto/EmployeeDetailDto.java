package web.monkey.shared.dto;

import java.math.BigDecimal;
import java.util.Date;

import core.dao.dto.BaseDto;

public class EmployeeDetailDto extends BaseDto {

	private long id;

	private Date joinDate;

	private BigDecimal faceAmount;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public BigDecimal getFaceAmount() {
		return faceAmount;
	}

	public void setFaceAmount(BigDecimal faceAmount) {
		this.faceAmount = faceAmount;
	}

	public Date getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate;
	}
}
