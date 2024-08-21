package com.mobpvp.site.model;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.util.MinecraftTextUtils;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @author Moose1301
 * @date 8/17/2024
 */
@Data
public class TagModel {
    private final String name;
    private final String displayName;
    private final String displayNameHtml;


    public TagModel(JsonObject object) {
        this.name = object.get("name").getAsString();
        this.displayName = object.get("displayName").getAsString();
        this.displayNameHtml = MinecraftTextUtils.toHtml(this.displayName);
    }

    public String getDisplayNameFormatted() {
        return this.displayName.replace(MinecraftTextUtils.COLOR_CHAR, '&');
    }
    public String getDisplayNameHtml(ProfileModel model) {
        String formattedName = model.getRank().getPrefix() + model.getName();
        String formattedChat = MinecraftTextUtils.COLOR_CHAR + "7: " + model.getRank().getChatColor() + "Hello World";
        return MinecraftTextUtils.toHtml(formattedName + " " + this.displayNameHtml + formattedChat);
    }

}
