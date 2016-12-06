package web.monkey.web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import core.service.utils.CRUDServiceAction;
import core.service.utils.ServiceResult;
import web.monkey.dao.ShopDao;
import web.monkey.entities.Shop;
import web.monkey.shared.dto.ShopDto;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.SHOP_SERVICE)
public class ShopService extends CRUDService<Shop, ShopDto> {

	@Autowired
	private ShopDao dao;

	@Override
	protected BaseDao<Shop> getDao() {
		return dao;
	}

	@Override
	protected Shop createEntity() {
		return new Shop();
	}

	@Override
	protected ShopDto createDto() {
		return new ShopDto();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}

	@Override
	@RequestMapping(value = CRUDServiceAction.READ, method = RequestMethod.GET)
	public ServiceResult read(@PathVariable(value = CRUDServiceAction.PARAM_ID) long id) throws CommonException {
		init();
		// Shop entity = getDao().find(id);
		//
		// if (entity != null) {
		// return success(entity);
		// }

		List<Shop> shops = getDao().getAllData();
		if (shops.size() > 0) {
			ShopDto dto = this.createDto();
			shops.get(0).unBind(dto);
			return success(dto);
		}

		return this.create(this.createDto());
	}
}
