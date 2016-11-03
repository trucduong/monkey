package core.service.cache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import core.common.cache.CachingService;

@Service("ehcacheService")
public class CachingServiceImpl implements CachingService {

	@Autowired
	private CacheManager cacheManager;

	public void put(Object key, Object value) {
		Cache global = this.cacheManager.getCache(Constants.CACHE_NAME);
		global.put(key, value);
	}

	public Object get(Object key) {
		Cache global = this.cacheManager.getCache(Constants.CACHE_NAME);
		return global.get(key);
	}

	public void evict(Object key) {
		Cache global = this.cacheManager.getCache(Constants.CACHE_NAME);
		global.evict(key);
	}

	public void clear() {
		Cache global = this.cacheManager.getCache(Constants.CACHE_NAME);
		global.clear();
	}

}
