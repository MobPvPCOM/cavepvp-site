package com.mobpvp.site.controller.forum;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mobpvp.site.SiteConstant;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.PopupUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.util.StringUtil;
import com.mobpvp.site.controller.IndexController;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.forum.ForumCategory;
import com.mobpvp.site.model.forum.ForumModel;
import com.mobpvp.site.model.forum.ForumThread;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/thread")
public class ThreadController {

    @RequestMapping("/{threadId}")
    public ModelAndView thread(HttpServletRequest request, @PathVariable("threadId") String threadId) {
        RequestResponse response = RequestHandler.get("forum/thread/%s", threadId);
        if (!response.wasSuccessful()) {
            PopupUtil.error(request.getSession(), response);
            return new ModelAndView("redirect:/forums");
        }

        ForumThread thread = new ForumThread(response.asObject());
        ProfileModel profile = SessionUtil.getProfile(request);

        String permission = thread.getForumPermission();
        if ((permission != null && !permission.isEmpty()) && (profile == null || !profile.hasPermission(permission))) {
            if (profile == null)
                return ErrorUtil.loginRedirect("/thread/" + threadId);

            PopupUtil.error(request.getSession(), "You don't have permission to view this thread");
            return new ModelAndView("redirect:/forums");
        }

        ModelAndView view = new ModelAndView("forum/thread");
        view.addObject("thread", thread);

        if (profile != null && !thread.hasSeen(profile))
            RequestHandler.post(
                    "forum/thread/%s/seen/%s",
                    new JsonObject(),
                    threadId,
                    profile.getUuid().toString()
            );

        return view;
    }

    @RequestMapping("/{threadId}/edit")
    public ModelAndView edit(HttpServletRequest request, @PathVariable("threadId") String threadId) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/thread/%s/edit", threadId);

        RequestResponse response = RequestHandler.get("forum/thread/%s", threadId);
        if (!response.wasSuccessful()) {
            PopupUtil.error(request.getSession(), response);
            return new ModelAndView("redirect:/thread/" + threadId);
        }

        ModelAndView view = new ModelAndView("forum/edit-thread");
        ForumThread thread = new ForumThread(response.asObject());

        if (!thread.canEdit(profile)) {
            PopupUtil.error(request.getSession(), "You cannot edit this thread.");
            return new ModelAndView("redirect:/thread/" + threadId);
        }

        view.addObject("thread", thread);
        view.addObject("newThread", true);

