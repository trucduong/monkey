package web.monkey.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseCachedEntity;
import web.monkey.shared.dto.CustomerGroupDto;

@Entity
@Table(name = "customer_groups")
public class CustomerGroup extends BaseCachedEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;

	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;
	
	@OneToMany(mappedBy="customerGroup")
	private Set<Customer> customers;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public Set<Customer> getCustomers() {
		return customers;
	}

	public void setCustomers(Set<Customer> customers) {
		this.customers = customers;
	}

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		CustomerGroupDto dto = (CustomerGroupDto) baseDto;
		this.description = dto.getDescription();
		this.name = dto.getName();
	}
	
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		CustomerGroupDto dto = (CustomerGroupDto) baseDto;
		dto.setDescription(description);
		dto.setName(name);
	}
}
