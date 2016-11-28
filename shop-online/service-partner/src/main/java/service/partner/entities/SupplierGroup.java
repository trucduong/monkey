package service.partner.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import service.partner.shared.dto.SupplierGroupDto;

@Entity
@Table(name="supplier_groups")
public class SupplierGroup extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "name", columnDefinition = MEDIUM_1)
	private String name;

	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		SupplierGroupDto dto = (SupplierGroupDto) baseDto;
		this.description = dto.getDescription();
		this.name = dto.getName();
	}
	
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		SupplierGroupDto dto = (SupplierGroupDto) baseDto;
		dto.setDescription(description);
		dto.setName(name);
	}
}
