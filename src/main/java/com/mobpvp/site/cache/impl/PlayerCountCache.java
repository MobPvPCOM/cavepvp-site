package com.mobpvp.site.cache.impl;

import com.mobpvp.site.cache.type.RepeatingCache;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;

import java.util.concurrent.TimeUnit;

public class PlayerCountCache extends RepeatingCache<Integer> {

    public PlayerCountCache() {
        super(TimeUnit.SECONDS.toMillis(5));
    }

    @Override
    public void execute() {
        RequestResponse response = RequestHandler.get("global-count");

        if (!response.wasSuccessful()) {
            cache(0);
            return;
        }

        cache(response.asObject().get("count").getAsInt());
    }

    @Override
    public Integer getDefaultValue() {
        return 0;
    }

}