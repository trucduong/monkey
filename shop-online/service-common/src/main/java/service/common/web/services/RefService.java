package service.common.web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import service.common.dao.RefDao;
import service.common.entities.RefEntity;
import service.common.shared.utils.ServiceCommonAction;

@RestController
@RequestMapping(ServiceCommonAction.REF_SERVICE)
public class RefService extends CRUDService<RefEntity> {

	@Autowired
	private RefDao dao;
	
	@Override
	protected BaseDao<RefEntity> getDao() {
		return dao;
	}

	@Override
	protected RefEntity createEntity() {
		return new RefEntity();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}

	@RequestMapping(value=ServiceCommonAction.READ_CMB, method = RequestMethod.GET)
	public ServiceResult getRefList(@RequestParam("type") String type) throws CommonException {
		init();
		
		if (StringUtils.isEmpty(type)) {
			return error(ServiceErrorCode.PARAMETER_ERROR);
		}
		
		List<RefEntity> entities = getDao().getAllDataByColumn(RefEntity.TYPE, type, RefEntity.ORDER_WEIGHT);
		if (entities.isEmpty()) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		
		return success(entities);
	}
}
