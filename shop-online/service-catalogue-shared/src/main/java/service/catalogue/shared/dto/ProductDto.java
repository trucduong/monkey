package service.catalogue.shared.dto;

import service.catalogue.shared.utils.ProductStatus;

public class ProductDto {

	private long id;
	
	private String tenant;
	
	private String code;

	private String name;

	private Object image;

	private Long unit;

	private Long group;

	private String description;
	
	private String productId;
	
	private ProductStatus status;
	
	private int discount;
	
	private long remaining;
	
	private long warningRemaining;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTenant() {
		return tenant;
	}

	public void setTenant(String tenant) {
		this.tenant = tenant;
	}

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

	public void setImage(Object image) {
		this.image = image;
	}

	public Long getUnit() {
		return unit;
	}

	public void setUnit(Long unit) {
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

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public ProductStatus getStatus() {
		return status;
	}

	public void setStatus(ProductStatus status) {
		this.status = status;
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

	public long getWarningRemaining() {
		return warningRemaining;
	}

	public void setWarningRemaining(long warningRemaining) {
		this.warningRemaining = warningRemaining;
	}
}
