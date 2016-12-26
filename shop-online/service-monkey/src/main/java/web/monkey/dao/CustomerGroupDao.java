package web.monkey.dao;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseCachedDao;
import web.monkey.entities.CustomerGroup;

@Repository
public class CustomerGroupDao extends BaseCachedDao<CustomerGroup>{

	private static final long serialVersionUID = 1L;

}
