package service.shop.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;

@Entity
@Table(name="shop_resources")
public class ShopResource extends BaseEntity {

	private static final long serialVersionUID = -3505212874494616431L;

	@Column(name = "shop", columnDefinition = SHORT_2)
	private String shop;

	@Column(name = "customers", columnDefinition = LONG_5)
	private String customers;

	@Column(name = "customer_groups", columnDefinition = LONG_5)
	private String customerGroups;

	@Column(name = "suppliers", columnDefinition = LONG_5)
	private String suppliers;

	@Column(name = "supplier_groups", columnDefinition = LONG_5)
	private String supplierGroups;

	@Column(name = "ware_houses", columnDefinition = LONG_5)
	private String wareHouses;

	@Column(name = "products", columnDefinition = LONG_5)
	private String products;

	@Column(name = "product_groups", columnDefinition = LONG_5)
	private String productGroups;
//
//	@Override
//	public Object getColIdValue() {
//		return shop;
//	}
//
//	@Override
//	public String getColIdName() {
//		return "shop";
//	}
//	
//	@Override
//	public Object convertToId(String value) {
//		return value;
//	}
	
	public String getShop() {
		return shop;
	}

	public void setShop(String shop) {
		this.shop = shop;
	}

	public String getCustomers() {
		return customers;
	}

	public void setCustomers(String customers) {
		this.customers = customers;
	}

	public String getCustomerGroups() {
		return customerGroups;
	}

	public void setCustomerGroups(String customerGroups) {
		this.customerGroups = customerGroups;
	}

	public String getSuppliers() {
		return suppliers;
	}

	public void setSuppliers(String suppliers) {
		this.suppliers = suppliers;
	}

	public String getSupplierGroups() {
		return supplierGroups;
	}

	public void setSupplierGroups(String supplierGroups) {
		this.supplierGroups = supplierGroups;
	}

	public String getProducts() {
		return products;
	}

	public void setProducts(String products) {
		this.products = products;
	}

	public String getProductGroups() {
		return productGroups;
	}

	public void setProductGroups(String productGroups) {
		this.productGroups = productGroups;
	}

	@Override
	public void bind(BaseDto dto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void unBind(BaseDto dto) {
		// TODO Auto-generated method stub
		
	}
}
