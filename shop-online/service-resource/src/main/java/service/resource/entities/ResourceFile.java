package service.resource.entities;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.Lob;

import core.dao.entities.BaseEntity;

public class ResourceFile extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@Column(name = "resource_type", columnDefinition = MEDIUM_1)
	private String resourceType;

	@Column(name = "binary_content", columnDefinition = BLOB)
	@Basic(fetch = FetchType.LAZY)
	@Lob
	private byte[] content;

	@Column(name = "content_type", columnDefinition = MEDIUM_1)
	private String contentType;

	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	public byte[] getContent() {
		return content;
	}

	public void setContent(byte[] content) {
		this.content = content;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

}
