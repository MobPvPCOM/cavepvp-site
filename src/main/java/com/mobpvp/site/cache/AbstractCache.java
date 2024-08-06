package com.mobpvp.site.cache;

import lombok.Data;

@Data
public abstract class AbstractCache<T> {

    private T cachedData = getDefaultValue();

    public abstract T getDefaultValue();

    public final void cache(T newData) {
        this.cachedData = newData;
    }

}