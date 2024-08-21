package com.mobpvp.site.controller.support;

import com.google.gson.JsonNull;
import com.google.gson.JsonObject;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.punishment.PunishmentModel;
import com.mobpvp.site.model.support.SupportTicketModel;
import com.mobpvp.site.model.support.enums.TicketStatus;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.TimeUnit;

@Controller
@RequestMapping("/support")
public class SupportResolveController {

    @PostMapping(value = "/resolve/{id}")
    public ModelAndView resolve(HttpServletRequest request,
                                @PathVariable("id") String id,
                                @RequestParam(value = "decreaseLevel", defaultValue = "false") Boolean decreaseLevel) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/ticket/" + id);

        if (!profile.hasPermission("website.support.status"))
            return ErrorUtil.noPerms("You do not have permission to change the state of this ticket.");

        RequestResponse response = RequestHandler.get("forum/ticket/%s", id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        SupportTicketModel ticket = new SupportTicketModel(response.asObject());
        PunishmentModel punishment = ticket.getPunishment();
        if (punishment == null)
            return ErrorUtil.create(400, "Cannot resolve non appeal tickets");

        if (!profile.hasPermission("website.support.appeal." + punishment.getType().name()))
            return ErrorUtil.noPerms("You are not allowed to update " + punishment.getType().name() + " appeals.");

        if (!punishment.isActive()) {
            JsonObject body = new JsonObject();
            body.addProperty("status", TicketStatus.RESOLVED.name());

            response = RequestHandler.put("forum/ticket/%s", body, id);
            if (!response.wasSuccessful())
                return ErrorUtil.create(response.getCode(), response.getErrorMessage());

            return new ModelAndView("redirect:/ticket/" + id);
        }

        JsonObject body = new JsonObject();
        if (profile.hasPermission("website.support.status.admin")) {
            body.addProperty("removed", true);
            body.addProperty("removedBy", profile.getUuid().toString());
            body.addProperty("removedReason", "Ticket-" + ticket.getId());

            response = RequestHandler.put(
                    "punishment/%s",
                    body,
                    punishment.getId().toString()
            );

            if (!response.wasSuccessful())
                return ErrorUtil.create(response.getCode(), response.getErrorMessage());

            body = new JsonObject();
            body.addProperty("status", TicketStatus.RESOLVED.name());
        } else {
            JsonObject suggestion = new JsonObject();
            suggestion.addProperty("staff", profile.getUuid().toString());
            suggestion.addProperty("status", TicketStatus.RESOLVED.name());
            suggestion.addProperty("punishmentAction", "REMOVE");
            suggestion.addProperty("punishmentNewDuration", -1);
            suggestion.addProperty("decreaseLevel", decreaseLevel);

            body.addProperty("status", TicketStatus.AWAITING_ADMIN.name());
            body.add("resolveSuggestion", suggestion);
        }

        response = RequestHandler.put("forum/ticket/%s", body, id);

        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        return new ModelAndView("redirect:/ticket/" + id);
    }

    @PostMapping(value = "/update/{id}")
    public ModelAndView update(HttpServletRequest request,
                               @PathVariable("id") String id,
                               @RequestParam("time") int time,
                               @RequestParam("timeUnit") String timeUnit,
                               @RequestParam(value = "decreaseLevel", defaultValue = "false") Boolean decreaseLevel) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/ticket/" + id);

        if (!profile.hasPermission("website.support.status"))
            return ErrorUtil.noPerms("You do not have permission to change the state of this ticket.");

        if (time <= 0)
            return ErrorUtil.create(400, "Time must be positive");

        if (timeUnit == null)
            return ErrorUtil.create(400, "Invalid time unit");

        RequestResponse response = RequestHandler.get("forum/ticket/%s", id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        SupportTicketModel ticket = new SupportTicketModel(response.asObject());
        PunishmentModel punishment = ticket.getPunishment();
        if (punishment == null)
            return ErrorUtil.create(400, "Cannot update time non appeal tickets");

        if (!profile.hasPermission("website.support.appeal." + punishment.getType().name()))
            return ErrorUtil.noPerms("You are not allowed to update " + punishment.getType().name() + " appeals.");

        if (!punishment.isActive()) {
            JsonObject body = new JsonObject();
            body.addProperty("status", TicketStatus.RESOLVED.name());

            response = RequestHandler.put("forum/ticket/%s", body, id);
            if (!response.wasSuccessful())
                return ErrorUtil.create(response.getCode(), response.getErrorMessage());

            return new ModelAndView("redirect:/ticket/" + id);
        }

        long duration;
        switch (timeUnit.toUpperCase()) {
            case "MINUTES" -> duration = TimeUnit.MINUTES.toMillis(time);
            case "HOURS" -> duration = TimeUnit.HOURS.toMillis(time);
            case "DAYS" -> duration = TimeUnit.DAYS.toMillis(time);
            case "WEEKS" -> duration = TimeUnit.DAYS.toMillis(7) * time;
            case "MONTHS" -> duration = TimeUnit.DAYS.toMillis(30) * time;
            default -> duration = -1;
        }

        if (duration == -1)
            return ErrorUtil.create(400, "Invalid time");


        JsonObject body = new JsonObject();
        if (profile.hasPermission("website.support.status.admin")) {
            if (punishment.getType().getMaxTempDuration() > 0
                    && !profile.hasPermission(punishment.getType().getPermPermission())
                    && duration > punishment.getType().getMaxTempDuration())
                return ErrorUtil.noPerms("You can only punish players for a maximum of 7 days");

            body.addProperty("removed", true);
            body.addProperty("removedBy", profile.getUuid().toString());
            body.addProperty("removedReason", "Ticket-" + ticket.getId());

            response = RequestHandler.put(
                    "punishment/%s",
                    body,
                    punishment.getId().toString()
            );

            if (!response.wasSuccessful())
                return ErrorUtil.create(response.getCode(), response.getErrorMessage());

            body = new JsonObject();
            body.addProperty("uuid", punishment.getUuid().toString());
            body.addProperty("type", punishment.getType().name());
            body.addProperty("duration", duration);
            body.addProperty("punishedBy", profile.getUuid().toString());
            body.addProperty("punishedReason", "Ticket-" + id);
            body.addProperty("serverType", "Website");
            body.addProperty("server", "Ticket-" + id);

            response = RequestHandler.post("punishment", body);
            if (!response.wasSuccessful())
                return ErrorUtil.create(response.getCode(), response.getErrorMessage());

            body = new JsonObject();
            body.addProperty("status", TicketStatus.RESOLVED.name());
        } else {
            JsonObject suggestion = new JsonObject();
            suggestion.addProperty("staff", profile.getUuid().toString());
            suggestion.addProperty("status", TicketStatus.RESOLVED.name());
            suggestion.addProperty("punishmentAction", "UPDATE_TIME");
            suggestion.addProperty("punishmentNewDuration", duration);
            suggestion.addProperty("decreaseLevel", decreaseLevel);

            body.addProperty("status", TicketStatus.AWAITING_ADMIN.name());
            body.add("resolveSuggestion", suggestion);
        }

        response = RequestHandler.put("forum/ticket/%s", body, id);

        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        return new ModelAndView("redirect:/ticket/" + id);
    }

