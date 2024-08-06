package com.mobpvp.site.controller.profile;

import com.google.gson.JsonObject;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.ProfileCache;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class GrantController {

    public static final ProfileCache CACHE = CacheHandler.getCache(ProfileCache.class);

    @PostMapping("/claimGrants")
    public ModelAndView claim(HttpServletRequest request) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/settings");

        RequestResponse response = RequestHandler.post(
                "profile/%s/grants/claimable",
                new JsonObject(),
                profile.getUuid().toString()
        );

        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        CACHE.update(profile);
        return new ModelAndView("redirect:/settings");
    }

}