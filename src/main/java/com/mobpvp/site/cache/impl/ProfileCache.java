package com.mobpvp.site.cache.impl;

import com.mobpvp.site.cache.type.TimedMultiCache;
import com.mobpvp.site.model.profile.ProfileModel;

import java.util.concurrent.TimeUnit;

public class ProfileCache extends TimedMultiCache<ProfileModel> {

    public ProfileCache() {
        super(30, TimeUnit.SECONDS);
    }

}