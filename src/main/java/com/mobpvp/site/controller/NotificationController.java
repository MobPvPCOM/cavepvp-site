package com.mobpvp.site.controller;

import com.google.gson.JsonObject;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.CategoryCache;
import com.mobpvp.site.cache.impl.NotificationCache;
import com.mobpvp.site.controller.profile.ProfileController;
import com.mobpvp.site.model.PopupModel;
import com.mobpvp.site.model.profile.NotificationModel;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.util.pagination.ViewPaginationModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/notifications")
public class NotificationController {

    public static final NotificationCache CACHE
            = CacheHandler.getCache(NotificationCache.class);

    @GetMapping
    public ModelAndView notifications(HttpServletRequest request,
                                      @RequestParam(value = "page", required = false) Integer page) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/notifications");

        List<NotificationModel> notifications = CACHE.get(profile.getUuid());

        ModelAndView view = new ModelAndView("misc/notifications");
        view.addObject("notifications", notifications);

        new ViewPaginationModel<>(
                page == null ? 1 : page,
                10,
                notifications,
                "notifications"
        ).applyTo(view, "/notifications?page={page}");

        return view;
    }

    @PostMapping("/read/{page}/{uuid}")
    public ModelAndView readNotifications(HttpServletRequest request,
                                          @PathVariable Integer page,
                                          @PathVariable UUID uuid,
                                          RedirectAttributes redirectAttributes) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/notifications");

        NotificationModel notification = CACHE.getNotification(profile.getUuid(), uuid);
        if (notification == null)
            return ErrorUtil.create(404, "Notification not found");

        JsonObject object = new JsonObject();
        object.addProperty("notificationId", uuid.toString());

        RequestResponse response = RequestHandler.post(
                "forum/notifications/read",
                object
        );

        if (!response.wasSuccessful())
            return ErrorUtil.create(response);

        notification.setRead(true);
        redirectAttributes.addFlashAttribute("successMessage", new PopupModel(
                "Notification marked as read"
        ));

        CACHE.update(profile.getUuid());
        return new ModelAndView("redirect:/notifications"
                +  (page == 1 ? "" : "?page=" + page));
    }

}