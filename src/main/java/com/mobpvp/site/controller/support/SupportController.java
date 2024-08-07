package com.mobpvp.site.controller.support;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.PopupUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.util.StringUtil;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.StaffSupportCache;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.punishment.PunishmentModel;
import com.mobpvp.site.model.support.SupportForm;
import com.mobpvp.site.model.support.SupportTicketModel;
import com.mobpvp.site.model.support.enums.SupportTypeModel;
import com.mobpvp.site.model.support.enums.SupportCategoryModel;
import com.mobpvp.site.model.support.enums.TicketStatus;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import com.mobpvp.site.util.pagination.ViewPaginationModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/support")
public class SupportController {

    public static final StaffSupportCache CACHE
            = CacheHandler.getCache(StaffSupportCache.class);

    @RequestMapping
    public ModelAndView view(HttpServletRequest request) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/support");

        ModelAndView view = new ModelAndView("support/newticket-select");
        view.addObject("categories", SupportCategoryModel.getApplicable(profile));

        return view;
    }

    @RequestMapping("/tickets")
    public ModelAndView tickets(HttpServletRequest request) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/support");

        RequestResponse response = RequestHandler.get("forum/ticket/player/%s", profile.getUuid().toString());
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        List<SupportTicketModel> tickets = new ArrayList<>();
        response.asObject().getAsJsonArray("tickets").forEach(element -> tickets.add(
                new SupportTicketModel(element.getAsJsonObject())
        ));

        tickets.sort(SupportTicketModel.TICKET_COMPARATOR);

        ModelAndView view = new ModelAndView("support/tickets");
        view.addObject("tickets", tickets);
        view.addObject("ticketPage", true);

        return view;
    }

    @RequestMapping("/staff")
    public ModelAndView tickets(HttpServletRequest request,
                                @RequestParam(value = "page", required = false) Integer page) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/support/staff");

        if (!profile.hasPermission("website.support.staff")) {
            PopupUtil.error(request.getSession(), "You do not have permission to view this page");
            return new ModelAndView("redirect:/");
        }

        ModelAndView view = new ModelAndView("support/staff/tickets");
        view.addObject("ticketPage", true);

        List<SupportTicketModel> tickets = new ArrayList<>();
        for (SupportTicketModel cachedDatum : CACHE.getCachedData()) {
            String permission = "website.support.category." + cachedDatum.getCategory().name().toLowerCase();

            if (!profile.hasPermission(permission))
                continue;

            tickets.add(cachedDatum);
        }

        if (profile.hasPermission("website.support.status.admin"))
            tickets.sort(SupportTicketModel.ADMIN_TICKET_COMPARATOR);

        new ViewPaginationModel<>(
                page == null ? 1 : page,
                10,
                tickets,
                "tickets"
        ).applyTo(view, "/support/staff?page={page}");

        return view;
    }

    @RequestMapping("/{type}")
    public ModelAndView newTicket(HttpServletRequest request, @PathVariable("type") String rawType) {
        SupportTypeModel supportType = SupportTypeModel.fromInput(rawType);
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/support");

        if (supportType == null) {
            PopupUtil.error(request.getSession(), "Invalid support category");
            return new ModelAndView("redirect:/support");
        }

        if (!supportType.getShouldDisplay().test(profile)) {
            PopupUtil.error(request.getSession(), "You cannot create a ticket in this category");
            return new ModelAndView("redirect:/support");
        }

        ModelAndView view = new ModelAndView("support/newticket");
        view.addObject("supportType", supportType);

        SupportForm supportForm = new SupportForm();
        view.addObject("supportForm", supportForm);

        return view;
    }

    @PostMapping("/create")
    public ModelAndView createTicket(HttpServletRequest request,
                                     @RequestParam("category") String categoryRaw,
                                     @ModelAttribute("supportForm") SupportForm supportForm) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/support/new");

        if (categoryRaw.isEmpty() || supportForm.getAnswers().isEmpty())
            return new ModelAndView("redirect:/support");

        SupportTypeModel category = SupportTypeModel.fromInput(categoryRaw);
        if (category == null)
            return ErrorUtil.create(400, "Invalid support category");

        if (!category.getShouldDisplay().test(profile))
            return ErrorUtil.create(400, "You cannot create a ticket in this category");

        JsonObject body = new JsonObject();
        String randomId = StringUtil.generateId(5);
        String title = (category.name().contains("APPLICATION")
                ? "Application" : "Ticket") + " #" + randomId;

        body.addProperty("id", randomId);
        body.addProperty("title", title);
        body.addProperty("category", category.name());

        if (category.name().contains("APPLICATION"))
            body.addProperty("status", TicketStatus.PENDING.name());
        else
            body.addProperty("status", TicketStatus.AWAITING_STAFF_REPLY.name());

        body.addProperty("author", profile.getUuid().toString());
        body.addProperty("body", "N/A");

        JsonArray questionArray = new JsonArray();

        for (Map.Entry<Integer, String> entry : supportForm.buildAnswers().entrySet()) {
            String answer = entry.getValue();

            if (answer.replaceAll(" ", "").isBlank()) {
                PopupUtil.error(request.getSession(), "Please fill out all questions");
                return new ModelAndView("redirect:/support/" + categoryRaw);
            }

            JsonObject question = new JsonObject();
            question.addProperty("id", entry.getKey());
            question.addProperty("body", answer);

            questionArray.add(question);
        }

        body.add("questions", questionArray);

        RequestResponse response = RequestHandler.post("forum/ticket", body);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        return new ModelAndView("redirect:/ticket/" + randomId);
    }

    @PostMapping("/reply/{id}")
    public ModelAndView replyTicket(HttpServletRequest request,
                                    @PathVariable("id") String id,
                                    @RequestParam("body") String content) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/ticket/" + id);

        RequestResponse response = RequestHandler.get("forum/ticket/%s", id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        SupportTicketModel ticket = new SupportTicketModel(response.asObject());

        if (!ticket.canReply(profile)) {
            PopupUtil.error(request.getSession(), "You cannot reply to this ticket");
            return new ModelAndView("redirect:/ticket/" + id);
        }

        if (content.replaceAll(" ", "").isBlank()) {
            PopupUtil.error(request.getSession(), "You cannot send an empty reply");
            return new ModelAndView("redirect:/ticket/" + id);
        }

        JsonObject body = new JsonObject();
        body.addProperty("id", StringUtil.generateId(5));
        body.addProperty("body", content);
        body.addProperty("author", profile.getUuid().toString());

        response = RequestHandler.post("forum/ticket/%s/reply", body, id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        TicketStatus newStatus = ticket.getCategory().name().contains("APPLICATION")
                ? TicketStatus.PENDING : profile.getUuid().equals(ticket.getAuthor())
                ? TicketStatus.AWAITING_STAFF_REPLY
                : TicketStatus.AWAITING_USER_REPLY;

        body = new JsonObject();
        body.addProperty("status", newStatus.name());

        response = RequestHandler.put("forum/ticket/%s", body, id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        return new ModelAndView("redirect:/ticket/" + id);
    }

    @RequestMapping("/state/{id}/{status}")
    public ModelAndView changeState(HttpServletRequest request,
                                    @PathVariable("id") String id,
                                    @PathVariable("status") String rawStatus) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/ticket/" + id);

        if (!profile.hasPermission("website.support.status"))
            return ErrorUtil.noPerms("You do not have permission to change the state of this ticket.");

        RequestResponse response = RequestHandler.get("forum/ticket/%s", id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        SupportTicketModel ticket = new SupportTicketModel(response.asObject());
        TicketStatus status = TicketStatus.getStatus(rawStatus);

        if (status == null)
            return ErrorUtil.create(400, "Invalid ticket status");

        if (!status.isSettable())
            return ErrorUtil.create(400, "Cant set to this status");

        if (ticket.getCategory().isAppeal() && status == TicketStatus.RESOLVED)
            return ErrorUtil.create(400, "Cant set to resolved status on appeal");

        PunishmentModel punishment = ticket.getPunishment();
        if (punishment != null && !profile.hasPermission("website.support.appeal." + punishment.getType().name()))
            return ErrorUtil.noPerms("You are not allowed to update " + punishment.getType().name() + " appeals.");

        if (punishment != null && !punishment.isActive()) {
            JsonObject body = new JsonObject();
            body.addProperty("status", TicketStatus.RESOLVED.name());

            response = RequestHandler.put("forum/ticket/%s", body, id);
            if (!response.wasSuccessful())
                return ErrorUtil.create(response.getCode(), response.getErrorMessage());

            return new ModelAndView("redirect:/ticket/" + id);
        }

        if (profile.hasPermission("website.support.status.admin")
                || ticket.getCategory().name().contains("APPLICATION")) {
            JsonObject body = new JsonObject();
            body.addProperty("status", status.name());

            response = RequestHandler.put("forum/ticket/%s", body, id);
            if (!response.wasSuccessful())
                return ErrorUtil.create(response.getCode(), response.getErrorMessage());
        } else {
            JsonObject body = new JsonObject();

            JsonObject suggestion = new JsonObject();
            suggestion.addProperty("staff", profile.getUuid().toString());
            suggestion.addProperty("status", status.name());

            body.addProperty("status", TicketStatus.AWAITING_ADMIN.name());
            body.add("resolveSuggestion", suggestion);

            response = RequestHandler.put("forum/ticket/%s", body, id);
            if (!response.wasSuccessful())
                return ErrorUtil.create(response.getCode(), response.getErrorMessage());
        }

        return new ModelAndView("redirect:/ticket/" + id);
    }

}