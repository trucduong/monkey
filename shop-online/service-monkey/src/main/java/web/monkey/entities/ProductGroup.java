package web.monkey.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseCachedEntity;
import web.monkey.shared.dto.ProductGroupDto;

@Entity
@Table(name = "product_groups")
public class ProductGroup extends BaseCachedEntity {
	private static final long serialVersionUID = -3065264917043198173L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;

	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;
	
	@OneToMany(mappedBy="productGroup")
	private Set<Product> products;

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
	
	public Set<Product> getProducts() {
		return products;
	}
	
	public void setProducts(Set<Product> products) {
		this.products = products;
	}

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		ProductGroupDto dto = (ProductGroupDto) baseDto;
		this.name = dto.getName();
		this.description = dto.getDescription();
	}

	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		ProductGroupDto dto = (ProductGroupDto) baseDto;
		dto.setName(name);
		dto.setDescription(description);
	}
}
