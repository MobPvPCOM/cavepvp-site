package com.mobpvp.site.util;

import com.mobpvp.site.request.RequestResponse;

import javax.servlet.http.HttpSession;

public class PopupUtil {

    public static void error(HttpSession session, int code, String message) {
        session.setAttribute("error_message", "Error " + code + ": " + message);
    }

    public static void error(HttpSession session, String message) {
        session.setAttribute("error_message", message);
    }


    public static void error(HttpSession session, RequestResponse response) {
        error(session, response.getCode(), response.getErrorMessage());
    }

    public static void success(HttpSession session, String message) {
        session.setAttribute("success_message", message);
    }

}
