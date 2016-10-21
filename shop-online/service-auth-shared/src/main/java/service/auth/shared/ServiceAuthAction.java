package service.auth.shared;

import java.util.HashMap;
import java.util.Map;

import org.springframework.core.env.Environment;

import core.service.utils.IServiceAction;

public class ServiceAuthAction implements IServiceAction {
	private static final String SERVER_NAME = "service.auth.server.name";
	private static final String SERVER_URL = "service.auth.server.url";
	
	public static final String GET_ACCOUNT_BY_NAME = "/account/{name}";
	public static final String GET_ACCOUNT_BY_NAME__NAME = "name";
	
	
	private String url;
	private Map<String, Object> params;
	private Object data;
	@Override
	public String getUrl() {
		return url;
	}

	@Override
	public Map<String, Object> getParams() {
		return params;
	}

	@Override
	public Object getData() {
		return data;
	}
	
	@Override
	public String getServerName() {
		return SERVER_NAME;
	}

	@Override
	public String getServerUrl() {
		return SERVER_URL;
	}
	
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
