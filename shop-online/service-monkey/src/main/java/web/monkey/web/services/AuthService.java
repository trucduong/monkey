package web.monkey.web.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.encode.PasswordEncoder;
import core.common.exception.CommonException;
import core.service.security.AuthorizationUser;
import core.service.services.BaseService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import web.monkey.dao.PermissionDao;
import web.monkey.dao.UserAccountDao;
import web.monkey.entities.AuthPermission;
import web.monkey.entities.UserAccount;
import web.monkey.shared.dto.AuthPermissionDto;
import web.monkey.shared.dto.AuthorizationUserDto;
import web.monkey.shared.dto.PermissionStatus;
import web.monkey.shared.dto.UserAccountDto;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.AUTH_SERVICE)
public class AuthService extends BaseService {
	@Autowired
	private PermissionDao permissionDao;

	@Autowired
	private UserAccountDao accountDao;

	@RequestMapping(value = ServiceActions.PERMISSION_READ_ALL, method = RequestMethod.GET)
	public ServiceResult readAll() throws CommonException {
		init();
		List<AuthPermission> entities = permissionDao.getAllData();

		if (entities == null || entities.isEmpty()) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		List<AuthPermissionDto> dtos = new ArrayList<>();
		for (AuthPermission e : entities) {
			if (PermissionStatus.VISIBLE.equals(e.getStatus())) {
				AuthPermissionDto d = new AuthPermissionDto();
				e.unBind(d);
				dtos.add(d);
			}
		}

		return success(dtos);
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}

	@RequestMapping(value = ServiceActions.LOGIN, method = RequestMethod.POST)
	public ServiceResult login(@RequestBody UserAccountDto user) throws CommonException {
		init();
		UserAccount account = accountDao.find(UserAccount.LOGIN_NAME, user.getLoginName());
		if (account == null) {
			return error(ServiceErrorCode.LOGIN_ERROR);
		}

		if (!PasswordEncoder.isValid(user.getPassword(), account.getPassword())) {
			return error(ServiceErrorCode.LOGIN_ERROR);
		}

		AuthorizationUser authUser = new AuthorizationUser();
		authUser.setLoginName(user.getLoginName());
		authUser.setLoggedTime(new Date());

		List<AuthPermission> permissions = permissionDao.getAllData();
		if (!permissions.isEmpty()) {
			authUser.setPermissions(new ArrayList<String>());
			for (AuthPermission authPermission : permissions) {
				authUser.getPermissions().add(authPermission.getAction());
			}
		}

		return success(new AuthorizationUserDto(authUser));
	}

	@RequestMapping(value = ServiceActions.LOGOUT, method = RequestMethod.POST)
	public ServiceResult logout(@RequestBody String authToken) throws CommonException {
		// AuthorizationUser authUser = AuthorizationUser.fromString(authToken);
		// if (!authUser.isAuthenticated()) {
		// return error(ServiceErrorCode.LOGOUT_ERROR);
		// }

		return success(true);
	}
}
