package com.mobpvp.site.controller.panel;

import com.google.gson.JsonObject;
import com.mobpvp.site.SiteApplication;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.StaffCache;
import com.mobpvp.site.cache.impl.TagCache;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.redis.types.TagReloadPacket;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.MinecraftTextUtils;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.util.uuid.UUIDCache;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

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
    @PostMapping("/admin/tags/update")
    public ModelAndView updateTag(HttpServletRequest request, String tag, @RequestParam("tag-text") String display) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/admin/tags");

        if (!profile.hasPermission("website.view.tags"))
            return ErrorUtil.noPerms("You do not have permission to view this page.");

        String formattedDisplay = display.replace('&', MinecraftTextUtils.COLOR_CHAR);
        JsonObject object = new JsonObject();
        object.addProperty("displayName", formattedDisplay);
        RequestResponse response = RequestHandler.post("tag/" + tag, object);

        if (!response.wasSuccessful())
            return ErrorUtil.create(response);
        CACHE.execute();
        SiteApplication.INSTANCE.getRedisService().publish(new TagReloadPacket());
        return new ModelAndView("redirect:/admin/tags");
    }
    @PostMapping("/admin/tags/create")
    public ModelAndView createTag(HttpServletRequest request, String tag, @RequestParam("tag-text") String display) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/admin/tags");

        if (!profile.hasPermission("website.view.tags"))
            return ErrorUtil.noPerms("You do not have permission to view this page.");

        String formattedDisplay = display.replace('&', MinecraftTextUtils.COLOR_CHAR);
        JsonObject object = new JsonObject();
        object.addProperty("name", tag);
        object.addProperty("displayName", formattedDisplay);

        RequestResponse response = RequestHandler.post("tag", object);

        if (!response.wasSuccessful())
            return ErrorUtil.create(response);
        CACHE.execute();
        SiteApplication.INSTANCE.getRedisService().publish(new TagReloadPacket());
        return new ModelAndView("redirect:/admin/tags");
    }
    @PostMapping("/admin/tags/delete")
    public ModelAndView deleteTag(HttpServletRequest request, String tag) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/admin/tags");

        if (!profile.hasPermission("website.view.tags"))
            return ErrorUtil.noPerms("You do not have permission to view this page.");


        JsonObject object = new JsonObject();
        RequestResponse response = RequestHandler.delete("tag/" + tag, object);

        if (!response.wasSuccessful())
            return ErrorUtil.create(response);
        CACHE.execute();
        SiteApplication.INSTANCE.getRedisService().publish(new TagReloadPacket());
        return new ModelAndView("redirect:/admin/tags");
    }
}
