package service.auth.shared.dto;

import core.dao.dto.BaseDto;

public class AuthPermissionDto extends BaseDto {
	private String name;

	private String groupName;

	private String displayName;

	private String description;

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
}
