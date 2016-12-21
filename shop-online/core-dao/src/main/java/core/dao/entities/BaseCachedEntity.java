package core.dao.entities;

import javax.persistence.Column;

/**
 * Base entity
 *
 */
public abstract class BaseCachedEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;
	
	@Column(name="deleted", nullable=false)
	private boolean deleted = false;
	
	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
}