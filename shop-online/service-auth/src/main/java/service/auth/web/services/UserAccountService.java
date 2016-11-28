package service.auth.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.encode.PasswordEncoder;
import core.common.exception.CommonException;
import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import core.service.utils.CRUDServiceAction;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import service.auth.dao.UserAccountDao;
import service.auth.dao.UserProfileDao;
import service.auth.entities.UserAccount;
import service.auth.entities.UserProfile;
import service.auth.shared.dto.PasswordDto;
import service.auth.shared.dto.UserAccountDto;
import service.auth.shared.utils.ServiceAuthAction;

@RestController
@RequestMapping(ServiceAuthAction.USERACCOUNT_SERVICE)
public class UserAccountService extends CRUDService<UserProfile, UserAccountDto> {

	@Autowired
	private UserProfileDao profileDao;

	@Autowired
	private UserAccountDao accountDao;

	@Override
	protected BaseDao<UserProfile> getDao() {
		return profileDao;
	}

	@Override
	protected UserProfile createEntity() {
		return new UserProfile();
	}

	@Override
	protected UserAccountDto createDto() {
		return new UserAccountDto();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}
	
	@Override
	protected void onCreateSucceed(UserAccountDto dto) {
		UserAccount account = new UserAccount();
		account.bind(dto);
		account.setPassword(PasswordEncoder.encode(dto.getLoginName()));
		accountDao.create(account);
	}
	
	@Override
	@RequestMapping(value = CRUDServiceAction.DELETE, method = RequestMethod.POST)
	public ServiceResult delete(@PathVariable("id") long id) throws CommonException {
		init();
		UserProfile profile = profileDao.find(id);
		if (profile != null) {
			profileDao.delete(id);
			accountDao.deleteBy(UserAccount.LOGIN_NAME, profile.getLoginName());
		}
		
		return success(id);
	}
	
	@RequestMapping(value = ServiceAuthAction.UPDATE_PERMISSIONS, method = RequestMethod.POST)
	public ServiceResult updatePermissions(@RequestBody String permissions, @PathVariable("name") String name) {
		if (permissions != null) {
			permissions = permissions.replaceAll("^\"|\"$", "");
		}
		
		UserProfile profile = profileDao.find(UserAccount.LOGIN_NAME, name);
		if (profile == null) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		profile.setPermissions(permissions);
		profileDao.update(profile);
		
		return success(true);
	}

	@RequestMapping(value = ServiceAuthAction.UPDATE_PASSWORD, method = RequestMethod.POST)
	public ServiceResult updatePassword(@RequestBody PasswordDto dto, @PathVariable("name") String name)
			throws CommonException {
		UserAccount account = accountDao.find(UserAccount.LOGIN_NAME, name);
		if (account == null) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		if (!PasswordEncoder.isValid(dto.getOldPassword(), account.getPassword())) {
			return error(ServiceErrorCode.PASSWORD_NOT_MATCH);
		}

		account.setPassword(PasswordEncoder.encode(dto.getNewPassword()));
		accountDao.update(account);
		
		return success(true);
	}

}
