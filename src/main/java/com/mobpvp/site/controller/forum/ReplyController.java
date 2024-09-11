package com.mobpvp.site.controller.forum;

import com.google.gson.JsonObject;
import com.mobpvp.site.model.replies.ReplyModel;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.PopupUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.util.StringUtil;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.forum.ForumThread;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Controller
@RequestMapping("/reply")
public class ReplyController {

    @PostMapping("/{threadId}")
    public ModelAndView reply(HttpServletRequest request,
                              @PathVariable("threadId") String threadId,
                              @RequestParam(value = "replyId", required = false) String replyId,
                              @RequestParam("body") String content) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/thread/%s", threadId);

        RequestResponse response = RequestHandler.get("forum/thread/%s", threadId);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        ForumThread mainThread = new ForumThread(response.asObject());

        if (mainThread.isLocked() && !profile.hasPermission("website.thread.lock")) {
            PopupUtil.error(request.getSession(), "This thread is locked.");
            return new ModelAndView("redirect:/thread/" + threadId);
        }

        if (content.isBlank()) {
            PopupUtil.error(request.getSession(), "The reply cannot be empty.");
            return new ModelAndView("redirect:/thread/" + threadId);
        }

        UUID id = UUID.randomUUID();
        JsonObject body = new JsonObject();

        body.addProperty("id", id.toString());
        body.addProperty("comment", content);
        body.addProperty("author", profile.getUuid().toString());
        if(replyId != null)
            body.addProperty("replyId", replyId);

        response = RequestHandler.post(
                "forum/replies/%s",
                body, threadId
        );

        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        ForumThread.REPLY_CACHE.forceExecute();
        return new ModelAndView("redirect:/thread/" + threadId);
    }

    @PostMapping("/delete")
    public ModelAndView delete(HttpServletRequest request,
                               @RequestParam("parentId") String parentId,
                               @RequestParam("replyId") String replyId) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/thread/%s", parentId);

        RequestResponse response = RequestHandler.get("forum/replies/%s", replyId);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        ReplyModel replyModel = new ReplyModel(response.asObject());
        if (!replyModel.canDelete(profile)) {
            PopupUtil.error(request.getSession(), "You cannot delete this reply.");
            return new ModelAndView("redirect:/thread/" + parentId);
        }

        response = RequestHandler.delete("forum/replies/%s", replyId);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        ForumThread.REPLY_CACHE.forceExecute();
        return new ModelAndView("redirect:/thread/" + parentId);
    }

}