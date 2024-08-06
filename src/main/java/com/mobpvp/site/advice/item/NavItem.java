package com.mobpvp.site.advice.item;

import lombok.Getter;
import com.mobpvp.site.model.profile.ProfileModel;

import java.util.List;

@Getter
public class NavItem {

    private final String label;
    private final List<String> urls;
    private final String permission;

    public NavItem(String label, List<String> urls) {
        this.label = label;
        this.urls = urls;
        this.permission = "";
    }

    public NavItem(String label, String url, String permission) {
        this.label = label;
        this.urls = List.of(url);
        this.permission = permission;
    }

    public NavItem(String label, String url) {
        this(label, url, "");
    }

    public boolean canView(ProfileModel profile) {
        if (permission == null || permission.isEmpty())
            return true;

        return profile != null && profile.hasPermission(permission);
    }

    public boolean matches(String url) {
        for (String s : urls) {
            if (s.equalsIgnoreCase(url))
                return true;
        }

        return false;
    }

}