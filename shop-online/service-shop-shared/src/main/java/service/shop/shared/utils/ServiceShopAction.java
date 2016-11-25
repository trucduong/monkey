package service.shop.shared.utils;

import core.service.utils.CRUDServiceAction;

public class ServiceShopAction extends CRUDServiceAction {
	private static final String SERVER_NAME = "service.shop.server.name";
	private static final String SERVER_URL = "service.shop.server.url";

	public static final String SHOP_SERVICE = "/shop";
	public static final String WAREHOUSE_SERVICE = "/warehouse";
	
	@Override
	public String getServerName() {
		return SERVER_NAME;
	}

	@Override
	public String getServerUrl() {
		return SERVER_URL;
	}
}
