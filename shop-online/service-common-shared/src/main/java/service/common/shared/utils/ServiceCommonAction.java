package service.common.shared.utils;

import core.service.utils.CRUDServiceAction;

public class ServiceCommonAction extends CRUDServiceAction {
	private static final String SERVER_NAME = "service.common.server.name";
	private static final String SERVER_URL = "service.common.server.url";

	public static final String REF_SERVICE = "/ref-service";
	
	public static final String READ_CMB = "/read-cmb";
	
	@Override
	public String getServerName() {
		return SERVER_NAME;
	}

	@Override
	public String getServerUrl() {
		return SERVER_URL;
	}
}
