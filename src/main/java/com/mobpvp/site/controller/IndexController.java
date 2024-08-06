package com.mobpvp.site.controller;

import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.AnnouncementCache;
import com.mobpvp.site.cache.impl.PlayerCountCache;
import com.mobpvp.site.model.forum.ForumThread;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class IndexController {

    public static final AnnouncementCache CACHE
            = CacheHandler.getCache(AnnouncementCache.class);

    public static final PlayerCountCache PLAYER_CACHE
            = CacheHandler.getCache(PlayerCountCache.class);

    @RequestMapping({"/", "home"})
    public ModelAndView showIndex(HttpServletRequest request) {
        ModelAndView view = new ModelAndView("index");
        List<ForumThread> announcements = new ArrayList<>(CACHE.getCachedData());

        view.addObject("playerCount", PLAYER_CACHE.getCachedData());

        if (!announcements.isEmpty()) {
            view.addObject("latestAnnouncement", announcements.get(0));
            announcements.remove(0);

            if (!announcements.isEmpty())
                view.addObject(
                        "announcements",
                        announcements.subList(0, announcements.size() == 1 ? 1 : 2)
                );
        }

        return view;
    }

}