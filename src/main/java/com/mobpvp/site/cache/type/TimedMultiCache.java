package com.mobpvp.site.cache.type;

import com.mobpvp.site.util.TimeBasedMap;
import com.mobpvp.site.util.uuid.UUIDHolder;
import com.mobpvp.site.cache.AbstractCache;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

public abstract class TimedMultiCache<T extends UUIDHolder> extends AbstractCache<T> {

    protected final Map<UUID, T> cacheMap;

    public TimedMultiCache(long cacheDuration, TimeUnit timeUnit) {
        this.cacheMap = new TimeBasedMap<>(cacheDuration, timeUnit);
    }

    public void update(T t) {
        cacheMap.put(t.getUuid(), t);
    }

    public T get(UUID uuid) {
        return cacheMap.get(uuid);
    }

    public void remove(T t) {
        cacheMap.remove(t.getUuid());
    }

    public boolean contains(T t) {
        return contains(t.getUuid());
    }

    public boolean contains(UUID uuid) {
        return cacheMap.containsKey(uuid);
    }

    public T getDefaultValue() {
        return null;
    }

}