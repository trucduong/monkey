package service.partner.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;

@Entity
@Table(name="supplier_groups")
public class SupplierGroup extends BaseEntity {
	private static final long serialVersionUID = -5055615445402333571L;

//	@Column(name = "id", columnDefinition = INT)
//	private Integer id;

	@Column(name = "name", columnDefinition = SHORT_5)
	private String name;

	@Column(name = "note", columnDefinition = MEDIUM_5)
	private String note;
//
//	@Override
//	public Object getColIdValue() {
//		return id;
//	}
//
//	@Override
//	public String getColIdName() {
//		return "id";
//	}

//	public Integer getId() {
//		return id;
//	}
//
//	public void setId(Integer id) {
//		this.id = id;
//	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
//	
//	@Override
//	public Object convertToId(String value) {
//		return Integer.valueOf(value);
//	}

	@Override
	public void bind(BaseDto dto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void unBind(BaseDto dto) {
		// TODO Auto-generated method stub
		
	}
}
