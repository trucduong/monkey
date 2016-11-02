package service.catalogue.shared.utils;

public enum ProductStatus {
	ACTIVE("active"),
	EXPIRED("expired");
	

	private String value;
	private ProductStatus(String value) {
		this.value = value;
	}
	
	@Override
	public String toString() {
		return this.value;
	}
}
