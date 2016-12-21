package web.monkey.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.common.exception.CommonException;
import core.service.services.BaseService;
import core.service.utils.CRUDServiceAction;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import web.monkey.dao.OrderDao;
import web.monkey.entities.Order;
import web.monkey.shared.dto.OrderDto;
import web.monkey.shared.dto.OrderStatus;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.SELL_SERVICE)
public class SellService extends BaseService {
	
	@Autowired
	private OrderDao orderDao;
	
	@RequestMapping(value = CRUDServiceAction.CREATE, method = RequestMethod.POST)
	public ServiceResult create(@RequestBody OrderDto dto) throws CommonException {
		dto.setId(0);
		Order entity = new Order();
		entity.bind(dto);
		entity.setStatus(OrderStatus.ACTIVE);
		orderDao.create(entity);
		return success(dto);
	}
	
	@RequestMapping(value = CRUDServiceAction.READ, method = RequestMethod.GET)
	public ServiceResult read(@PathVariable(value = CRUDServiceAction.PARAM_ID) long id) throws CommonException {
		
		Order entity = orderDao.find(id);

		if (entity == null) {
			return error(ServiceErrorCode.NOT_FOUND);
		}

		OrderDto dto = new OrderDto();
		entity.unBind(dto);

		return success(dto);
	}
	

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}

}
