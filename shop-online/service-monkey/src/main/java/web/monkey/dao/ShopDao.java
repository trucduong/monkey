package web.monkey.dao;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseCachedDao;
import web.monkey.entities.Shop;

@Repository
public class ShopDao extends BaseCachedDao<Shop> {
	private static final long serialVersionUID = 1L;

}
