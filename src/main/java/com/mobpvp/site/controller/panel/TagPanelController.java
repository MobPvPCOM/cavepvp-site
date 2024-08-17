package com.mobpvp.site.controller.panel;

import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.StaffCache;
import com.mobpvp.site.cache.impl.TagCache;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.SessionUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Moose1301
 * @date 8/17/2024
 */


@Controller
public class TagPanelController {

    public static final TagCache CACHE = CacheHandler.getCache(TagCache.class);

    @RequestMapping("/admin/tags")
    public ModelAndView tag(HttpServletRequest request) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/panel");

        if (!profile.hasPermission("website.view.tags"))
            return ErrorUtil.noPerms("You do not have permission to view this page.");


        ModelAndView view = new ModelAndView("panel/tags");
        view.addObject("tags", CACHE.getCachedData());

        return view;
    }
}
