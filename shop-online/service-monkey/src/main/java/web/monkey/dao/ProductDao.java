package web.monkey.dao;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.stereotype.Repository;

import core.common.convert.Converter;
import core.common.convert.StringToLongConverter;
import core.dao.utils.BaseCachedDao;
import core.dao.utils.DaoUtils;
import core.dao.utils.NativeQueryBuilder;
import core.dao.utils.QueryBuilder;
import web.monkey.dto.xsl.ProductPricesSheet;
import web.monkey.entities.Product;
import web.monkey.shared.dto.ProductDto;
import web.monkey.shared.dto.ProductStatus;
import web.monkey.shared.dto.WarehouseProductDto;

@Repository
public class ProductDao extends BaseCachedDao<Product> {
	private static final long serialVersionUID = 1L;

	public List<ProductDto> getAllWithDetail(ProductStatus status) {
		NativeQueryBuilder builder = new NativeQueryBuilder();
		builder.append("SELECT e.id eid, e.code, e.name ename, e.image, e.unit, e.description, e.product_status");
		builder.append(", e.warning_remaining, e.discount, e.input_price, e.wholesale_price, e.retail_price");
		builder.append(", g.id gid, g.name gname");
		builder.append(", d.remaining");
		builder.append(" FROM products e LEFT JOIN product_groups g ON e.product_group=g.id");
		builder.append(" LEFT JOIN (SELECT product_id, sum(remaining) remaining FROM warehouse_details group by product_id) d ON e.id=d.product_id");
		builder.append(" WHERE e.deleted=FALSE");
		if (status != null) {
			builder.append(" AND e.product_status = :status", "status", status.name());
		}
		String[] columns = new String[] {"id", "code", "name", "image", "unit", "description", "status", "warningRemaining", 
				"discount", "inputPrice", "wholesalePrice", "retailPrice", "groupId", "groupName", "remaining"};
		Map<String, Converter<?>> converters = new HashedMap<>();
		converters.put("remaining", new StringToLongConverter());
		List<ProductDto> dtos = DaoUtils.selectAll(getEm(), builder, ProductDto.class, columns, converters);
		return dtos;
	}

	public List<ProductPricesSheet> getProductPriceToExport(ProductStatus status) {
		NativeQueryBuilder builder = new NativeQueryBuilder();
		builder.append("SELECT e.id, e.code, e.name, e.discount, e.input_price, e.wholesale_price, e.retail_price");
		builder.append(", g.name gname");
		builder.append(", d.remaining");
		builder.append(" FROM products e LEFT JOIN product_groups g ON e.product_group=g.id");
		builder.append(" LEFT JOIN (SELECT product_id, sum(remaining) remaining FROM warehouse_details group by product_id) d ON e.id=d.product_id");
		builder.append(" WHERE e.deleted=FALSE");
		if (status != null) {
			builder.append(" AND e.product_status = :status", "status", status.name());
		}
		String[] columns = new String[] {"id", "code", "name", "discount", "inputPrice", "wholesalePrice", "retailPrice", "group", "remaining"};
		Map<String, Converter<?>> converters = new HashedMap<>();
		converters.put("remaining", new StringToLongConverter());
		List<ProductPricesSheet> dtos = DaoUtils.selectAll(getEm(), builder, ProductPricesSheet.class, columns, converters);
		return dtos;
	}

	public List<ProductDto> getProductRef(ProductStatus status) {
		QueryBuilder builder = new QueryBuilder();
		builder.append("SELECT p.id, p.name FROM Product as p WHERE p.deleted=FALSE");
		if (status != null) {
			builder.append(" AND p.status = :status", "status", ProductStatus.ACTIVE);
		}

		String[] columns = new String[] {"id", "name"};
		List<ProductDto> items = DaoUtils.selectAll(getEm(), builder, ProductDto.class, columns);

		return items;
	}

	@Transactional
	public int updatePrices(List<WarehouseProductDto> products) {
		for (WarehouseProductDto dto : products) {
			Product product = find(dto.getId());
			product.setInputPrice(dto.getInputPrice());
			product.setWholesalePrice(dto.getWholesalePrice());
			product.setRetailPrice(dto.getRetailPrice());

			merge(product);
		}
		getEm().flush();
		return products.size();
	}
}
