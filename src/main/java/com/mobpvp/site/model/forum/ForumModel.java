package com.mobpvp.site.model.forum;

import com.google.gson.JsonObject;
import com.mobpvp.site.model.profile.ProfileModel;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
public class ForumModel {

    private final String id;
    private String name;
    private String description;
    private int weight;
    private String permission;

    private boolean locked;

    private String category;
    private List<ForumThread> threads = new ArrayList<>();

    private ForumThread lastThread;
    private long threadAmount;

    private String categoryPermission;

    public ForumModel(JsonObject object) {
        this.id = object.get("id").getAsString();
        this.name = object.get("name").getAsString();
        this.description = object.get("description").getAsString();
        this.weight = object.get("weight").getAsInt();
        this.locked = object.get("locked").getAsBoolean();
        this.category = object.get("category").getAsString();

        if (object.has("permission"))
            this.permission = object.get("permission").getAsString();
        else this.permission = "";

        if (object.has("threads"))
            object.get("threads").getAsJsonArray().forEach(element ->
                    threads.add(new ForumThread(element.getAsJsonObject())));

        if (object.has("lastThread"))
            this.lastThread = new ForumThread(object.get("lastThread").getAsJsonObject());

        this.threadAmount = object.get("threadAmount").getAsLong();
        this.categoryPermission = object.has("categoryPermission")
                ? object.get("categoryPermission").getAsString() : "";

        threads.sort((o1, o2) -> {
            if (o1.isPinned() && !o2.isPinned())
                return 1;

            if (!o1.isPinned() && o2.isPinned())
                return -1;

            return (int) (o1.getCreatedAt() - o2.getCreatedAt());
        });

        Collections.reverse(threads);
    }

    public String getUrlName() {
        return name.replace(" ", "-").toLowerCase();
    }

    public boolean canPost(ProfileModel model) {
        if (model == null)
            return false;

        if (!locked)
            return true;

        return model.hasPermission("website.forum.post." + getUrlName());
    }

}
