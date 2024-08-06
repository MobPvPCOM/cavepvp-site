package com.mobpvp.site.config;

import com.mobpvp.site.util.SessionUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.UUID;

@Component
public class SiteAuthSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_OK);

        String redirect = null;
        if (request.getAttribute("redirect") != null)
            redirect = (String) request.getAttribute("redirect");

        HttpSession session = request.getSession(false);
        if (redirect == null && session != null && session.getAttribute("redirect") != null)
            redirect = (String) session.getAttribute("redirect");

        response.sendRedirect(redirect == null ? "/" : redirect);

        SessionUtil.storeSession(
                request,
                UUID.fromString(authentication.getName())
        );
    }
}
