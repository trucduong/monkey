package service.common.web.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.common.locate.Language;
import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import core.service.utils.ContextHolder;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import service.common.dao.RefDao;
import service.common.entities.RefEntity;
import service.common.shared.utils.CmbItem;
import service.common.shared.utils.ServiceCommonAction;

@RestController
@RequestMapping(ServiceCommonAction.REF_SERVICE)
public class RefService extends CRUDService<RefEntity> {
	
	private static ContextHolder<CmbItem> CMB_HOLDER = new ContextHolder<CmbItem>();

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
	public ServiceResult getRefList(@PathVariable("type") String type, @PathVariable("locale") String locale) throws CommonException {
		init();
		
		if (StringUtils.isEmpty(type)) {
			return error(ServiceErrorCode.PARAMETER_ERROR);
		}
		
		List<CmbItem> items = new ArrayList<CmbItem>();
		
		// check holder
		if (CMB_HOLDER.isReloadNeeded(type)) {
		
			List<RefEntity> entities = getDao().getAllDataByColumn(RefEntity.TYPE, type, RefEntity.ORDER_WEIGHT);
			if (entities.isEmpty()) {
				return error(ServiceErrorCode.NOT_FOUND);
			}
			
			Language language = Language.fromString(locale);
			
			// convert
			for (RefEntity refEntity : entities) {
				CmbItem item = new CmbItem();
				item.setType(type);
				item.setValue(refEntity.getRefValue());
				item.setLabel(refEntity.getLabel(language));
				item.setOrderWeight(refEntity.getOrderWeight());
				items.add(item);
			}
			CMB_HOLDER.setHolderList(type, items);
		} else {
			items.addAll(CMB_HOLDER.getHolderList(type));
		}
		
		return success(items);
	}
}
