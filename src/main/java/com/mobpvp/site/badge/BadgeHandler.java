package com.mobpvp.site.badge;

import com.mobpvp.site.SiteApplication;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BadgeHandler {

    private final Map<String, BadgeModel> badgeMap = new HashMap<>();

    public BadgeHandler() {
        SiteApplication.INSTANCE.getBadgeConfig().getBadges()
                .forEach(badgeModel -> badgeMap.put(badgeModel.getId(), badgeModel));
    }

    public BadgeModel getBadge(String id) {
        return badgeMap.get(id);
    }

    public List<BadgeModel> getBadges() {
        return SiteApplication.INSTANCE.getBadgeConfig().getBadges();
    }

}