package service.shop.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.entities.BaseEntity;

@Entity
@Table(name="shop_branches")
public class ShopBranch extends BaseEntity {

	private static final long serialVersionUID = -6285334178537511775L;

//	@Column(name = "id", columnDefinition = INT)
//	private Integer id;

	@Column(name = "shop", columnDefinition = SHORT_2)
	private String shop;

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

	@Column(name = "manager", columnDefinition = SHORT_5)
	private String manager;

	@Column(name = "phone", columnDefinition = SHORT_2)
	private String phone;
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
//	
//	@Override
//	public Object convertToId(String value) {
//		return Integer.valueOf(value);
//	}

//	public Integer getId() {
//		return id;
//	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getShop() {
		return shop;
	}

	public void setShop(String shop) {
		this.shop = shop;
	}

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

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
