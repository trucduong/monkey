package web.monkey.dao;

import org.springframework.stereotype.Service;

import core.dao.utils.BaseCachedDao;
import web.monkey.entities.Supplier;

@Service
public class SupplierDao extends BaseCachedDao<Supplier> {
	private static final long serialVersionUID = 1L;


}
