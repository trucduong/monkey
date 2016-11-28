package service.partner.entities;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import core.dao.entities.IEntity;
import service.partner.shared.dto.EmployeeDto;

@Entity
@Table(name = "employee_details")
public class EmployeeDetail implements IEntity {
	@Version
	@Column(name = "version")
	private int version;

	@Id
	@Column(name = "id", columnDefinition = BaseEntity.LONG)
	private long id;

	@Column(name = "join_date", columnDefinition = BaseEntity.DATE)
	@Temporal(TemporalType.DATE)
	private Date joinDate;

	@Column(name = "face_amount", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal faceAmount;

	@Override
	public void bind(BaseDto baseDto) {
		EmployeeDto dto = (EmployeeDto) baseDto;
		this.id = dto.getId();
		this.joinDate = dto.getJoinDate();
		this.faceAmount = dto.getFaceAmount();
	}

	@Override
	public void unBind(BaseDto baseDto) {
		EmployeeDto dto = (EmployeeDto) baseDto;
		dto.setId(id);
		dto.setJoinDate(this.joinDate);
		dto.setFaceAmount(this.faceAmount);
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

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
