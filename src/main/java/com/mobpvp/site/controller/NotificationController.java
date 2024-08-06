package com.mobpvp.site.controller;

import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.model.profile.ProfileModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class NotificationController {

    @RequestMapping("/notifications")
    public ModelAndView notifications(HttpServletRequest request) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/notifications");

        ModelAndView view = new ModelAndView("misc/notifications");

        // todo add notifications

        return view;
    }

}