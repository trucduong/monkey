package web.monkey.dao;

import java.util.List;

import core.dao.utils.BaseDao;
import core.dao.utils.DaoUtils;
import core.dao.utils.NativeQueryBuilder;
import web.monkey.entities.OrderPayment;
import web.monkey.shared.dto.OrderPaymentDto;

public class OrderPaymentDao extends BaseDao<OrderPayment> {
	public List<OrderPaymentDto> getAllByOrder(long orderId) {
		NativeQueryBuilder builder = new NativeQueryBuilder();
		builder.append("select order_id, create_date, total, employee_name, customer_name, description");
		builder.append(" from order_payments");
		builder.append(" where d.order_id = :orderId", "orderId", orderId);
		
		String[] columns = new String[] {"orderId", "createDate", "total", "employeeName", "customerName", "description"};
		List<OrderPaymentDto> results = DaoUtils.selectAll(getEm(), builder, OrderPaymentDto.class, columns);
		return results;
	}
}
