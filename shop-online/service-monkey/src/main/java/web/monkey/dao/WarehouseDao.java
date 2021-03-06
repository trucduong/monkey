package web.monkey.dao;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseCachedDao;
import web.monkey.entities.Warehouse;

@Repository
public class WarehouseDao extends BaseCachedDao<Warehouse> {
	private static final long serialVersionUID = 1L;

}
