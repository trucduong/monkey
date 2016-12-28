package web.monkey.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.dao.utils.DaoUtils;
import core.service.services.CRUDService;
import web.monkey.dao.SupplierDao;
import web.monkey.dao.SupplierGroupDao;
import web.monkey.entities.Supplier;
import web.monkey.entities.SupplierGroup;
import web.monkey.shared.dto.SupplierDto;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.SUPPLIER_SERVICE)
public class SupplierService extends CRUDService<Supplier, SupplierDto> {

	@Autowired
	private SupplierDao dao;
	
	@Autowired
	private SupplierGroupDao groupDao;
	
	@Override
	protected BaseDao<Supplier> getDao() {
		return dao;
	}

	@Override
	protected Supplier createEntity() {
		return new Supplier();
	}
	
	@Override
	protected SupplierDto createDto() {
		return new SupplierDto();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}
	
	@Override
	protected void bindRealtionShip(Supplier entity, SupplierDto dto) {
		if (DaoUtils.isValidId(dto.getGroupId())) {
			SupplierGroup group = groupDao.find(dto.getGroupId());
			entity.setSupplierGroup(group);
		}
	}
}
