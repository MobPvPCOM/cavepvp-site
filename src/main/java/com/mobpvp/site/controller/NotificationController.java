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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Controller
@RequestMapping("/notifications")
public class NotificationController {

    public static final NotificationCache CACHE
            = CacheHandler.getCache(NotificationCache.class);

    @GetMapping
    public ModelAndView notifications(HttpServletRequest request) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/notifications");

        ModelAndView view = new ModelAndView("misc/notifications");
        view.addObject("notifications", CACHE.get(profile.getUuid()));

        return view;
    }

    @PostMapping("/read/{uuid}")
    public ModelAndView readNotifications(HttpServletRequest request,
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
        return new ModelAndView("redirect:/notifications");
    }

}