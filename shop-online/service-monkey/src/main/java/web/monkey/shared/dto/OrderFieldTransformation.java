package web.monkey.shared.dto;

import java.util.HashMap;
import java.util.Map;

import core.dao.search.FieldTransformation;

public class OrderFieldTransformation extends FieldTransformation {
	public static final String FROM_DATE = "FROM_DATE";
	public static final String TO_DATE = "TO_DATE";
	public static final String EMPLOYEE = "EMPLOYEE";
	public static final String WAREHOUSE = "WAREHOUSE";
	public static final String PAYMENT_STATUS = "PAYMENT_STATUS";
	
	private Map<String, String> maps;
	
	public OrderFieldTransformation() {
		maps = new HashMap<>();
		maps.put(FROM_DATE, "FROM_DATE");
		maps.put(TO_DATE, "TO_DATE");
		maps.put(EMPLOYEE, "employee_id");
		maps.put(WAREHOUSE, "warehouse_id");
		maps.put(PAYMENT_STATUS, "paymentStatus");
	}
	
	@Override
	protected Map<String, String> getFieldMappings() {
		return maps;
	}
}
