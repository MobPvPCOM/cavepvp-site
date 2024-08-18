package com.mobpvp.site.controller.forum;

import com.google.gson.JsonObject;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.CategoryCache;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.PopupUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.util.StringUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/category")
public class CategoryController {

    public static final CategoryCache CATEGORY_CACHE
            = CacheHandler.getCache(CategoryCache.class);

    @PostMapping("/create")
    public ModelAndView create(HttpServletRequest request,
                               @RequestParam("name") String name,
                               @RequestParam("weight") Integer weight,
                               @RequestParam("permission") String permission) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/forums");

        if (!profile.hasPermission("website.forum.category.manage"))
            return new ModelAndView("redirect:/forums");

        if (name.isBlank()) {
            PopupUtil.error(request.getSession(), "The title cannot be empty.");
            return new ModelAndView("redirect:/forums");
        }

        JsonObject body = new JsonObject();
        body.addProperty("id", StringUtil.generateId(5));
        body.addProperty("name", name);
        body.addProperty("weight", weight);

        if (permission != null && !permission.isEmpty())
            body.addProperty("permission", permission);

        RequestResponse response = RequestHandler.post("forum/category", body);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        CATEGORY_CACHE.forceExecute();
        return new ModelAndView("redirect:/forums");
    }

    @PostMapping("/edit/{id}")
    public ModelAndView edit(HttpServletRequest request,
                             @PathVariable("id") String id,
                             @RequestParam("name") String name,
                             @RequestParam("weight") Integer weight,
                             @RequestParam("permission") String permission) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/forums");

        if (!profile.hasPermission("website.forum.category.manage"))
            return new ModelAndView("redirect:/forums");

        if (name.isBlank()) {
            PopupUtil.error(request.getSession(), "The title cannot be empty.");
            return new ModelAndView("redirect:/forums");
        }

        JsonObject body = new JsonObject();
        body.addProperty("name", name);
        body.addProperty("weight", weight);

        if (permission != null)
            body.addProperty("permission", permission.isEmpty() ? "" : permission);

        RequestResponse response = RequestHandler.put("forum/category/%s", body, id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        CATEGORY_CACHE.forceExecute();
        return new ModelAndView("redirect:/forums");
    }

    @PostMapping("/delete/{id}")
    public ModelAndView delete(HttpServletRequest request,
                               @PathVariable("id") String id) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/forums");

        if (!profile.hasPermission("website.forum.category.manage"))
            return new ModelAndView("redirect:/forums");

        RequestResponse response = RequestHandler.delete("forum/category/%s", id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        CATEGORY_CACHE.forceExecute();
        return new ModelAndView("redirect:/forums");
    }

}