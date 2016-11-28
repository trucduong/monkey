package service.partner.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import service.partner.dao.SupplierDao;
import service.partner.entities.Supplier;
import service.partner.shared.dto.SupplierDto;
import service.partner.shared.utils.ServicePartnerAction;

@RestController
@RequestMapping(ServicePartnerAction.SUPPLIER_SERVICE)
public class SupplierService extends CRUDService<Supplier, SupplierDto> {

	@Autowired
	private SupplierDao dao;
	
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
}
