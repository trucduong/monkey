package web.monkey.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import core.dao.utils.BaseDao;
import core.service.services.CRUDService;
import web.monkey.dao.ArticleDao;
import web.monkey.entities.Article;
import web.monkey.entities.Employee;
import web.monkey.shared.dto.ArticleDto;
import web.monkey.shared.utils.ServiceActions;

@RestController
@RequestMapping(ServiceActions.ARTICLE_SERVICE)
public class ArticleService extends CRUDService<Article, ArticleDto> {

	@Autowired
	private ArticleDao dao;
	
	@Override
	protected BaseDao<Article> getDao() {
		return dao;
	}

	@Override
	protected Article createEntity() {
		return new Article();
	}

	@Override
	protected ArticleDto createDto() {
		return new ArticleDto();
	}

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}
	
	@Override
	protected void bindRealtionShip(Article entity, ArticleDto dto) {
		Employee employee = dao.getEm().find(Employee.class, dto.getEmployeeId());
		entity.setEmployee(employee);
	}

}
