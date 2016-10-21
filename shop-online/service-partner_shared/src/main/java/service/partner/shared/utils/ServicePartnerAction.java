package service.partner.shared.utils;

import core.service.utils.CRUDServiceAction;

public class ServicePartnerAction extends CRUDServiceAction {
	private static final String SERVER_NAME = "service.partner.server.name";
	private static final String SERVER_URL = "service.partner.server.url";

	public static final String CUSTOMER_GROUP_SERVICE = "/customer-group";
	public static final String CUSTOMER_SERVICE = "/customer";
	public static final String SUPPLIER_SERVICE = "/supplier";
	public static final String SUPPLIER_GROUP_SERVICE = "/supplier-group";
	
	@Override
	public String getServerName() {
		return SERVER_NAME;
	}

	@Override
	public String getServerUrl() {
		return SERVER_URL;
	}
}
