package service.auth.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import core.dao.entities.BaseEntity;
import service.auth.shared.AccountType;

@Entity
@Table(name = "user_profiles")
public class UserProfile extends BaseEntity {
	private static final long serialVersionUID = -3110764643153799067L;

	@Column(name = "login_name", unique = true, columnDefinition = SHORT_5)
	private String loginName;

	@Enumerated(EnumType.STRING)
	@Column(name = "user_type", columnDefinition = SHORT_1)
	private AccountType userType;

	@Column(name = "shop_id", columnDefinition = SHORT_2)
	private String shopId;

	@Column(name = "profile_details", columnDefinition = LONG_1)
	private String details;

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public AccountType getUserType() {
		return userType;
	}

	public void setUserType(AccountType userType) {
		this.userType = userType;
	}

	public String getShopId() {
		return shopId;
	}

	public void setShopId(String shopId) {
		this.shopId = shopId;
	}
//
//	@Override
//	public String getColIdName() {
//		return "loginName";
//	}
//
//	@Override
//	public Object getColIdValue() {
//		return getLoginName();
//	}
//	
//	@Override
//	public Object convertToId(String value) {
//		return value;
//	}
}
