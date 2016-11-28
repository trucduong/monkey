package core.service.security;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

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
			return false;
		}
		
		AuthorizationUser user = AuthorizationUser.fromString(authKey);
		if (user == null) {
			return false;
		}
		
		return user.hasPermission(servletPath);
	}
}
