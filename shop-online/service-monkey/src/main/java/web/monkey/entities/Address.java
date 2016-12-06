package web.monkey.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import core.dao.dto.BaseDto;
import core.dao.entities.BaseEntity;

@Entity
@Table(name = "address")
public class Address extends BaseEntity {

	private static final long serialVersionUID = 7663323887151007821L;

//	@Column(name = "id", columnDefinition = INT)
//	private Integer id;
	
	@Column(name = "locale", columnDefinition = SHORT_1)
	private String locale;
	
	@Column(name = "address_1", columnDefinition = SHORT_5)
	private String address1;
	
	@Column(name = "address_2", columnDefinition = SHORT_5)
	private String address2;
	
	@Column(name = "address_3", columnDefinition = SHORT_5)
	private String address3;
	
	@Column(name = "address_4", columnDefinition = SHORT_5)
	private String address4;
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
//	
//	@Override
//	public Object convertToId(String value) {
//		return Integer.valueOf(value);
//	}

//	public Integer getId() {
//		return id;
//	}
//
//	public void setId(Integer id) {
//		this.id = id;
//	}

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getAddress3() {
		return address3;
	}

	public void setAddress3(String address3) {
		this.address3 = address3;
	}

	public String getAddress4() {
		return address4;
	}

	public void setAddress4(String address4) {
		this.address4 = address4;
	}

	@Override
	public void bind(BaseDto dto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void unBind(BaseDto dto) {
		// TODO Auto-generated method stub
		
	}
}
