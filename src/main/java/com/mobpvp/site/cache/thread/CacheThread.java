package com.mobpvp.site.cache.thread;

import com.mobpvp.site.cache.type.RepeatingCache;
import com.mobpvp.site.util.thread.SiteThread;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.AbstractCache;

public class CacheThread extends SiteThread {

    public CacheThread() {
        super("Site - Cache Thread", 500L);
    }

    @Override
    public void execute() {
        for (AbstractCache<?> abstractCache : CacheHandler.CACHE_MAP.values()) {
            if (!(abstractCache instanceof RepeatingCache<?> cache))
                continue;

            long lastCache = cache.getLastCache();
            long delay = cache.getDelay();

            if (lastCache + delay <= System.currentTimeMillis()) {
                cache.execute();
                cache.setLastCache(System.currentTimeMillis());
            }
        }
    }

}