package com.mobpvp.site.util;

import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.SessionCache;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

public class SessionUtil {

    public static final SessionCache CACHE = CacheHandler.getCache(SessionCache.class);

    public static void storeSession(HttpServletRequest request, UUID uuid) {
        request.getSession().setAttribute("uuid", uuid);
    }

    public static ProfileModel getProfile(HttpServletRequest request) {
        Object attribute = request.getSession().getAttribute("uuid");

        if (attribute == null)
            return null;

        UUID uuid = (UUID) attribute;

        ProfileModel profileModel = CACHE.get(uuid);
        if (profileModel != null)
            return profileModel;

        RequestResponse response = RequestHandler.get(
                "profile/%s?web=true",
                uuid.toString()
        );

        if (!response.wasSuccessful())
            return null;

        profileModel = new ProfileModel(response.asObject());
        CACHE.update(profileModel);

        return profileModel;
    }

}