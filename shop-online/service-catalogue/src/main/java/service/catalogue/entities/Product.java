package service.catalogue.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import core.dao.entities.BaseEntity;
import service.catalogue.shared.utils.ProductStatus;

@Entity
@Table(name="products")
public class Product extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "code", columnDefinition = SHORT_2)
	private String code;

	@Column(name = "name", columnDefinition = SHORT_5)
	private String name;

	@Column(name = "image", columnDefinition = MEDIUM_1)
	private String image;

	@Column(name = "unit", columnDefinition = SHORT_5)
	private String unit;

	@Column(name = "product_group", columnDefinition = LONG)
	private Long group;

	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;

	@Enumerated(EnumType.STRING)
	@Column(name = "product_status", columnDefinition = SHORT_5)
	private ProductStatus status;
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Object getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getUnit() {
		return unit;
	}
	
	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Long getGroup() {
		return group;
	}

	public void setGroup(Long group) {
		this.group = group;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public ProductStatus getStatus() {
		return status;
	}
	
	public void setStatus(ProductStatus status) {
		this.status = status;
	}
}
