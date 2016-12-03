package service.auth.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;
import service.auth.shared.dto.AuthPermissionDto;
import service.auth.shared.dto.PermissionStatus;

/**
 * System permissions
 *
 */
@Entity
@Table(name = "auth_permissions")
public class AuthPermission extends BaseEntity {
	
	private static final long serialVersionUID = 1L;

	/**
	 * mapping to spring security role
	 */
	@Column(name = "action_name", columnDefinition = MEDIUM_1)
	private String action;
	
	@Column(name = "permission_name", columnDefinition = MEDIUM_1)
	private String name;

	@Column(name = "group_name", columnDefinition = MEDIUM_1)
	private String groupName;

	@Column(name = "display_name", columnDefinition = MEDIUM_1)
	private String displayName;

	@Column(name = "description", columnDefinition = MEDIUM_5)
	private String description;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", columnDefinition = SHORT_1)
	private PermissionStatus status;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public PermissionStatus getStatus() {
		return status;
	}

	public void setStatus(PermissionStatus status) {
		this.status = status;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
	public String getAction() {
		return action;
	}
	
	public void setAction(String action) {
		this.action = action;
	}

	@Override
	public void bind(BaseDto baseDto) {
		super.bind(baseDto);
		AuthPermissionDto dto = (AuthPermissionDto) baseDto;
		this.description = dto.getDescription();
		this.displayName = dto.getDisplayName();
		this.groupName = dto.getGroupName();
		this.name = dto.getName();
		this.status = dto.getStatus();
	}
	
	@Override
	public void unBind(BaseDto baseDto) {
		super.unBind(baseDto);
		AuthPermissionDto dto = (AuthPermissionDto) baseDto;
		dto.setDescription(description);
		dto.setDisplayName(displayName);
		dto.setGroupName(groupName);
		dto.setName(displayName);
		dto.setStatus(status);
	}
}
