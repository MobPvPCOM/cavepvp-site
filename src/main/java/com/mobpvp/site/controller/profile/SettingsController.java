
package com.mobpvp.site.controller.profile;

import com.google.gson.JsonObject;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.ProfileCache;
import com.mobpvp.site.cache.impl.SessionCache;
import com.mobpvp.site.controller.auth.AuthController;
import com.mobpvp.site.model.account.ForumAccountModel;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.profile.data.PrivacyModel;
import com.mobpvp.site.model.profile.data.SocialModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import com.mobpvp.site.util.ErrorUtil;
import com.mobpvp.site.util.PopupUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.util.password.result.PasswordResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class SettingsController {

    public static final ProfileCache CACHE
            = CacheHandler.getCache(ProfileCache.class);

    public static final SessionCache SESSION_CACHE
            = CacheHandler.getCache(SessionCache.class);

    @Autowired
    private BCryptPasswordEncoder encoder;

    @RequestMapping("/settings")
    public ModelAndView settings(HttpServletRequest request) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/settings");


        ModelAndView view = new ModelAndView("profile/settings");
        view.addObject("socials", SocialModel.values());
        view.addObject("privacySettings", PrivacyModel.values());

        return view;
    }

    @PostMapping("/updateSocials")
    public ModelAndView updateSocials(HttpServletRequest request,
                                      @RequestParam("YOUTUBE") String youtube,
                                      @RequestParam("TWITTER") String twitter,
                                      @RequestParam("TWITCH") String twitch,
                                      @RequestParam("GITHUB") String github,
                                      @RequestParam("TELEGRAM") String telegram,
                                      @RequestParam("DISCORD") String discord) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/settings");

        JsonObject body = new JsonObject();
        body.addProperty(SocialModel.YOUTUBE.getSettingName(), youtube.trim());
        body.addProperty(SocialModel.TWITTER.getSettingName(), twitter.trim());
        body.addProperty(SocialModel.TWITCH.getSettingName(), twitch.trim());
        body.addProperty(SocialModel.GITHUB.getSettingName(), github.trim());
        body.addProperty(SocialModel.TELEGRAM.getSettingName(), telegram.trim());
        body.addProperty(SocialModel.DISCORD.getSettingName(), discord.trim());

        RequestResponse response = RequestHandler.put("forum/account/setting/%s", body, profile.getUuid().toString());
        if (!response.wasSuccessful())
            return ErrorUtil.create(response);

        ForumAccountModel accountModel = new ForumAccountModel(response.asObject());

        profile.getSettings().clear();
        profile.getSettings().putAll(accountModel.getSettings());

        CACHE.update(profile);
        SESSION_CACHE.update(profile);

        return new ModelAndView("redirect:/settings");
    }

    @PostMapping("/changePassword")
    public ModelAndView changePassword(HttpServletRequest request,
                                       @RequestParam("currentPassword") String currentPassword,
                                       @RequestParam("newPassword") String newPassword,
                                       @RequestParam("confirmNewPassword") String confirmedPassword) {
        ProfileModel profile = SessionUtil.getProfile(request);
        if (profile == null)
            return ErrorUtil.loginRedirect("settings");

        ModelAndView modelAndView = new ModelAndView("redirect:/settings");

        if (!newPassword.equals(confirmedPassword)) {
            request.getSession().setAttribute("error_message", "Your new passwords don't match!");
            return modelAndView;
        }

        PasswordResult result = AuthController.VALIDATION.validate(newPassword);
        if (!result.isValid()) {
            request.getSession().setAttribute("error_message", result.getMessage());
            return modelAndView;
        }

        RequestResponse response = RequestHandler.get("forum/account/login/%s", profile.getName());
        if (!response.wasSuccessful()) {
            PopupUtil.error(request.getSession(), response.getCode(), response.getErrorMessage());
            return modelAndView;
        }

        RequestResponse responsePasssword = RequestHandler.get("forum/account/login/%s?password=%s",
                profile.getName(), currentPassword
        );

        if (!responsePasssword.wasSuccessful()) {
            PopupUtil.error(request.getSession(), responsePasssword.getCode(), responsePasssword.getErrorMessage());
            return modelAndView;
        }

        JsonObject object = responsePasssword.asObject();

        if (!object.has("passwordCorrect") || !object.get("passwordCorrect").getAsBoolean()) {
            request.getSession().setAttribute("error_message", "Your current password is incorrect.");
            return modelAndView;
        }

        JsonObject body = new JsonObject();
        body.addProperty("currentPassword", currentPassword);
        body.addProperty("password", newPassword);

        response = RequestHandler.put(
                "forum/account/password/%s",
                body, profile.getUuid().toString()
        );

        if (response.wasSuccessful()) {
            PopupUtil.success(request.getSession(), "Your password has been changed.");
            return modelAndView;
        }

        request.getSession().setAttribute("error_message", response.getCode() == 403
                && response.getResponse() != null
                && response.asObject().has("invalidPassword")
                ? "Your current password is incorrect."
                : response.getErrorMessage());

        return modelAndView;
    }

    @PostMapping("/updatePrivacySettings")
    public ModelAndView updatePrivacy(HttpServletRequest request,
                                      @RequestParam("commentStatus") String commentStatus,
                                      @RequestParam("onlineStatus") String onlineStatus,
                                      @RequestParam("staffPageStatus") String staffPageStatus) {
        ProfileModel profile = SessionUtil.getProfile(request);

        if (profile == null)
            return ErrorUtil.loginRedirect("/settings");

        if (PrivacyModel.get(commentStatus) == null
                || PrivacyModel.get(onlineStatus) == null) {
            PopupUtil.error(request.getSession(), "Invalid privacy settings.");
            return new ModelAndView("redirect:/settings");
        }

        JsonObject body = new JsonObject();
        body.addProperty("COMMENT_STATUS", commentStatus);
        body.addProperty("ONLINE_STATUS", onlineStatus);
        body.addProperty("STAFF_PAGE_STATUS", staffPageStatus);

        RequestResponse response = RequestHandler.put(
                "forum/account/setting/%s",
                body,
                profile.getUuid().toString()
        );

        if (response.wasSuccessful()) {
            ForumAccountModel accountModel = new ForumAccountModel(response.asObject());

            profile.getSettings().clear();
            profile.getSettings().putAll(accountModel.getSettings());

            CACHE.update(profile);
            SESSION_CACHE.update(profile);
        } else {
            PopupUtil.error(request.getSession(), response);
        }

        return new ModelAndView("redirect:/settings");
    }

}