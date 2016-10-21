package core.service.services;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import core.common.exception.CommonException;
import core.common.utils.CommonConstants;
import core.dao.entities.BaseEntity;
import core.dao.utils.BaseDao;
import core.dao.utils.DaoUtils;
import core.service.utils.CRUDServiceAction;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;

public abstract class CRUDService<E extends BaseEntity> extends BaseService {

	protected abstract BaseDao<E> getDao();

	protected abstract E createEntity();

	@RequestMapping(value = CRUDServiceAction.READ, method = RequestMethod.GET)
	public ServiceResult read(@PathVariable(value = CRUDServiceAction.PARAM_ID) long id) throws CommonException {
		init(ServiceErrorCode.NOT_FOUND);
		E entity = getDao().find(id);

		if (entity == null) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		return success(entity);
	}

	@RequestMapping(value = CRUDServiceAction.READ_ALL, method = RequestMethod.GET)
	public ServiceResult readAll() throws CommonException {
		init(ServiceErrorCode.NOT_FOUND);
		List<E> entities = getDao().getAllData();

		if (entities == null || entities.isEmpty()) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		return success(entities);
	}

	@RequestMapping(value = CRUDServiceAction.READ_ALL_BY, method = RequestMethod.GET)
	public ServiceResult readAllBy(@PathVariable(value = CRUDServiceAction.PARAM_NAME) String name,
			@PathVariable(value = CRUDServiceAction.PARAM_VALUES) String values) throws CommonException {
		init(ServiceErrorCode.NOT_FOUND);
		
		String[] valueList = values.split(CommonConstants.SEPERATOR);
		List<E> entities = getDao().getAllDataByColumns(name, valueList);

		if (entities == null || entities.isEmpty()) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		return success(entities);
	}
	
	@RequestMapping(value = CRUDServiceAction.READ_BY, method = RequestMethod.GET)
	public ServiceResult readBy(@PathVariable(value = CRUDServiceAction.PARAM_NAME) String name,
			@PathVariable(value = CRUDServiceAction.PARAM_VALUE) String value) throws CommonException {
		init(ServiceErrorCode.NOT_FOUND);
		List<E> entities = getDao().getAllDataByColumn(name, value);

		if (entities == null || entities.isEmpty()) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		return success(entities);
	}

	@RequestMapping(value = CRUDServiceAction.CREATE, method = RequestMethod.POST)
	public ServiceResult create(@RequestBody E entity) throws CommonException {
		init(ServiceErrorCode.CREATE_ERROR);
		entity.setId(DaoUtils.createId());
		getDao().create(entity);
		return success(entity);
	}

	@RequestMapping(value = CRUDServiceAction.UPDATE, method = RequestMethod.POST)
	public ServiceResult update(@RequestBody E entity, @PathVariable("id") long id) throws CommonException {
		init(ServiceErrorCode.UPDATE_ERROR);
		getDao().update(entity);

		return success(entity);
	}

	@RequestMapping(value = CRUDServiceAction.DELETE, method = RequestMethod.POST)
	public ServiceResult deleteUser(@PathVariable("id") long id) throws CommonException {
		init(ServiceErrorCode.DELTE_ERROR);
		getDao().delete(id);
		return success(id);
	}
}
