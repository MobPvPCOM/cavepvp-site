package com.mobpvp.site.config;

import com.mobpvp.site.SiteConstant;
import com.mobpvp.site.model.PopupModel;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.util.SessionUtil;
import org.jetbrains.annotations.NotNull;
import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class SiteInterceptHandler implements HandlerInterceptor {

    private static final ScheduledExecutorService EXECUTOR
            = Executors.newSingleThreadScheduledExecutor();

    private static final Map<HttpSession, String> ERROR_MAP = new HashMap<>();
    private static final Map<HttpSession, String> SUCCESS_MAP = new HashMap<>();

    @Override
    public boolean preHandle(@NotNull HttpServletRequest request,
                             @NotNull HttpServletResponse response,
                             @NotNull Object handler) throws Exception {
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(@NotNull HttpServletRequest request,
                           @NotNull HttpServletResponse response,
                           @NotNull Object handler,
                           ModelAndView modelAndView) throws IOException {
        if (modelAndView == null)
            return;

        ModelMap modelMap = modelAndView.getModelMap();
        ProfileModel profile = SessionUtil.getProfile(request);

        HttpSession session = request.getSession();
        String errorMessage = (String) session.getAttribute("error_message");
        String successMessage = (String) session.getAttribute("success_message");

        if (errorMessage != null) {
            ERROR_MAP.put(session, errorMessage);
            session.removeAttribute("error_message");

            EXECUTOR.schedule(() -> {
                ERROR_MAP.remove(session);
            }, 3, TimeUnit.SECONDS);
        }

        if (successMessage != null) {
            SUCCESS_MAP.put(session, successMessage);
            session.removeAttribute("success_message");

            EXECUTOR.schedule(() -> {
                SUCCESS_MAP.remove(session);
            }, 3, TimeUnit.SECONDS);
        }

        if (SUCCESS_MAP.containsKey(session)) {
            String message = SUCCESS_MAP.get(session);
            modelAndView.addObject("successMessage", new PopupModel(message));
        }

        if (ERROR_MAP.containsKey(session)) {
            String message = ERROR_MAP.get(session);
            modelAndView.addObject("errorMessage", new PopupModel(message));
        }

        if (profile != null)
            modelAndView.addObject("sessionProfile", profile);

        if (SiteConstant. MAINTENANCE_MODE
                && !request.getRequestURI().equals("/maintenance")
                && !request.getRequestURI().equals("/login")
                && (profile == null
                || (profile != null && !profile.hasPermission("website.maintenance.bypass"))))
            response.sendRedirect("/maintenance");

        if (modelMap.containsAttribute("accessPermission")) {
            String permission = (String) modelMap.get("accessPermission");

            if (profile == null) {
                response.sendRedirect("/login");
                return;
            }

            if (!profile.hasPermission(permission)) {
                // todo display no perms page
            }
        }

    }
}