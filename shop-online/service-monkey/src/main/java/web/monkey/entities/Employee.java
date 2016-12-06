package web.monkey.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.EmployeeDto;
import web.monkey.shared.dto.WorkingStatus;

@Entity
@Table(name = "employees")
public class Employee extends BaseEntity {
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

	@Column(name = "address_detail", columnDefinition = MEDIUM_2)
	private String addressDetail;

	@Column(name = "address_1", columnDefinition = SHORT_5)
	private String address1;

	@Column(name = "address_2", columnDefinition = SHORT_5)
	private String address2;

	@Column(name = "address_3", columnDefinition = SHORT_5)
	private String address3;

	@Column(name = "details", columnDefinition = LONG_1)
	private String details;

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

	public String getAddressDetail() {
		return addressDetail;
	}

	public void setAddressDetail(String addressDetail) {
		this.addressDetail = addressDetail;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getAddress3() {
		return address3;
	}

	public void setAddress3(String address3) {
		this.address3 = address3;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
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
		this.addressDetail = dto.getAddressDetail();
		this.address1 = dto.getAddress1();
		this.address2 = dto.getAddress2();
		this.address3 = dto.getAddress3();
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
		dto.setAddressDetail(this.addressDetail);
		dto.setAddress1(this.address1);
		dto.setAddress2(this.address2);
		dto.setAddress3(this.address3);
	}
	

}
