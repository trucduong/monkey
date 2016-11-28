package service.auth.web.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.service.services.BaseService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import service.auth.dao.PermissionDao;
import service.auth.entities.AuthPermission;
import service.auth.shared.dto.AuthPermissionDto;
import service.auth.shared.dto.PermissionStatus;
import service.auth.shared.utils.ServiceAuthAction;

@RestController
@RequestMapping(ServiceAuthAction.AUTH_SERVICE)
public class AuthService extends BaseService {
	@Autowired
	private PermissionDao permissionDao;
	
	@RequestMapping(value = ServiceAuthAction.PERMISSION_READ_ALL, method = RequestMethod.GET)
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
}
