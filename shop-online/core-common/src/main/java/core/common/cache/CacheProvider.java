package core.common.cache;

import java.util.HashMap;
import java.util.Map;

public class CacheProvider {
	private Map<String, Object> map;

	private static CacheProvider cache = new CacheProvider();

	private CacheProvider() {
		map = new HashMap<String, Object>();
	}

	public static CacheProvider getInstance() {
		return cache;
	}

	@SuppressWarnings("unchecked")
	public <V> V load(String key, CacheLoader<V> cacheLoader) {
		if (map.containsKey(key)) {
			return (V) map.get(key);
		}

		V value = cacheLoader.load();
		map.put(key, value);
		return value;
	}

	public void remove(String key) {
		map.remove(key);
	}
}
