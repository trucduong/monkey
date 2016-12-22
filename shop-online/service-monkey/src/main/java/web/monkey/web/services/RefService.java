package web.monkey.web.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.dao.utils.BaseDao;
import core.service.cache.CacheLoader;
import core.service.cache.CacheProvider;
import core.service.services.CRUDService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import web.monkey.dao.RefDao;
import web.monkey.entities.RefEntity;
import web.monkey.shared.dto.CmbItem;
import web.monkey.shared.dto.RefDto;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.REF_SERVICE)
public class RefService extends CRUDService<RefEntity, RefDto> {

	@Autowired
	private RefDao dao;
	
	@Autowired
	private CacheManager cacheManager;
	
	@Override
	protected BaseDao<RefEntity> getDao() {
		return dao;
	}

	@Override
	protected RefEntity createEntity() {
		return new RefEntity();
	}
	
	@Override
	protected RefDto createDto() {
		return new RefDto();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}

	@RequestMapping(value=ServiceActions.READ_CMB, method = RequestMethod.GET)
	public ServiceResult getRefList(@PathVariable("type") final String type) throws CommonException {
		init();
		
		if (StringUtils.isEmpty(type)) {
			return error(ServiceErrorCode.PARAMETER_ERROR);
		}
		
		List<CmbItem> items = CacheProvider.getInstance(cacheManager).load(type, new CacheLoader<List<CmbItem> >() {
			@Override
			public List<CmbItem> load() {
				List<CmbItem> items = new ArrayList<CmbItem>();
				List<RefEntity> entities = getDao().getAllDataByColumn(RefEntity.TYPE, type, RefEntity.ORDER_WEIGHT);
//				if (!entities.isEmpty()) {
//					// convert
//					for (RefEntity refEntity : entities) {
//						CmbItem item = new CmbItem();
//						item.setType(type);
//						item.setValue(refEntity.getRefValue());
//						item.setLabel(type + "." + refEntity.getRefValue());
//						item.setOrderWeight(refEntity.getOrderWeight());
//						items.add(item);
//					}
//				}
				
				return items;
			}
		});
		
		if (items.isEmpty()) {
			return error(ServiceErrorCode.NOT_FOUND);
		}
		
		return success(items);
	}
}
