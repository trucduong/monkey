package service.auth.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import core.dao.entities.IEntity;
import service.auth.shared.dto.UserAccountDto;

@Entity
@Table(name = "user_accounts")
public class UserAccount implements IEntity {
	public static final String LOGIN_NAME = "loginName";

	@Id
	@Column(name = "login_name", unique = true, columnDefinition = BaseEntity.SHORT_5)
	private String loginName;

	@Column(name = "password", columnDefinition = BaseEntity.MEDIUM_1)
	private String password;
	
	@Version
	@Column(name = "version")
	private int version;

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public void bind(BaseDto baseDto) {
		UserAccountDto dto = (UserAccountDto) baseDto;
		this.loginName = dto.getLoginName();
		this.password = dto.getPassword();
	}

	@Override
	public void unBind(BaseDto baseDto) {
		UserAccountDto dto = (UserAccountDto) baseDto;
		dto.setLoginName(loginName);
		dto.setPassword(password);
	}
}
