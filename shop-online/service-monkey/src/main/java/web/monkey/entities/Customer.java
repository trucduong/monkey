package web.monkey.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseCachedEntity;
import web.monkey.shared.dto.CustomerDto;

@Entity
@Table(name="customers")
public class Customer extends BaseCachedEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;
	
	@Column(name = "phone", columnDefinition = SHORT_2)
	private String phone;
	
	@Column(name = "sex", columnDefinition = SHORT_5)
	private String sex;
	
	@Column(name = "email", columnDefinition = MEDIUM_1)
	private String email;
	
	@Column(name = "address", columnDefinition = MEDIUM_2)
	private String address;
	
	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;

	@ManyToOne
	@JoinColumn(name="customer_group")
	private CustomerGroup customerGroup;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public CustomerGroup getCustomerGroup() {
		return customerGroup;
	}

	public void setCustomerGroup(CustomerGroup customerGroup) {
		this.customerGroup = customerGroup;
	}

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		CustomerDto dto = (CustomerDto) baseDto;
		this.address = dto.getAddress();
		this.description = dto.getDescription();
		this.email = dto.getEmail();
//		this.group = dto.getGroup();
		this.name = dto.getName();
		this.phone = dto.getPhone();
		this.sex = dto.getSex();
	}
	
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		CustomerDto dto = (CustomerDto) baseDto;
		dto.setAddress(address);
		dto.setDescription(description);
		dto.setEmail(email);
		dto.setName(name);
		dto.setPhone(phone);
		dto.setSex(sex);
		if (customerGroup != null) {
			dto.setGroupId(customerGroup.getId());
			dto.setGroupName(customerGroup.getName());
		}
	}
}
