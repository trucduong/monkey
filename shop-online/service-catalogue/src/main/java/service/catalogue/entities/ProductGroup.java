package service.catalogue.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.entities.BaseEntity;

@Entity
@Table(name="product_groups")
public class ProductGroup extends BaseEntity {
	private static final long serialVersionUID = -3065264917043198173L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;
	
	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;
	
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
}
