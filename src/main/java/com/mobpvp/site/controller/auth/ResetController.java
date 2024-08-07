package com.mobpvp.site.controller.auth;

import com.google.gson.JsonObject;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.mobpvp.site.util.PopupUtil;
import com.mobpvp.site.util.SessionUtil;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import com.mobpvp.site.util.password.result.PasswordResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ResetController {

    @Autowired
    private BCryptPasswordEncoder encoder;

    @RequestMapping("/reset-password")
    public ModelAndView reset(HttpServletRequest request,
                              @RequestParam(name = "token", required = false) String token) {
        if (SessionUtil.getProfile(request) != null)
            return new ModelAndView("redirect:/");

        if (token == null)
            return new ModelAndView("auth/reset-password");

        ModelAndView view = new ModelAndView("auth/reset-password-completion");
        view.addObject("token", token);
        return view;
    }

    @PostMapping("/reset-confirm/{token}")
    public ModelAndView confirm(HttpServletRequest request,
                                @PathVariable(name = "token") String token,
                                @RequestParam(name = "newPassword") String newPassword,
                                @RequestParam(name = "confirmNewPassword") String confirmNewPassword) {
        if (!newPassword.equals(confirmNewPassword)) {
            PopupUtil.error(request.getSession(), "Passwords do not match.");
            return new ModelAndView("redirect:/reset-password?token=" + token);
        }

        PasswordResult result = AuthController.VALIDATION.validate(newPassword);
        if (!result.isValid()) {
            PopupUtil.error(request.getSession(), result.getMessage());
            return new ModelAndView("redirect:/reset-password?token=" + token);
        }

        JsonObject body = new JsonObject();
        body.addProperty("token", token);
        body.addProperty("password", encoder.encode(newPassword));

        RequestResponse response = RequestHandler.post(
                "forum/account/resetPassword/%s",
                body, token
        );

        if (!response.wasSuccessful()) {
            PopupUtil.error(request.getSession(), response);
            return new ModelAndView("redirect:/reset-password?token=" + token);
        }

        PopupUtil.success(request.getSession(), "Your password has been reset.");
        return new ModelAndView("redirect:/login");
    }

    @PostMapping("/reset-password")
    public ModelAndView postReset(HttpServletRequest request, @RequestParam(name = "email") String email) {
        if (SessionUtil.getProfile(request) != null)
            return new ModelAndView("redirect:/");

        JsonObject body = new JsonObject();
        body.addProperty("email", email);

        RequestResponse response = RequestHandler.post("forum/account/sendResetPassword", body);
        if (!response.wasSuccessful()) {
            PopupUtil.error(request.getSession(), response);
            return new ModelAndView("redirect:/reset-password");
        }

        PopupUtil.success(request.getSession(), "An email has been sent with instructions on how to reset your password.");
        return new ModelAndView("redirect:/login");
    }

}