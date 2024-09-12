package com.mobpvp.site.util;

import com.mobpvp.site.request.RequestResponse;
import org.springframework.web.servlet.ModelAndView;

public class ErrorUtil {

    public static ModelAndView create(int code, String error) {
        ModelAndView view = new ModelAndView("error");

        view.addObject("status", code);
        view.addObject("error", error);

        return view;
    }

    public static ModelAndView create(RequestResponse response) {
        return create(
                response.getCode(),
                "API: " + response.getErrorMessage()
        );
    }

    public static ModelAndView loginRedirect(String redirect, Object... args) {
        if (redirect.startsWith("/"))
            redirect = redirect.substring(1);

        return new ModelAndView("redirect:/login?redirect=" + String.format(redirect, args));
    }

    public static ModelAndView noPerms(String message) {
        return create(403, message);
    }

}