package service.auth.shared.utils;

import java.util.HashMap;

import org.springframework.core.env.Environment;

import core.service.utils.CRUDServiceAction;
import core.service.utils.IServiceAction;

public class ServiceAuthAction extends CRUDServiceAction {
	private static final String SERVER_NAME = "service.auth.server.name";
	private static final String SERVER_URL = "service.auth.server.url";
	
	public static final String USERACCOUNT_SERVICE = "/user-account";
	public static final String AUTH_SERVICE = "/auth";
	
	public static final String GET_ACCOUNT_BY_NAME = "/account/{name}";
	public static final String GET_ACCOUNT_BY_NAME__NAME = "name";
	
	public static final String UPDATE_PASSWORD = "/update-password/{name}";
	public static final String UPDATE_PERMISSIONS = "/update-permissions/{name}";
	
	public static final String PERMISSION_READ_ALL = "/permission/read-all";
	
	
	
	public static IServiceAction getAccountByName(Environment env, String name) {
		ServiceAuthAction action = new ServiceAuthAction();
		
		action.url = new StringBuilder(env.getProperty(SERVER_URL))
				.append(env.getProperty(SERVER_NAME))
				.append(GET_ACCOUNT_BY_NAME).toString();
		
		action.params = new HashMap<String, Object>();
		action.params.put(GET_ACCOUNT_BY_NAME__NAME, name);
		return action;
	}
}
