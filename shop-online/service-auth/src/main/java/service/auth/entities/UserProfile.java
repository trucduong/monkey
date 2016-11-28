package service.auth.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import service.auth.shared.dto.AccountStatus;
import service.auth.shared.dto.AccountType;
import service.auth.shared.dto.UserAccountDto;

@Entity
@Table(name = "user_profiles")
public class UserProfile extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "login_name", unique = true, columnDefinition = BaseEntity.SHORT_5)
	private String loginName;

	@Enumerated(EnumType.STRING)
	@Column(name = "account_type", columnDefinition = BaseEntity.SHORT_1)
	private AccountType accountType;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", columnDefinition = BaseEntity.SHORT_1)
	private AccountStatus status;

	// permission name array (Json format). Ex: ["somestring1", "somestring2"]
	@Column(name = "permissions", columnDefinition = BaseEntity.LONG_1)
	private String permissions;

	@Column(name = "employee_id", columnDefinition = BaseEntity.LONG)
	private Long employeeId;

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public AccountStatus getStatus() {
		return status;
	}

	public void setStatus(AccountStatus status) {
		this.status = status;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	public String getPermissions() {
		return permissions;
	}

	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
	
	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		UserAccountDto dto = (UserAccountDto) baseDto;
		this.accountType = dto.getAccountType();
		this.employeeId = dto.getEmployeeId();
		this.loginName = dto.getLoginName();
//		this.permissions = dto.getPermissions();
		this.status = dto.getStatus();
	}

	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		UserAccountDto dto = (UserAccountDto) baseDto;
		dto.setAccountType(accountType);
		dto.setEmployeeId(employeeId);
		dto.setLoginName(loginName);
		dto.setPermissions(permissions);
		dto.setStatus(status);
	}
}
