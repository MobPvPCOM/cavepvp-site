package com.mobpvp.site.cache.impl;

import com.mobpvp.site.cache.type.TimedMultiCache;
import com.mobpvp.site.model.profile.ProfileModel;

import java.util.concurrent.TimeUnit;

public class SessionCache extends TimedMultiCache<ProfileModel> {

    public SessionCache() {
        super(30, TimeUnit.SECONDS);
    }

}