    @PostMapping(value = "/resolve/{id}/confirm")
    public ModelAndView confirm(HttpServletRequest request,
                                @PathVariable("id") String id) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/ticket/" + id);

        if (!profile.hasPermission("website.support.status.admin"))
            return ErrorUtil.noPerms("You do not have permission to change the state of this ticket.");

        RequestResponse response = RequestHandler.get("forum/ticket/%s", id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        SupportTicketModel ticket = new SupportTicketModel(response.asObject());
        PunishmentModel punishment = ticket.getPunishment();
        SupportTicketModel.ResolveSuggestion resolveSuggestion = ticket.getResolveSuggestion();

        JsonObject body = new JsonObject();

        if (punishment == null) {
            body.addProperty("status", resolveSuggestion.getStatus().name());
            body.add("resolveSuggestion", JsonNull.INSTANCE);

            response = RequestHandler.put("forum/ticket/%s", body, id);
            if (!response.wasSuccessful())
                return ErrorUtil.create(response.getCode(), response.getErrorMessage());

            return new ModelAndView("redirect:/ticket/" + id);
        }

        if (punishment.getType().getMaxTempDuration() > 0
                && !profile.hasPermission(punishment.getType().getPermPermission())
                && resolveSuggestion.getPunishmentNewDuration() > punishment.getType().getMaxTempDuration())
            return ErrorUtil.noPerms("You can only punish players for a maximum of 7 days");

        body.addProperty("removed", true);
        body.addProperty("removedBy", profile.getUuid().toString());
        body.addProperty("removedReason", "Ticket-" + ticket.getId());

        response = RequestHandler.put(
                "punishment/%s",
                body,
                punishment.getId().toString()
        );

        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        if (resolveSuggestion.getPunishmentAction().equals("UPDATE_TIME")) {
            body = new JsonObject();
            body.addProperty("uuid", punishment.getUuid().toString());
            body.addProperty("type", punishment.getType().name());
            body.addProperty("duration", resolveSuggestion.getPunishmentNewDuration());
            body.addProperty("punishedBy", resolveSuggestion.getStaff().toString());
            body.addProperty("punishedReason", "Ticket-" + id);
            body.addProperty("serverType", "Website");
            body.addProperty("server", "Ticket-" + id);

            response = RequestHandler.post("punishment", body);
            if (!response.wasSuccessful())
                return ErrorUtil.create(response.getCode(), response.getErrorMessage());
        }

        body = new JsonObject();
        body.addProperty("status", resolveSuggestion.getStatus().name());
        body.add("resolveSuggestion", JsonNull.INSTANCE);

        response = RequestHandler.put("forum/ticket/%s", body, id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        return new ModelAndView("redirect:/ticket/" + id);
    }

    @PostMapping(value = "/resolve/{id}/deny")
    public ModelAndView deny(HttpServletRequest request,
                             @PathVariable("id") String id) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/ticket/" + id);

        if (!profile.hasPermission("website.support.status.admin"))
            return ErrorUtil.noPerms("You do not have permission to change the state of this ticket.");

        RequestResponse response = RequestHandler.get("forum/ticket/%s", id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        SupportTicketModel ticket = new SupportTicketModel(response.asObject());

        JsonObject body = new JsonObject();

        if (ticket.getCategory().name().contains("APPLICATION"))
            body.addProperty("status", TicketStatus.PENDING.name());
        else
            body.addProperty("status", TicketStatus.AWAITING_STAFF_REPLY.name());

        body.add("resolveSuggestion", JsonNull.INSTANCE);

        response = RequestHandler.put("forum/ticket/%s", body, id);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        return new ModelAndView("redirect:/ticket/" + id);
    }

}