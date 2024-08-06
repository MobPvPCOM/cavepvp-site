package com.mobpvp.site.config.filter;

import org.jetbrains.annotations.NotNull;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class SiteUrlFilter extends OncePerRequestFilter {

    public static List<String> FILTERS = List.of(".css", ".js", ".png", ".jpg");

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request,
                                    @NotNull HttpServletResponse response,
                                    @NotNull FilterChain filterChain) throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        if (!requestURI.contains("/logout") && !containsFilter(requestURI))
            request.getSession().setAttribute(
                    "originalUrl",
                    requestURI
            );

        filterChain.doFilter(request, response);
    }

    public boolean containsFilter(String uri) {
        for (String filter : FILTERS)
            if (uri.contains(filter))
                return true;

        return false;
    }

}