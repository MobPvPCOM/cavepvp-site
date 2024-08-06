package com.mobpvp.site.badge.defaults;

import com.mobpvp.site.badge.BadgeModel;
import com.mobpvp.site.model.profile.ProfileModel;

public class StaffBadgeModel extends BadgeModel {

    public StaffBadgeModel() {
        setId("staff");
        setName("Staff Member");
        setDescription("This user is a staff member.");
        setIcon("staff.png");
        setClazz(getClass());
    }

    @Override
    public boolean canApply(ProfileModel profile) {
        return profile.getRank().getWeight() >= 110;
    }

}