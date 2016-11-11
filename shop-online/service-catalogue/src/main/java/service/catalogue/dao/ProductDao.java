package service.catalogue.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import core.common.convert.ConverterUtils;
import core.dao.utils.BaseDao;
import core.dao.utils.QueryBuilder;
import service.catalogue.entities.Product;
import service.catalogue.shared.dto.ProductDto;
import service.catalogue.shared.utils.ProductStatus;

@Repository
public class ProductDao extends BaseDao<Product> {
	private static final long serialVersionUID = 1L;

	public List<ProductDto> getAllWithDetail(ProductStatus status) {
		List<ProductDto> products = new ArrayList<ProductDto>();
		QueryBuilder builder = new QueryBuilder();
		builder.append("SELECT p.id, p.name, p.group, d.discount, d.remaining, d.inputPrice, d.wholesalePrice, d.retailPrice")
				.append(" FROM Product as p LEFT JOIN p.detail as d")
				.append(" WHERE 1=1");
		if (status != null) {
			builder.append(" AND p.status = :status", "status", ProductStatus.ACTIVE);
		}

		Query query = builder.build(getEm());
		List<Object[]> resultList = query.getResultList();
		for (Object[] objects : resultList) {
			ProductDto dto = new ProductDto();
			int i = 0;
			dto.setId(ConverterUtils.toLong(objects[i++]));
			dto.setName(ConverterUtils.toString(objects[i++]));
			dto.setGroup(ConverterUtils.toLong(objects[i++]));
			dto.setDiscount(ConverterUtils.toInt(objects[i++]));
			dto.setRemaining(ConverterUtils.toLong(objects[i++]));
			dto.setInputPrice(ConverterUtils.toBigDecimal(objects[i++]));
			dto.setWholesalePrice(ConverterUtils.toBigDecimal(objects[i++]));
			dto.setRetailPrice(ConverterUtils.toBigDecimal(objects[i++]));

			products.add(dto);
		}

		return products;
	}
}
