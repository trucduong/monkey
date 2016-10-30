package core.service.utils;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class ContextHolder<T> {
	private Map<String, List<T>> HOLDER;
	private Set<String> keys;
	
	public ContextHolder() {
		keys = new HashSet<String>();
		HOLDER = new HashMap<String, List<T>>();
	}
	
	public void setHolderList(String key, List<T> items) {
		this.keys.add(key);
		this.HOLDER.put(key, items);
	}
	
	public List<T> getHolderList(String key) {
		return this.HOLDER.get(key);
	}
	
	public boolean isReloadNeeded(String key) {
		return !this.keys.contains(key);
	}
	
	public void setReloadNeeded(String key) {
		this.keys.remove(key);
	}
}
