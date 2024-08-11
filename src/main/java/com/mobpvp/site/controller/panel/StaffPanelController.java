package com.mobpvp.site.controller.panel;

import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.advice.item.NavItem;
import com.mobpvp.site.model.profile.ProfileModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class StaffPanelController {

    public static final List<NavItem> ITEMS = List.of(
            new NavItem("Staff Ticket View", "/support/staff", "core.staff"),
            new NavItem("Badge Management", "/badges", "*"),
            new NavItem("Op List", "/oplist", "trusted"),
            new NavItem("Applications", "/applications/staff", "website.support.application.view")
    );

    @RequestMapping("/panel")
    public ModelAndView panel(HttpServletRequest request) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/panel");

        if (!profile.hasPermission("website.admin.view"))
            return ErrorUtil.noPerms("You do not have permission to view this page.");

        ModelAndView view = new ModelAndView("panel/index");
        view.addObject("items", ITEMS);

        return view;
    }


}