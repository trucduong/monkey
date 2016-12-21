package core.dao.utils;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.Query;

public class QueryBuilder {
	protected Map<String, Object> params;
	protected StringBuilder strQuery;

	public QueryBuilder() {
		this.params = new HashMap<String, Object>();
		this.strQuery = new StringBuilder();
	}

	public QueryBuilder append(String statement) {
		strQuery.append(statement);
		return this;
	}

	public QueryBuilder append(String statement, Object... params) {
		strQuery.append(statement);
		if (params != null && params.length > 0) {
			int i = 0;
			do {
				addParam((String) params[i++], params[i++]);
			} while (i < params.length);
		}
		return this;
	}

	public QueryBuilder addParam(String name, Object value) {
		this.params.put(name, value);
		return this;
	}

	public Query build(EntityManager em) {
		Query query = em.createQuery(strQuery.toString());
		for (String name : this.params.keySet()) {
			query.setParameter(name, this.params.get(name));
		}
		return query;
	}
}
