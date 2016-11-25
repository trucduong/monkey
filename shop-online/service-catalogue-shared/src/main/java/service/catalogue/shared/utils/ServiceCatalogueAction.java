package service.catalogue.shared.utils;

import core.service.utils.CRUDServiceAction;

public class ServiceCatalogueAction extends CRUDServiceAction {
	private static final String SERVER_NAME = "service.catalogue.server.name";
	private static final String SERVER_URL = "service.catalogue.server.url";

	public static final String PRODUCT_SERVICE = "/product";
	public static final String PRODUCT_GROUP_SERVICE = "/product-group";
	
	
	public static final String READ_D = "/read-d/{id}";
	public static final String READ_ALL_D = "/read-all-d";
	public static final String READ_BY_D = "/read-by-d/{name}/{value}";
	public static final String READ_ALL_BY_D = "/read-all-by-d/{name}/{values}";
	public static final String UPDATE_D = "/update-d/{id}";
	
	public static final String DOWNLOAD_PRICES = "/download-prices";
	
	
	@Override
	public String getServerName() {
		return SERVER_NAME;
	}

	@Override
	public String getServerUrl() {
		return SERVER_URL;
	}
}
