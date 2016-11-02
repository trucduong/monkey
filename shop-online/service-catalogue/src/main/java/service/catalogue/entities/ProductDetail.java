package service.catalogue.entities;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.entities.BaseEntity;

@Entity
@Table(name="product_details")
public class ProductDetail extends BaseEntity {
	private static final long serialVersionUID = 1L;
	
	@Column(name = "product_id", columnDefinition = LONG)
	private String productId;
	
	@Column(name = "discount", columnDefinition = INT)
	private int discount;
	
	@Column(name = "remaining", columnDefinition = LONG)
	private long remaining;
	
	@Column(name="input_price", columnDefinition=CURRENCY)
	private BigDecimal inputPrice;
	
	@Column(name="wholesale_price", columnDefinition=CURRENCY)
	private BigDecimal wholesalePrice;
	
	@Column(name="retail_price", columnDefinition=CURRENCY)
	private BigDecimal retailPrice;

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
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
}