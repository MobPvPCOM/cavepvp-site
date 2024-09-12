package com.mobpvp.site.cache.type;

import com.mobpvp.site.cache.AbstractCache;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@RequiredArgsConstructor
public abstract class MapCache<K, V> extends AbstractCache<Map<K, V>> {

    public abstract void update(K key);

    public abstract V getDefaultCacheValue();

    public final void cache(K key, V value) {
        getCachedData().put(key, value);
    }

    public final V get(K key) {
        Map<K, V> cachedData = getCachedData();

        if (!cachedData.containsKey(key))
            update(key);

        return cachedData.getOrDefault(key, getDefaultCacheValue());
    }

    @Override
    public Map<K, V> getDefaultValue() {
        return new HashMap<>();
    }

}