package com.mobpvp.site.cache.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import com.mobpvp.site.cache.AbstractCache;

@Getter @Setter
@RequiredArgsConstructor
public abstract class RepeatingCache<T> extends AbstractCache<T> {

    private final long delay;
    private long lastCache;

    public abstract void execute();

    public abstract T getDefaultValue();

    public final void forceExecute() {
        execute();
        setLastCache(System.currentTimeMillis());
    }

}