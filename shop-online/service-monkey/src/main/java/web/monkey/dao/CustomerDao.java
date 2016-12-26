package web.monkey.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseCachedDao;
import core.dao.utils.DaoUtils;
import core.dao.utils.QueryBuilder;
import web.monkey.entities.Customer;
import web.monkey.shared.dto.CustomerDto;

@Repository
public class CustomerDao extends BaseCachedDao<Customer> {
	private static final long serialVersionUID = 1L;

	public CustomerDto findD(long id) {
		QueryBuilder builder = new QueryBuilder();
		builder.append("SELECT e.id, e.name, e.phone, e.sex, e.email, e.address, e.description, g.id, g.name FROM Customer e LEFT JOIN e.customerGroup g");
		builder.append(" WHERE e.id = :id", "id", id);
		
		String[] columns = new String[] {"id", "name", "phone", "sex", "email", "address", "description", "groupId", "groupName"};
		CustomerDto dto = DaoUtils.selectFirst(getEm(), builder, CustomerDto.class, columns);
		return dto;
	}
	
	public List<CustomerDto> getAllDataD() {
		QueryBuilder builder = new QueryBuilder();
		builder.append("SELECT e.id, e.name, e.phone, e.sex, e.email, e.address, e.description, g.id, g.name FROM Customer e LEFT JOIN e.customerGroup g WHERE 1=1");
		builder.append(UN_DELETED);
		
		String[] columns = new String[] {"id", "name", "phone", "sex", "email", "address", "description", "groupId", "groupName"};
		List<CustomerDto> dtos = DaoUtils.selectAll(getEm(), builder, CustomerDto.class, columns);
		return dtos;
	}
}
