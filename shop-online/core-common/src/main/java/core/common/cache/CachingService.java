package core.common.cache;

public interface CachingService {

	public void put(Object key, Object value);
	
	public Object get(Object key);
	
	public void evict(Object key);
	
	public void clear();
}