package core.service.security;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import core.common.exception.CommonException;
import core.service.utils.ServiceErrorCode;

public class AuthorInterceptor extends HandlerInterceptorAdapter {
	public static String AUTH_KEY = "AUTH_KEY";
	private List<String> bypass;
	
	public AuthorInterceptor(List<String> bypass) {
		super();
		this.bypass = bypass;
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String servletPath = request.getServletPath();
		
		if (this.bypass.contains(servletPath)) {
			return true;
		}
		
		String authKey = request.getHeader(AUTH_KEY);
		if (authKey == null) {
			throw new CommonException(ServiceErrorCode.ACCESS_DENIED, "Please login!");
		}
		
		AuthorizationUser user = AuthorizationUser.fromString(authKey);
		if (user == null) {
			throw new CommonException(ServiceErrorCode.ACCESS_DENIED, "Authorization token error!");
		}
		
		if(!user.hasPermission(servletPath)) {
			throw new CommonException(ServiceErrorCode.ACCESS_DENIED, "User do not have permission to access!");
		}
		
		return true;
	}
}
