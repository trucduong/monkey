package web.monkey.dao;

import org.springframework.stereotype.Service;

import core.dao.utils.BaseCachedDao;
import web.monkey.entities.CustomerGroup;

@Service
public class CustomerGroupDao extends BaseCachedDao<CustomerGroup>{

	private static final long serialVersionUID = 1L;

}
