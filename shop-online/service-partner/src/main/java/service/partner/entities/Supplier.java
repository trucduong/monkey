package service.partner.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.entities.BaseEntity;

@Entity
@Table(name="suppliers")
public class Supplier extends BaseEntity {
	private static final long serialVersionUID = 7977594443915836167L;

//	@Column(name = "id", columnDefinition = INT)
//	private Integer id;

	@Column(name = "name", columnDefinition = SHORT_5)
	private String name;

	@Column(name = "address_detail", columnDefinition = SHORT_5)
	private String addressDetail;

	@Column(name = "address_1", columnDefinition = SHORT_5)
	private String address1;

	@Column(name = "address_2", columnDefinition = SHORT_5)
	private String address2;

	@Column(name = "address_3", columnDefinition = SHORT_5)
	private String address3;

	@Column(name = "fax", columnDefinition = SHORT_2)
	private String fax;

	@Column(name = "contact_name", columnDefinition = SHORT_5)
	private String contactName;

	@Column(name = "contact_phone", columnDefinition = SHORT_2)
	private String contactPhone;

	@Column(name = "contact_email", columnDefinition = SHORT_5)
	private String contactEmail;

	@Column(name = "contact_birthday", columnDefinition = DATE)
	private Date contactBirthday;

	@Column(name = "note", columnDefinition = MEDIUM_5)
	private String note;
//
//	@Override
//	public Object getColIdValue() {
//		return id;
//	}
//
//	@Override
//	public String getColIdName() {
//		return "id";
//	}

//	public Integer getId() {
//		return id;
//	}
//
//	public void setId(Integer id) {
//		this.id = id;
//	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public String getContactPhone() {
		return contactPhone;
	}

	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public Date getContactBirthday() {
		return contactBirthday;
	}

	public void setContactBirthday(Date contactBirthday) {
		this.contactBirthday = contactBirthday;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
//	
//	@Override
//	public Object convertToId(String value) {
//		return Integer.valueOf(value);
//	}
}
