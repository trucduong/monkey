package service.catalogue.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import service.catalogue.dao.WarehouseDao;
import service.catalogue.entities.Warehouse;
import service.catalogue.shared.dto.WarehouseDto;
import service.catalogue.shared.utils.ServiceCatalogueAction;

@RestController
@RequestMapping(ServiceCatalogueAction.WAREHOUSE_SERVICE)
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
