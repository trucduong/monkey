package web.monkey.entities;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.OrderDetailDto;

@Entity
@Table(name = "order_details")
public class OrderDetail extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	@Column(name = "remaining", columnDefinition = LONG)
	private long remaining;

	@Column(name = "discount", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal discount;

	@Column(name = "price", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal price;

	@Column(name = "total", columnDefinition = BaseEntity.CURRENCY)
	private BigDecimal total;

	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		OrderDetailDto dto = (OrderDetailDto) baseDto;
		this.description = dto.getDescription();
		this.discount = dto.getDiscount();
		this.price = dto.getPrice();
		this.remaining = dto.getRemaining();
		this.total = dto.getTotal();
	}

	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		OrderDetailDto dto = (OrderDetailDto) baseDto;
		dto.setDescription(description);
		dto.setDiscount(discount);
		dto.setPrice(price);
		dto.setRemaining(remaining);
		dto.setTotal(total);
		dto.setOrderId(order.getId());

		if (product != null) {
			dto.setProductId(product.getId());
			dto.setProductName(product.getName());
		}
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Product getProduct() {
		return product;
	}
	
	public void setProduct(Product product) {
		this.product = product;
	}

	public long getRemaining() {
		return remaining;
	}

	public void setRemaining(long remaining) {
		this.remaining = remaining;
	}

	public BigDecimal getDiscount() {
		return discount;
	}

	public void setDiscount(BigDecimal discount) {
		this.discount = discount;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
