package web.monkey.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import web.monkey.dao.RevenuesDao;
import web.monkey.entities.Revenues;
import web.monkey.shared.dto.RevenuesDto;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.SHOP_SERVICE)
public class RevenuesService extends CRUDService<Revenues, RevenuesDto> {

	@Autowired
	private RevenuesDao dao;
	
	@Override
	protected BaseDao<Revenues> getDao() {
		return dao;
	}

	@Override
	protected Revenues createEntity() {
		return new Revenues();
	}

	@Override
	protected RevenuesDto createDto() {
		return new RevenuesDto();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}

}
