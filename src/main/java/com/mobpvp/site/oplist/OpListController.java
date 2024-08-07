package com.mobpvp.site.oplist;

import com.google.gson.JsonElement;
import com.mobpvp.site.advice.item.NavItem;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.util.uuid.UUIDCache;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
public class OpListController {

    @RequestMapping("/oplist")
    public ModelAndView panel(HttpServletRequest request) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/oplist");

        if (!profile.hasPermission("trusted"))
            return ErrorUtil.noPerms("You do not have permission to view this page.");

        ModelAndView view = new ModelAndView("panel/oplist");

        RequestResponse response = RequestHandler.get("oplist");
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        List<OpListUser> users = new ArrayList<>();
        for (JsonElement element : response.asArray()) {
            UUID uuid = UUID.fromString(element.getAsString());
            users.add(new OpListUser(
                    uuid,
                    UUIDCache.getName(uuid)
            ));
        }

        view.addObject("oplist", users);
        return view;
    }
    @PostMapping("/oplist/remove/")
    public ModelAndView removeUser(HttpServletRequest request, @RequestParam("uuid") UUID playerId) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/oplist");

        if (!profile.hasPermission("trusted"))
            return ErrorUtil.noPerms("You do not have permission to view this page.");


        RequestResponse response = RequestHandler.delete("oplist/" + playerId.toString());
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        return new ModelAndView("redirect:/oplist");
    }
}