package service.catalogue.importexport;

import java.math.BigDecimal;

import core.common.convert.StringConverter;
import core.common.convert.StringToBigDecimalConverter;
import core.common.convert.StringToIntConverter;
import core.common.convert.StringToLongConverter;
import core.common.xsl.anotation.XSLColumn;
import core.common.xsl.anotation.XSLSheet;

@XSLSheet(name = "Sheet1", startRow = 1)
public class ProductPricesSheet {
	
	@XSLColumn(index=1, converter=StringToLongConverter.class)
	private Long id;

	@XSLColumn(index=2, converter=StringConverter.class)
	private String name;

	@XSLColumn(index=3, converter=StringConverter.class)
	private String group;

	@XSLColumn(index=4, converter=StringToLongConverter.class)
	private long remaining;
	
	@XSLColumn(index=5, converter=StringToIntConverter.class)
	private int discount;

	@XSLColumn(index=6, converter=StringToBigDecimalConverter.class)
	private BigDecimal inputPrice;

	@XSLColumn(index=7, converter=StringToBigDecimalConverter.class)
	private BigDecimal wholesalePrice;

	@XSLColumn(index=8, converter=StringToBigDecimalConverter.class)
	private BigDecimal retailPrice;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public long getRemaining() {
		return remaining;
	}

	public void setRemaining(long remaining) {
		this.remaining = remaining;
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
}
