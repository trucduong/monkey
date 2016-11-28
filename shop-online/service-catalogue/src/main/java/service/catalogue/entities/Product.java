package service.catalogue.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import service.catalogue.shared.dto.ProductDto;
import service.catalogue.shared.utils.ProductStatus;

@Entity
@Table(name = "products")
public class Product extends BaseEntity {
	
	public static final String NAME = "name";
	public static final String STATUS = "status";

	private static final long serialVersionUID = 1L;

	@Column(name = "code", columnDefinition = SHORT_2)
	private String code;

	@Column(name = "name", columnDefinition = MEDIUM_1)
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

	@Column(name = "warning_remaining", columnDefinition = LONG)
	private long warningRemaining;

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

	public long getWarningRemaining() {
		return warningRemaining;
	}

	public void setWarningRemaining(long warningRemaining) {
		this.warningRemaining = warningRemaining;
	}

	public Long getGroup() {
		return group;
	}

	public void setGroup(Long group) {
		this.group = group;
	}

	@Override
	public void bind(BaseDto basedto) {
		super.bind(basedto);
		ProductDto dto = (ProductDto) basedto;
		this.name = dto.getName();
		this.code = dto.getCode();
		this.description = dto.getDescription();
		this.unit = dto.getUnit();
		this.group = dto.getGroup();
		this.warningRemaining = dto.getWarningRemaining();
		this.image = dto.getImage();
		this.status = dto.getStatus();
	}

	@Override
	public void unBind(BaseDto basedto) {
		super.unBind(basedto);
		ProductDto dto = (ProductDto) basedto;
		dto.setDescription(description);
		dto.setCode(code);
		dto.setGroup(group);
		dto.setImage(image);
		dto.setName(name);
		dto.setStatus(status);
		dto.setWarningRemaining(warningRemaining);
		dto.setUnit(unit);
	}

}
