package com.mobpvp.site.controller.support;

import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.PopupUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.ApplicationSupportCache;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.support.SupportTicketModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import com.mobpvp.site.util.pagination.ViewPaginationModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/applications")
public class ApplicationController {

    public static final ApplicationSupportCache APPLICATION_CACHE
            = CacheHandler.getCache(ApplicationSupportCache.class);

    @RequestMapping
    public ModelAndView applications(HttpServletRequest request) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/support");

        RequestResponse response = RequestHandler.get("forum/ticket/player/%s/applications", profile.getUuid().toString());
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        List<SupportTicketModel> tickets = new ArrayList<>();
        response.asArray().forEach(element -> tickets.add(
                new SupportTicketModel(element.getAsJsonObject())
        ));

        tickets.sort(SupportTicketModel.TICKET_COMPARATOR);

        ModelAndView view = new ModelAndView("support/tickets");
        view.addObject("tickets", tickets);

        return view;
    }

    @RequestMapping("/staff")
    public ModelAndView staffApplications(HttpServletRequest request,
                                          @RequestParam(value = "page", required = false) Integer page) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/applications");

        if (!profile.hasPermission("website.support.application.view")) {
            PopupUtil.error(request.getSession(), "You do not have permission to view this page.");
            return new ModelAndView("redirect:/");
        }

        ModelAndView view = new ModelAndView("support/staff/tickets");

        List<SupportTicketModel> applications = new ArrayList<>();
        for (SupportTicketModel cachedDatum : APPLICATION_CACHE.getCachedData()) {
            String permission = "website.support.category." + cachedDatum.getCategory().name().toLowerCase();

            if (!profile.hasPermission(permission))
                continue;

            applications.add(cachedDatum);
        }

        new ViewPaginationModel<>(
                page == null ? 1 : page,
                10,
                applications,
                "tickets"
        ).applyTo(view, "/applications/staff?page={page}");

        return view;
    }


}