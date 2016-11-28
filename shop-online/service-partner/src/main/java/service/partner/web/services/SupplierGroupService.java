package service.partner.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import service.partner.dao.SupplierGroupDao;
import service.partner.entities.SupplierGroup;
import service.partner.shared.dto.SupplierGroupDto;
import service.partner.shared.utils.ServicePartnerAction;

@RestController
@RequestMapping(ServicePartnerAction.SUPPLIER_GROUP_SERVICE)
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
