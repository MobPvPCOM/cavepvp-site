package com.mobpvp.site.config.logout;

import lombok.SneakyThrows;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SiteLogoutHandler implements LogoutHandler {

    @SneakyThrows
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String targetUrl = determineTargetUrl(request);
        response.sendRedirect(targetUrl);
    }

    private String determineTargetUrl(HttpServletRequest request) {
        String originalUrl = (String) request.getSession().getAttribute("originalUrl");
        return originalUrl != null ? originalUrl : "/";
    }

}