package com.mobpvp.site.cache;

import java.util.HashMap;
import java.util.Map;

public class CacheHandler {

    public static Map<Class<?>, AbstractCache<?>> CACHE_MAP = new HashMap<>();

    public static void registerAll(AbstractCache<?>... models) {
        for (AbstractCache<?> model : models)
            register(model);
    }

    public static void register(AbstractCache<?> model) {
        CACHE_MAP.put(model.getClass(), model);
    }

    public static <T> T getCache(Class<T> clazz) {
        return (T) CACHE_MAP.get(clazz);
    }

}