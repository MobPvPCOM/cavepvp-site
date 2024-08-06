package com.mobpvp.site.controller.support;

import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.support.SupportTicketModel;
import com.mobpvp.site.model.support.enums.TicketStatus;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class TicketController {

    @RequestMapping("/ticket/{id}")
    public ModelAndView viewTicket(HttpServletRequest request, @PathVariable("id") String id) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/ticket/" + id);

        RequestResponse response = RequestHandler.get("forum/ticket/%s", id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        SupportTicketModel ticket = new SupportTicketModel(response.asObject());
        if (!profile.getUuid().equals(ticket.getAuthor())
                && !profile.hasPermission("website.support.viewall")
                && (!profile.hasPermission("webite.support.category." + ticket.getCategory().name().toLowerCase())))
            return ErrorUtil.noPerms("You do not have permission to view this ticket.");

        ModelAndView view = new ModelAndView("support/ticket");
        view.addObject("ticket", ticket);
        view.addObject("statuses", TicketStatus.getSettable(ticket, ticket.getStatus()));

        if (ticket.getPunishment() != null)
            view.addObject("punishment", ticket.getPunishment());

        return view;
    }

}