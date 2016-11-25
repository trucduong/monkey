package service.partner.shared.utils;

import core.service.utils.CRUDServiceAction;

public class ServicePartnerAction extends CRUDServiceAction {
	private static final String SERVER_NAME = "service.partner.server.name";
	private static final String SERVER_URL = "service.partner.server.url";

	public static final String CUSTOMER_GROUP_SERVICE = "/customer-group";
	public static final String CUSTOMER_SERVICE = "/customer";
	public static final String SUPPLIER_SERVICE = "/supplier";
	public static final String SUPPLIER_GROUP_SERVICE = "/supplier-group";
	public static final String EMPLOYEE_SERVICE = "/employee";
	
	public static final String READ_D = "/read-d/{id}";
	public static final String READ_ALL_D = "/read-all-d";
	public static final String READ_BY_D = "/read-by-d/{name}/{value}";
	public static final String READ_ALL_BY_D = "/read-all-by-d/{name}/{values}";
	public static final String UPDATE_D = "/update-d/{id}";
	
	@Override
	public String getServerName() {
		return SERVER_NAME;
	}

	@Override
	public String getServerUrl() {
		return SERVER_URL;
	}
}
