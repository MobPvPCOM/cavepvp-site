package com.mobpvp.site.model.profile.data;

import com.mobpvp.site.model.profile.ProfileModel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PrivacyModel {

    EVERYONE("Everyone"),
    FRIENDS("Friends"),
    NOBODY("Nobody");

    private final String name;

    public boolean canInteract(ProfileModel profile, ProfileModel target) {
        if (target != null && profile.getUuid().equals(target.getUuid()))
            return true;

        if (this == EVERYONE)
            return true;

        if (this == NOBODY)
            return false;

        return target != null && profile.hasFriend(target);
    }

    public static PrivacyModel get(String name) {
        for (PrivacyModel model : values())
            if (model.getName().equalsIgnoreCase(name))
                return model;

        return null;
    }

}