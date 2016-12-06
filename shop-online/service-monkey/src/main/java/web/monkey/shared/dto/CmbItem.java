package web.monkey.shared.dto;

public class CmbItem {
	private String type;
	private String value;
	private String label;
	private int orderWeight;
	
	public CmbItem() {
	}
	
	public CmbItem(String type, String value, String label, int orderWeight) {
		this.type = type;
		this.value = value;
		this.label = label;
		this.orderWeight = orderWeight;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public int getOrderWeight() {
		return orderWeight;
	}

	public void setOrderWeight(int orderWeight) {
		this.orderWeight = orderWeight;
	}
}
