package service.auth.shared.dto;

import java.util.Date;
import java.util.List;

import core.service.security.AuthorizationUser;

public class AuthorizationUserDto {
	private String loginName;
	private Date loggedTime;
	private List<String> permissions;
	private String authToken;
	
	public AuthorizationUserDto() { }
	
	public AuthorizationUserDto(AuthorizationUser user) {
		this.loginName = user.getLoginName();
		this.loggedTime = user.getLoggedTime();
		this.permissions = user.getPermissions();
		this.authToken = user.toString();
	}
	
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public Date getLoggedTime() {
		return loggedTime;
	}
	public void setLoggedTime(Date loggedTime) {
		this.loggedTime = loggedTime;
	}
	public List<String> getPermissions() {
		return permissions;
	}
	public void setPermissions(List<String> permissions) {
		this.permissions = permissions;
	}
	public String getAuthToken() {
		return authToken;
	}
	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}
}
