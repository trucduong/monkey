package web.monkey.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseDao;
import core.dao.utils.DaoUtils;
import core.dao.utils.NativeQueryBuilder;
import web.monkey.entities.OrderDetail;
import web.monkey.shared.dto.OrderDetailDto;

@Repository
public class OrderDetailDao extends BaseDao<OrderDetail> {
	private static final long serialVersionUID = 1L;

	public List<OrderDetailDto> getDetail(long orderId) {
		NativeQueryBuilder builder = new NativeQueryBuilder();
		builder.append("select d.order_id, d.product_id as productId, p.name as productName, d.remaining, d.discount, d.price, d.total, d.description");
		builder.append(" from order_details d left join products p on d.product_id = p.id");
		builder.append(" where d.order_id = :orderId", "orderId", orderId);
		
		String[] columns = new String[] {"orderId", "productId", "productName", "remaining", "discount", "price", "total", "description"};
		List<OrderDetailDto> results = DaoUtils.selectAll(getEm(), builder, OrderDetailDto.class, columns);
		return results;
	}
}
