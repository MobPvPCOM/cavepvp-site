package com.mobpvp.site.controller.profile;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mobpvp.site.SiteApplication;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.PopupUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.util.Tuple;
import com.mobpvp.site.util.uuid.UUIDCache;
import com.mobpvp.site.advice.item.NavItem;
import com.mobpvp.site.badge.BadgeModel;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.ProfileCache;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.forum.ForumThread;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import com.mobpvp.site.util.*;
import com.mobpvp.site.util.pagination.ViewPaginationModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
public class ProfileController {

    public static final ProfileCache CACHE = CacheHandler.getCache(ProfileCache.class);

    @RequestMapping({"/user/{name}", "/u/{name}"})
    public ModelAndView user(HttpServletRequest request, @PathVariable("name") String name) {
        return displayPage(request, name, "statistics").value();
    }

    @RequestMapping({"/user/{name}/forums", "/u/{name}/forums"})
    public ModelAndView forums(HttpServletRequest request, @PathVariable("name") String name) {
        return displayPage(request, name, "forums").value();
    }

    @RequestMapping({"/user/{name}/logs", "/u/{name}/logs"})
    public ModelAndView logs(HttpServletRequest request,
                             @PathVariable("name") String name,
                             @RequestParam(value = "page", required = false) Integer page) {
        Tuple<ProfileModel, ModelAndView> tuple
                = displayPage(request, name, "logs", "website.log.view");

        ProfileModel profile = tuple.key();
        ModelAndView view = tuple.value();
        if (profile == null)
            return view;

        new ViewPaginationModel<>(
                page == null ? 1 : page, 10, profile.getLogs(), "logs"
        ).applyTo(view, String.format(
                "/u/%s/logs?page={page}",
                profile.getName()
        ));

        return view;
    }

    @PostMapping("/comment")
    public ModelAndView comment(HttpServletRequest request,
                                @RequestParam("uuid") String uuid,
                                @RequestParam("comment") String comment) {
        ProfileModel targetProfile = getProfile(request, uuid);
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/u/" + targetProfile.getName());

        if (!targetProfile.getCommentStatus().canInteract(targetProfile, profile)) {
            PopupUtil.error(request.getSession(), "You cannot comment on this profile.");
            return new ModelAndView("redirect:/u/" + targetProfile.getName());
        }

        if (comment.replaceAll(" ", "").strip().isEmpty()) {
            PopupUtil.error(request.getSession(), "Comment cannot be empty.");
            return new ModelAndView("redirect:/u/" + targetProfile.getName());
        }

        if (comment.length() > 200) {
            PopupUtil.error(request.getSession(), "Comment cannot exceed 200 characters.");
            return new ModelAndView("redirect:/u/" + targetProfile.getName());
        }

        JsonObject body = new JsonObject();
        body.addProperty("comment", comment);
        body.addProperty("author", profile.getUuid().toString());
        body.addProperty("profile", targetProfile.getUuid().toString());

        RequestResponse response = RequestHandler.post("comment", body);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        CACHE.remove(targetProfile);
        return new ModelAndView("redirect:/u/" + targetProfile.getName());
    }

    @PostMapping("/comment/delete")
    public ModelAndView deleteComment(HttpServletRequest request,
                                      @RequestParam("uuid") String uuid,
                                      @RequestParam("commentId") UUID commentId) {
        ProfileModel targetProfile = getProfile(request, uuid);
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/u/" + targetProfile.getName());

        if (profile.getUuid() != targetProfile.getUuid()
                && !profile.hasPermission("website.comment.delete")) {
            PopupUtil.error(request.getSession(), "You cannot delete this comment.");
            return new ModelAndView("redirect:/u/" + targetProfile.getName());
        }

        RequestResponse response = RequestHandler.delete(
                "comment/" + commentId.toString()
        );

        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        CACHE.remove(targetProfile);
        return new ModelAndView("redirect:/u/" + targetProfile.getName());
    }

    public ProfileModel getProfile(HttpServletRequest request, String name) {
        UUID uuid = UUIDCache.isUuid(name)
                ? UUID.fromString(name)
                : UUIDCache.getUuid(name);

        if (uuid == null)
            return null;

        if (!CACHE.contains(uuid)) {
            RequestResponse response = RequestHandler.get(
                    "profile/%s?webResolved=true" +
                            "&profilePage=true" +
                            "&adminPanel=true" +
                            "&includePermissions=true",
                    uuid
            );

            if (!response.wasSuccessful())
                return null;

            ProfileModel profile = new ProfileModel(response.asObject());
            profile.loadProfileStats();
            CACHE.update(profile);

            return profile;
        }

        return CACHE.get(uuid);
    }

    public Tuple<ProfileModel, ModelAndView> displayPage(HttpServletRequest request, String name, String pageName) {
        return displayPage(request, name, pageName, null);
    }

    public Tuple<ProfileModel, ModelAndView> displayPage(HttpServletRequest request,
                                                         String name,
                                                         String pageName,
                                                         String permission) {
        ModelAndView view = new ModelAndView("profile/user");
        ProfileModel profile = getProfile(request, name);

        if (profile == null)
            return new Tuple<>(null, ErrorUtil.create(404, "Profile not found"));

        ProfileModel sessionProfile = SessionUtil.getProfile(request);
        if (permission != null && (sessionProfile == null
                || !sessionProfile.hasPermission(permission)))
            return new Tuple<>(null, new ModelAndView("redirect:/u/" + profile.getName()));

        List<NavItem> userNavItems = List.of(
                new NavItem("General", "/u/" + profile.getName()),
                new NavItem("Forums", "/u/" + profile.getName() + "/forums"),
                new NavItem("Logs", "/u/" + profile.getName() + "/logs", "website.log.view")
        );

        List<ForumThread> threads = new ArrayList<>(profile.getThreads());
        threads.removeIf(thread -> {
            if (thread.getForumPermission() == null)
                return false;

            if (thread.getForumPermission().isEmpty())
                return false;

            return sessionProfile == null || !sessionProfile.hasPermission(thread.getForumPermission());
        });

        view.addObject("page", pageName);
        view.addObject("profile", profile);
        view.addObject("threads", threads);
        view.addObject("userNavItems", userNavItems);

        List<BadgeModel> badges = new ArrayList<>(profile.getBadges());

        for (BadgeModel badge : SiteApplication.INSTANCE.getBadgeHandler().getBadges()) {
            if (!badge.canApply(profile) || badges.contains(badge))
                continue;

            badges.add(badge);
        }

        view.addObject("badges", badges);

        return new Tuple<>(profile, view);
    }

}