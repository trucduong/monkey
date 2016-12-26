package web.monkey.dao;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseCachedDao;
import web.monkey.entities.Supplier;

@Repository
public class SupplierDao extends BaseCachedDao<Supplier> {
	private static final long serialVersionUID = 1L;


}