        return view;
    }

    @RequestMapping("/new")
    public ModelAndView newThread(HttpServletRequest request, @RequestParam(name = "forum", required = false) String forumId) {
        ModelAndView view = new ModelAndView("forum/new-thread");
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/thread/new");

        RequestResponse response = RequestHandler.get("forum/category");
        if (!response.wasSuccessful()) {
            PopupUtil.error(request.getSession(), response);
            return new ModelAndView("redirect:/forums");
        }

        List<ForumModel> forums = new ArrayList<>();
        for (JsonElement element : response.asArray()) {
            JsonObject object = element.getAsJsonObject();

            for (ForumModel forum : new ForumCategory(object).getForums()) {
                if (!forum.getPermission().isEmpty()
                        && !profile.hasPermission(forum.getPermission()))
                    continue;

                if (!forum.isLocked() || profile.hasPermission("website.forum.post." + forum.getUrlName()))
                    forums.add(forum);
            }
        }

        if (forumId != null)
            view.addObject("forumId", forumId);

        view.addObject("newThread", true);
        view.addObject("forums", forums);
        return view;
    }

    @PostMapping
    public ModelAndView post(HttpServletRequest request,
                             @RequestParam("forumId") String forumId,
                             @RequestParam("title") String title,
                             @RequestParam("body") String content) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/thread/new");

        if (title.replaceAll(" ", "").isBlank()) {
            PopupUtil.error(request.getSession(), "You must supply a title for your thread.");
            return new ModelAndView("redirect:/thread/new");
        }

        String sanitizedContent = SiteConstant.POLICY_FACTORY.sanitize(content);
        if (sanitizedContent.isBlank()) {
            PopupUtil.error(request.getSession(), "You must supply a body for your thread.");
            return new ModelAndView("redirect:/thread/new");
        }

        RequestResponse response = RequestHandler.get("forum/forum/%s", forumId);
        if (!response.wasSuccessful()) {
            PopupUtil.error(request.getSession(), response);
            return new ModelAndView("redirect:/forum/" + forumId);
        }

        ForumModel forum = new ForumModel(response.asObject());
        if (forum.isLocked() && !profile.hasPermission("website.forum.post." + forum.getUrlName())) {
            PopupUtil.error(request.getSession(), "This forum is locked.");
            return new ModelAndView("redirect:/forum/" + forumId);
        }

        String id = StringUtil.generateId(8);
        JsonObject body = new JsonObject();

        body.addProperty("id", id);
        body.addProperty("forumId", forumId);
        body.addProperty("title", title);
        body.addProperty("body", sanitizedContent);
        body.addProperty("author", profile.getUuid().toString());

        response = RequestHandler.post("forum/thread", body);
        if (!response.wasSuccessful()) {
            PopupUtil.error(request.getSession(), response);
            return new ModelAndView("redirect:/forum/" + forumId);
        }

        if (forumId.equalsIgnoreCase(SiteConstant.ANNOUNCEMENTS_FORUM))
            IndexController.CACHE.forceExecute();

        return new ModelAndView("redirect:/thread/" + id);
    }

    @PostMapping("/edit")
    public ModelAndView edit(HttpServletRequest request,
                             @RequestParam("threadId") String threadId,
                             @RequestParam("title") String title,
                             @RequestParam("body") String content,
                             @RequestParam(value = "imageUrl", required = false) String imageUrl) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/thread/%s", threadId);

        if (title.replaceAll(" ", "").isBlank()) {
            PopupUtil.error(request.getSession(), "You must supply a title for your thread.");
            return new ModelAndView("redirect:/thread/%s" + threadId);
        }

        String sanitizedContent = SiteConstant.POLICY_FACTORY.sanitize(content);
        if (sanitizedContent.isBlank()) {
            PopupUtil.error(request.getSession(), "You must supply a body for your thread.");
            return new ModelAndView("redirect:/thread/%s" + threadId);
        }

        RequestResponse response = RequestHandler.get("forum/thread/%s", threadId);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        ForumThread thread = new ForumThread(response.asObject());
        if (!thread.getAuthor().equals(profile.getUuid())
                && !profile.hasPermission("website.thread.edit.*"))
            return ErrorUtil.noPerms("You are not allowed to edit this thread");

        JsonObject body = new JsonObject();

        body.addProperty("title", title);
        body.addProperty("body", sanitizedContent);
        body.addProperty("lastEditedAt", System.currentTimeMillis());
        body.addProperty("lastEditedBy", profile.getUuid().toString());

        if (imageUrl != null)
            body.addProperty("imageUrl", imageUrl);

        response = RequestHandler.put("forum/thread/%s", body, threadId);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        IndexController.CACHE.forceExecute();
        return new ModelAndView("redirect:/thread/" + threadId);
    }

    @PostMapping("/delete")
    public ModelAndView delete(HttpServletRequest request,
                               @RequestParam("threadId") String threadId) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/thread/%s", threadId);

        RequestResponse response = RequestHandler.get("forum/thread/%s", threadId);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        ForumThread thread = new ForumThread(response.asObject());
        if (!thread.getAuthor().equals(profile.getUuid())
                && !profile.hasPermission("website.thread.delete.*"))
            return ErrorUtil.noPerms("You are not allowed to delete this thread");

        response = RequestHandler.delete("forum/thread/%s", threadId);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        return new ModelAndView("redirect:/forum/" + thread.getForum());
    }

    @PostMapping("/lock/{threadId}")
    public ModelAndView lock(HttpServletRequest request,
                             @PathVariable("threadId") String threadId) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/thread/" + threadId);

        RequestResponse response = RequestHandler.get("forum/thread/%s", threadId);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        ForumThread thread = new ForumThread(response.asObject());
        if (!profile.hasPermission("website.thread.lock"))
            return ErrorUtil.noPerms("You are not allowed to lock threads");

        JsonObject body = new JsonObject();
        body.addProperty("locked", !thread.isLocked());

        response = RequestHandler.put("forum/thread/%s", body, threadId);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        return new ModelAndView("redirect:/thread/" + threadId);
    }

    @PostMapping("/pin/{threadId}")
    public ModelAndView pin(HttpServletRequest request,
                            @PathVariable("threadId") String threadId) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/thread/" + threadId);

        if (!profile.hasPermission("website.thread.manage"))
            return ErrorUtil.noPerms("You are not allowed to pin threads");

        RequestResponse response = RequestHandler.get("forum/thread/%s", threadId);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        ForumThread thread = new ForumThread(response.asObject());

        JsonObject body = new JsonObject();
        body.addProperty("pinned", !thread.isPinned());

        response = RequestHandler.put("forum/thread/%s", body, threadId);
        if (!response.wasSuccessful())
            return ErrorUtil.create(response.getCode(), response.getErrorMessage());

        return new ModelAndView("redirect:/thread/" + threadId);
    }

}