package core.dao.dto;

public interface IDto <E> {
	void bind(E entity, String action);
	void unbind(E entity, String action);
}
