package web.monkey.shared.utils;

import core.service.utils.CRUDServiceAction;

public class ServiceActions extends CRUDServiceAction {
	public static final String SHOP_SERVICE = "/shop";
	public static final String USERACCOUNT_SERVICE = "/user-account";
	public static final String AUTH_SERVICE = "/auth";
	public static final String PRODUCT_SERVICE = "/product";
	public static final String PRODUCT_GROUP_SERVICE = "/product-group";
	public static final String DOWNLOAD_PRICES = "/download-prices";
	public static final String WAREHOUSE_SERVICE = "/warehouse";
	public static final String REF_SERVICE = "/ref-service";
	public static final String CUSTOMER_GROUP_SERVICE = "/customer-group";
	public static final String CUSTOMER_SERVICE = "/customer";
	public static final String SUPPLIER_SERVICE = "/supplier";
	public static final String SUPPLIER_GROUP_SERVICE = "/supplier-group";
	public static final String EMPLOYEE_SERVICE = "/employee";
	public static final String ORDER_SERVICE = "/order";

	public static final String GET_ACCOUNT_BY_NAME = "/account/{name}";
	public static final String GET_ACCOUNT_BY_NAME__NAME = "name";
	public static final String UPDATE_PASSWORD = "/update-password/{name}";
	public static final String UPDATE_PERMISSIONS = "/update-permissions/{name}";
	public static final String PERMISSION_READ_ALL = "/permission/read-all";

	public static final String LOGIN = "/login";
	public static final String LOGOUT = "/logout";

	public static final String READ_D = "/read-d/{id}";
	public static final String READ_ALL_D = "/read-all-d";
	public static final String READ_ALL_REF = "/read-all-ref";
	public static final String READ_BY_D = "/read-by-d/{name}/{value}";
	public static final String READ_ALL_BY_D = "/read-all-by-d/{name}/{values}";
	public static final String UPDATE_D = "/update-d/{id}";

	public static final String READ_CMB = "/read-cmb/{type}";
	
//	public static final String WAREHOUSE_IMPORT = "/import";
//	public static final String WAREHOUSE_IMPORT_HISTORY = "/import-history";
//	public static final String WAREHOUSE_UPDATE_DETAILS = "/update-details";
//	public static final String WAREHOUSE_DETAILS = "/details";
	public static final String DOWNLOAD_DETAILS = "/download-details";
	public static final String WAREHOUSE_DETAIL = "/detail"; // ?warehouse=0&product=0
	
	public static final String WAREHOUSE_TRACKING = "/tracking/{type}";
	public static final String WAREHOUSE_HISTORY = "/history/{type}";
	
	public static final String DOWNLOAD_ORDER = "/download-order/{id}";
}
