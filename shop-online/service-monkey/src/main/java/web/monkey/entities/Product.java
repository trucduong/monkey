package web.monkey.entities;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseCachedEntity;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.ProductDto;
import web.monkey.shared.dto.ProductStatus;

@Entity
@Table(name = "products")
public class Product extends BaseCachedEntity {
	
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

	@ManyToOne
	@JoinColumn(name="product_group")
	private ProductGroup productGroup;

	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;

	@Enumerated(EnumType.STRING)
	@Column(name = "product_status", columnDefinition = SHORT_5)
	private ProductStatus status;

	@Column(name = "warning_remaining", columnDefinition = LONG)
	private long warningRemaining;
	
	@Column(name = "discount", columnDefinition = BaseEntity.INT)
	private int discount;

	@Column(name = "input_price", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal inputPrice;

	@Column(name = "wholesale_price", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal wholesalePrice;

	@Column(name = "retail_price", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal retailPrice;
	
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

	public String getImage() {
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

	public ProductGroup getProductGroup() {
		return productGroup;
	}

	public void setProductGroup(ProductGroup productGroup) {
		this.productGroup = productGroup;
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

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public BigDecimal getInputPrice() {
		return inputPrice;
	}

	public void setInputPrice(BigDecimal inputPrice) {
		this.inputPrice = inputPrice;
	}

	public BigDecimal getWholesalePrice() {
		return wholesalePrice;
	}

	public void setWholesalePrice(BigDecimal wholesalePrice) {
		this.wholesalePrice = wholesalePrice;
	}

	public BigDecimal getRetailPrice() {
		return retailPrice;
	}

	public void setRetailPrice(BigDecimal retailPrice) {
		this.retailPrice = retailPrice;
	}

	@Override
	public void bind(BaseDto basedto) {
		super.bind(basedto);
		ProductDto dto = (ProductDto) basedto;
		this.name = dto.getName();
		this.code = dto.getCode();
		this.description = dto.getDescription();
		this.unit = dto.getUnit();
//		this.group = dto.getGroup();
		this.warningRemaining = dto.getWarningRemaining();
		this.image = dto.getImage();
		this.status = dto.getStatus();
		this.discount = dto.getDiscount();
		this.inputPrice = dto.getInputPrice();
		this.retailPrice = dto.getRetailPrice();
		this.wholesalePrice = dto.getWholesalePrice();
	}

	@Override
	public void unBind(BaseDto basedto) {
		super.unBind(basedto);
		ProductDto dto = (ProductDto) basedto;
		dto.setDescription(description);
		dto.setCode(code);
		dto.setImage(image);
		dto.setName(name);
		dto.setStatus(status);
		dto.setWarningRemaining(warningRemaining);
		dto.setUnit(unit);
		dto.setDiscount(discount);
		dto.setInputPrice(inputPrice);
		dto.setRetailPrice(retailPrice);
		dto.setWholesalePrice(wholesalePrice);
		
		if (productGroup != null) {
			dto.setGroupId(productGroup.getId());
			dto.setGroupName(productGroup.getName());
		}
	}
}
