package service.shop.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import service.shop.dao.WarehouseDao;
import service.shop.entities.Warehouse;
import service.shop.shared.dto.WarehouseDto;
import service.shop.shared.utils.ServiceShopAction;

@RestController
@RequestMapping(ServiceShopAction.WAREHOUSE_SERVICE)
public class WarehouseService extends CRUDService<Warehouse, WarehouseDto> {

	@Autowired
	private WarehouseDao dao; 
	
	@Override
	protected BaseDao<Warehouse> getDao() {
		return dao;
	}

	@Override
	protected Warehouse createEntity() {
		return new Warehouse();
	}
	
	@Override
	protected WarehouseDto createDto() {
		return new WarehouseDto();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}

}
