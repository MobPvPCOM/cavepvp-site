package com.mobpvp.site.config.badge;

import com.mobpvp.site.badge.defaults.StaffBadgeModel;
import lombok.Data;
import com.mobpvp.site.badge.BadgeModel;
import com.mobpvp.site.badge.defaults.*;
import com.mobpvp.site.util.configuration.SiteConfiguration;

import java.util.List;

@Data
public class SiteBadgeConfig implements SiteConfiguration {

    private List<BadgeModel> badges = List.of(
            new BadgeModel(),
            new StaffBadgeModel()
    );

}