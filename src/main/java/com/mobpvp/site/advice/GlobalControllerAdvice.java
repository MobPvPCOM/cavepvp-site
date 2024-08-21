package com.mobpvp.site.advice;

import com.mobpvp.site.model.leaderboard.LeaderboardModel;
import com.mobpvp.site.advice.item.NavItem;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.LeaderboardCache;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalControllerAdvice {

    public static final List<NavItem> NAV_ITEMS = List.of(
            new NavItem("Home", "/"),
            new NavItem("Forums", "/forums"),
            new NavItem("Leaderboard", "/leaderboard"),
            new NavItem("Support", "/support"),
            new NavItem("Staff", "/staff"),
            new NavItem("Store", "https://store.mobpvp.com")
    );

    @ModelAttribute("navItems")
    public List<NavItem> getNavItems() {
        return NAV_ITEMS;
    }

    @ModelAttribute("leaderboardNavItems")
    public List<NavItem> getLeaderboardNavItems() {
        List<NavItem> items = new ArrayList<>();
        List<LeaderboardModel> cachedData = CacheHandler.getCache(
                LeaderboardCache.class
        ).getCachedData();

        for (LeaderboardModel cachedDatum : cachedData) {
            String name = cachedDatum.getName();
            List<String> acceptedUrls = new ArrayList<>();

            acceptedUrls.add("/leaderboard/" + name);

            if (cachedDatum.getName().equalsIgnoreCase("mini"))
                acceptedUrls.add("/leaderboard");

            items.add(new NavItem(name, acceptedUrls));
        }

        return items;
    }

}