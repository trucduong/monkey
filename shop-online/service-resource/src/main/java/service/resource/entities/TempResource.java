package service.resource.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "temp_resource")
public class TempResource extends ResourceFile {
	private static final long serialVersionUID = 1L;

	@Column(name = "created_date", columnDefinition = DATE)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdDate;

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
}
