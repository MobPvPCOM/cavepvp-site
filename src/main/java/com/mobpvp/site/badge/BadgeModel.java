package com.mobpvp.site.badge;

import com.google.gson.JsonObject;
import com.mobpvp.site.model.profile.ProfileModel;
import lombok.Data;
import com.mobpvp.site.util.configuration.ConfigurationHandler;

@Data
public class BadgeModel {

    private String id = "badge-id";
    private String name = "badge-name";
    private String description = "badge-description";
    private String icon = "badge-icon.png";
    private Class<?> clazz = getClass();

    public boolean canApply(ProfileModel profile) {
        return profile.hasBadge(id);
    }

    public JsonObject toJson() {
        return ConfigurationHandler.GSON.toJsonTree(this).getAsJsonObject();
    }

}