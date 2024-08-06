package com.mobpvp.site.controller.badge;

import com.google.gson.JsonObject;
import com.mobpvp.site.SiteApplication;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.PopupUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.badge.BadgeModel;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class BadgeController {

    @RequestMapping("/badge/view/{badge}")
    public ModelAndView view(HttpServletRequest request, @PathVariable("badge") String badgeName) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/badge/view/" + badgeName);

        if (!profile.hasPermission("website.badge.view")) {
            PopupUtil.error(request.getSession(), "You do not have permission to view badges.");
            return new ModelAndView("redirect:/");
        }

        ModelAndView view = new ModelAndView("badge/view");
        BadgeModel badge = SiteApplication.INSTANCE.getBadgeHandler().getBadge(badgeName);

        if (badge == null)
            return new ModelAndView("redirect:/badges");

        view.addObject("badge", badge);
        return view;
    }

    @RequestMapping("/badges")
    public ModelAndView badges(HttpServletRequest request) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/badges");

        if (!profile.hasPermission("website.badge.list")) {
            PopupUtil.error(request.getSession(), "You do not have permission to view badges.");
            return new ModelAndView("redirect:/");
        }

        ModelAndView view = new ModelAndView("badge/badges");
        view.addObject("badges", SiteApplication.INSTANCE.getBadgeHandler().getBadges());

        return view;
    }

    @PostMapping("/badge/give")
    public ModelAndView giveBadge(HttpServletRequest request,
                                  @RequestParam("uuid") String uuid,
                                  @RequestParam("badge") String badgeId) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null) {
            PopupUtil.error(request.getSession(), "You must be logged in to give badges.");
            return new ModelAndView("redirect:/badges");
        }

        if (!profile.hasPermission("website.badge.give")) {
            PopupUtil.error(request.getSession(), "You do not have permission to give badges.");
            return new ModelAndView("redirect:/");
        }

        BadgeModel badge = SiteApplication.INSTANCE.getBadgeHandler().getBadge(badgeId);
        if (badge == null) {
            PopupUtil.error(request.getSession(), "Invalid badge id.");
            return new ModelAndView("redirect:/badges");
        }

        JsonObject body = new JsonObject();
        body.addProperty("uuid", uuid);
        body.addProperty("badgeId", badge.getId());

        RequestResponse response = RequestHandler.post("badge", body);
        if (!response.wasSuccessful()) {
            PopupUtil.error(request.getSession(), response.getErrorMessage());
        } else {
            PopupUtil.success(request.getSession(), "Successfully gave badge to player.");
        }

        return new ModelAndView("redirect:/badges");
    }

    @PostMapping("/badge/remove")
    public ModelAndView removeBadge(HttpServletRequest request,
                                  @RequestParam("uuid") String uuid,
                                  @RequestParam("badge") String badgeId) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null) {
            PopupUtil.error(request.getSession(), "You must be logged in to remove badges.");
            return new ModelAndView("redirect:/badges");
        }

        if (!profile.hasPermission("website.badge.give")) {
            PopupUtil.error(request.getSession(), "You do not have permission to remove badges.");
            return new ModelAndView("redirect:/");
        }

        BadgeModel badge = SiteApplication.INSTANCE.getBadgeHandler().getBadge(badgeId);
        if (badge == null) {
            PopupUtil.error(request.getSession(), "Invalid badge id.");
            return new ModelAndView("redirect:/badges");
        }

        JsonObject body = new JsonObject();
        body.addProperty("uuid", uuid);
        body.addProperty("badgeId", badge.getId());

        RequestResponse response = RequestHandler.post("badge/remove", body);

        if (!response.wasSuccessful()) {
            PopupUtil.error(request.getSession(), response.getErrorMessage());
        } else {
            PopupUtil.success(request.getSession(), "Successfully removed badge from player.");
        }

        return new ModelAndView("redirect:/badge/view/" + badgeId);
    }

}