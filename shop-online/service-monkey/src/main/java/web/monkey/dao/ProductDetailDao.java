package web.monkey.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import core.dao.utils.BaseDao;
import web.monkey.entities.ProductDetail;
import web.monkey.shared.dto.ProductDto;

@Repository
public class ProductDetailDao extends BaseDao<ProductDetail> {
	private static final long serialVersionUID = 1L;

	@Transactional
	public int importDetails(List<ProductDto> details) {
		int count = 0;
		for (ProductDto productDto : details) {
			ProductDetail detail = this.find(productDto.getId());
			if (detail == null) {
				detail = new ProductDetail();
				detail.setId(productDto.getId());
			}
			detail.setInputPrice(productDto.getInputPrice());
			detail.setRetailPrice(productDto.getRetailPrice());
			detail.setWholesalePrice(productDto.getWholesalePrice());
			this.update(detail);

			count++;
		}

		return count;
	}
}
