package core.common.convert;

import java.math.BigDecimal;

public class ConverterUtils {
	public static int toInt(Object obj, int defaultVal) {
		try {
			if (obj instanceof Integer) {
				return (int)obj;
			}
			return Integer.parseInt(obj.toString());
		} catch (Exception e) {}
		return defaultVal;
	}
	
	public static int toInt(Object obj) {
		return toInt(obj, 0);
	}
	
	public static long toLong(Object obj, long defaultVal) {
		try {
			if (obj instanceof Long) {
				return (Long) obj;
			}
			return Long.parseLong(obj.toString());
		} catch (Exception e) {}
		return defaultVal;
	}
	
	public static long toLong(Object obj) {
		return toLong(obj, 0);
	}
	
	public static String toString(Object obj, String defaultVal) {
		try {
			if (obj instanceof String) {
				return (String) obj;
			}
			return String.valueOf(obj);
		} catch (Exception e) {}
		return defaultVal;
	}
	
	public static String toString(Object obj) {
		return toString(obj, "");
	}
	
	public static BigDecimal toBigDecimal(Object obj, BigDecimal defaultVal) {
		try {
			if (obj instanceof BigDecimal) {
				return (BigDecimal) obj;
			}
			return new BigDecimal(obj.toString());
		} catch (Exception e) {}
		return defaultVal;
	}
	
	public static BigDecimal toBigDecimal(Object obj) {
		return toBigDecimal(obj, BigDecimal.ZERO);
	}
}
