package web.monkey.entities;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.google.gson.reflect.TypeToken;

import core.common.format.json.JsonFormatter;
import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import web.monkey.shared.dto.ArticleDto;
import web.monkey.shared.dto.CommentDto;

@Entity
@Table(name = "articles")
public class Article extends BaseEntity {
	private static final long serialVersionUID = 1L;

	// @Column(name = "author", columnDefinition = MEDIUM_1)
	// private String author;

	@ManyToOne
	@JoinColumn(name = "employee_id")
	private Employee employee;

	@Column(name = "create_date", columnDefinition = TIMESTAMP)
	private Date createDate;

	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;

	@Column(name = "image", columnDefinition = MEDIUM_1)
	private String image;

	@Column(name = "comments", columnDefinition = LONG_1)
	private String comments;

	
	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		ArticleDto dto = (ArticleDto) baseDto;
		this.comments = JsonFormatter.toJson(dto.getComments());
		this.createDate = dto.getCreateDate();
		this.description = dto.getDescription();
		this.image = dto.getImage();
		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		ArticleDto dto = (ArticleDto) baseDto;
		Type listType = new TypeToken<ArrayList<CommentDto>>() { }.getType();
		dto.setComments((List<CommentDto>) JsonFormatter.fromJson(comments, listType));
		dto.setCreateDate(createDate);
		dto.setDescription(description);
		dto.setImage(image);
		
		if (employee != null) {
			dto.setEmployeeId(employee.getId());
			dto.setEmployeeName(employee.getName());
		}
		
	}
	
	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

}
