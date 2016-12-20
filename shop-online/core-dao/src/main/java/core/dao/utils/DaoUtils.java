package core.dao.utils;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import core.common.reflect.ObjectModifier;

public class DaoUtils {

	public static <T> T selectFirst(EntityManager entityManager, QueryBuilder builder, Class<T> cls, String[] columns) {
		List<Object[]> resultList = builder.build(entityManager).getResultList();
		if (resultList.isEmpty()) {
			return null;
		}

		return convert(cls, columns, resultList.get(0));
	}
	
	public static <T> List<T> selectAll(EntityManager entityManager, QueryBuilder builder, Class<T> cls, String[] columns) {
		List<Object[]> resultList = builder.build(entityManager).getResultList();
		if (resultList.isEmpty()) {
			return null;
		}

		List<T> list = new ArrayList<T>();
		for (Object[] objects : resultList) {
			T obj = convert(cls, columns, objects);
			if (obj != null) {
				list.add(obj);
			}
		}
		return list;
	}
	
	public static <T> T convert(Class<T> cls, String[] columns, Object[] objects) {
		T obj = null;
		try {
			obj = cls.newInstance();
			for (int i = 0; i < columns.length && i < objects.length; i++) {
				ObjectModifier.set(obj, columns[i], objects[i]);
			}
		} catch (InstantiationException | IllegalAccessException e) {}
		return obj;
	}
}
