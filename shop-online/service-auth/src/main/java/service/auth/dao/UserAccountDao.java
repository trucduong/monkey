package service.auth.dao;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseDao;
import service.auth.entities.UserAccount;

@Repository
public class UserAccountDao extends BaseDao<UserAccount> {
	private static final long serialVersionUID = -1L;
	
}
