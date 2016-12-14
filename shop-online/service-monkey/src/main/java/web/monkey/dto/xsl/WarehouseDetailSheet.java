package web.monkey.dto.xsl;

import core.common.convert.StringConverter;
import core.common.convert.StringToLongConverter;
import core.common.xsl.anotation.XSLColumn;
import core.common.xsl.anotation.XSLSheet;

@XSLSheet(name = "Sheet1", startRow = 1)
public class WarehouseDetailSheet {
	
	@XSLColumn(index=1, converter=StringConverter.class)
	private String warehouse;

	@XSLColumn(index=2, converter=StringConverter.class)
	private String product;

	@XSLColumn(index=3, converter=StringToLongConverter.class)
	private long remaining;

	public String getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(String warehouse) {
		this.warehouse = warehouse;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public long getRemaining() {
		return remaining;
	}

	public void setRemaining(long remaining) {
		this.remaining = remaining;
	}
	
	
}
