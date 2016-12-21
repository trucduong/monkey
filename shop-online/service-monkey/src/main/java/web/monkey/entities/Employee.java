package web.monkey.entities;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseCachedEntity;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.EmployeeDto;
import web.monkey.shared.dto.WorkingStatus;

@Entity
@Table(name = "employees")
public class Employee extends BaseCachedEntity {
	public static final String WORKING_STATUS = "workingStatus";
	private static final long serialVersionUID = 1L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;

	@Column(name = "title", columnDefinition = MEDIUM_1)
	private String title;

	@Column(name = "phone", columnDefinition = SHORT_2)
	private String phone;

	@Column(name = "sex", columnDefinition = SHORT_5)
	private String sex;

	@Column(name = "email", columnDefinition = MEDIUM_1)
	private String email;

	@Column(name = "birth_date", columnDefinition = DATE)
	@Temporal(TemporalType.DATE)
	private Date birthDate;

	@Column(name = "working_status", columnDefinition = SHORT_5)
	@Enumerated(EnumType.STRING)
	private WorkingStatus workingStatus;

	@Column(name = "address", columnDefinition = MEDIUM_2)
	private String address;
	
	@Column(name = "join_date", columnDefinition = BaseEntity.DATE)
	@Temporal(TemporalType.DATE)
	private Date joinDate;

	@Column(name = "face_amount", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal faceAmount;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public WorkingStatus getWorkingStatus() {
		return workingStatus;
	}

	public void setWorkingStatus(WorkingStatus workingStatus) {
		this.workingStatus = workingStatus;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate;
	}

	public BigDecimal getFaceAmount() {
		return faceAmount;
	}

	public void setFaceAmount(BigDecimal faceAmount) {
		this.faceAmount = faceAmount;
	}

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		EmployeeDto dto = (EmployeeDto) baseDto;
		this.name = dto.getName();
		this.title = dto.getTitle();
		this.phone = dto.getPhone();
		this.sex = dto.getSex();
		this.email = dto.getEmail();
		this.birthDate = dto.getBirthDate();
		this.workingStatus = dto.getWorkingStatus();
		this.joinDate = dto.getJoinDate();
		this.faceAmount = dto.getFaceAmount();
		this.address = dto.getAddress();
	}
	
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		EmployeeDto dto = (EmployeeDto) baseDto;
		dto.setName(this.name);
		dto.setTitle(this.title);
		dto.setPhone(this.phone);
		dto.setSex(this.sex);
		dto.setEmail(this.email);
		dto.setBirthDate(this.birthDate);
		dto.setWorkingStatus(this.workingStatus);
		dto.setJoinDate(this.joinDate);
		dto.setFaceAmount(this.faceAmount);
		dto.setAddress(this.address);
	}
	

}
