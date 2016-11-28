package service.catalogue.entities;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import core.dao.entities.IEntity;
import service.catalogue.shared.dto.ProductDto;

@Entity
@Table(name = "product_details")
public class ProductDetail implements IEntity {

	public static final String ID = "id";

	@Version
	@Column(name = "version")
	private int version;

	@Id
	@Column(name = "id", columnDefinition = BaseEntity.LONG)
	private long id;

	@Column(name = "discount", columnDefinition = BaseEntity.INT)
	private int discount;

	@Column(name = "remaining", columnDefinition = BaseEntity.LONG)
	private long remaining;

	@Column(name = "input_price", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal inputPrice;

	@Column(name = "wholesale_price", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal wholesalePrice;

	@Column(name = "retail_price", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal retailPrice;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public long getRemaining() {
		return remaining;
	}

	public void setRemaining(long remaining) {
		this.remaining = remaining;
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

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	@Override
	public void bind(BaseDto basedto) {
		ProductDto dto = (ProductDto) basedto;
		this.id = dto.getId();
		this.discount = dto.getDiscount();
		this.remaining = dto.getRemaining();
		this.inputPrice = dto.getInputPrice();
		this.retailPrice = dto.getRetailPrice();
		this.wholesalePrice = dto.getWholesalePrice();
	}

	@Override
	public void unBind(BaseDto basedto) {
		ProductDto dto = (ProductDto) basedto;
		dto.setId(id);
		dto.setDiscount(discount);
		dto.setInputPrice(inputPrice);
		dto.setRemaining(remaining);
		dto.setRetailPrice(retailPrice);
		dto.setWholesalePrice(wholesalePrice);
	}

}