package service.resource.shared.utils;

import core.service.utils.CRUDServiceAction;

public class ServiceResourceAction extends CRUDServiceAction {
	private static final String SERVER_NAME = "service.resource.server.name";
	private static final String SERVER_URL = "service.resource.server.url";

	public static final String RESOURCE_SERVICE = "/resource-service";
	
	public static final String UPLOAD = "/upload";
	public static final String DOWNLOAD = "/download/{id}";
	public static final String DELETE = "/delete/{id}";
	
	public static final String UPLOAD_TEMP = "/upload-temp";
	public static final String DOWNLOAD_TEMP = "/download-temp/{id}";
	public static final String DELETE_TEMP = "/delete-temp/{id}";
	
	@Override
	public String getServerName() {
		return SERVER_NAME;
	}

	@Override
	public String getServerUrl() {
		return SERVER_URL;
	}
}
