package service.catalogue.entities;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import core.dao.entities.IEntity;
import service.catalogue.shared.dto.ProductDto;

@Entity
@Table(name = "product_details")
public class ProductDetail implements IEntity {

	@Version
	@Column(name = "version")
	private int version;

	@Id
	@Column(name = "id", columnDefinition = BaseEntity.LONG)
	private long id;

	@OneToOne(optional = false)
	@MapsId
	@JsonIgnore
	private Product product;

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

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public void bind(ProductDto dto) {
		dto.setDiscount(discount);
		dto.setInputPrice(inputPrice);
		dto.setRemaining(remaining);
		dto.setRetailPrice(retailPrice);
		dto.setWholesalePrice(wholesalePrice);
	}

	@Override
	public void bind(BaseDto basedto) {
		ProductDto dto = (ProductDto) basedto;
//		this.setId(dto.getId());
		this.setDiscount(dto.getDiscount());
		this.setRemaining(dto.getRemaining());
		this.setInputPrice(dto.getInputPrice());
		this.setRetailPrice(dto.getRetailPrice());
		this.setWholesalePrice(dto.getWholesalePrice());
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