package web.monkey.shared.dto;

public enum WarehouseHistoryType {
	IMPORT, // nhap moi
	IMPORT_RETURNS, // nhap tra hang
	EXPORT, // xuat ban
	EXPORT_RETURNS, // xuat tra hang
	DETAIL, // Kiem ke
	TRANSFER; // chueyn kho
	
	public static WarehouseHistoryType fromString(String str) {
		if (str == null) {
			return null;
		}

		try {
			return WarehouseHistoryType.valueOf(str.toUpperCase());
		} catch (Exception e) {}
		
		return null;
	}
}
