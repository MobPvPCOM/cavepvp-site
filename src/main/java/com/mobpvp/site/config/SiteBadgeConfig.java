package com.mobpvp.site.config;

import com.mobpvp.site.badge.BadgeModel;
import com.mobpvp.site.badge.defaults.StaffBadgeModel;
import com.mobpvp.site.util.configuration.SiteConfiguration;
import lombok.Data;

import java.util.List;

@Data
public class SiteBadgeConfig implements SiteConfiguration {

    private List<BadgeModel> badges = List.of(
            new BadgeModel(),
            new StaffBadgeModel()
    );

}