package web.monkey.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import web.monkey.dao.SupplierGroupDao;
import web.monkey.entities.SupplierGroup;
import web.monkey.shared.dto.SupplierGroupDto;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.SUPPLIER_GROUP_SERVICE)
public class SupplierGroupService extends CRUDService<SupplierGroup, SupplierGroupDto> {

	@Autowired
	private SupplierGroupDao dao;
	
	@Override
	protected BaseDao<SupplierGroup> getDao() {
		return dao;
	}

	@Override
	protected SupplierGroup createEntity() {
		return new SupplierGroup();
	}
	
	@Override
	protected SupplierGroupDto createDto() {
		return new SupplierGroupDto();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}
}
