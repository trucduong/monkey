package web.monkey.dao;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseCachedDao;
import web.monkey.entities.ProductGroup;

@Repository
public class ProductGroupDao extends BaseCachedDao<ProductGroup> {
	private static final long serialVersionUID = 1L;

}
