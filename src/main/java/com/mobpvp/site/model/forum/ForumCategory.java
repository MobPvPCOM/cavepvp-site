package com.mobpvp.site.model.forum;

import com.google.gson.JsonObject;
import com.mobpvp.site.model.profile.ProfileModel;
import lombok.Data;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Data
public class ForumCategory {

    public static final Comparator<ForumCategory> CATEGORY_COMPARATOR
            = Comparator.comparing(ForumCategory::getWeight).reversed();

    private final String id;
    private String name;
    private int weight;
    private String permission = "";
    private final List<ForumModel> forums = new ArrayList<>();

    public ForumCategory(JsonObject object) {
        this.id = object.get("id").getAsString();
        this.name = object.get("name").getAsString();
        this.weight = object.get("weight").getAsInt();

        if (object.has("permission"))
            this.permission = object.get("permission").getAsString();

        if (object.has("forums"))
            object.get("forums").getAsJsonArray().forEach(element ->
                    forums.add(new ForumModel(element.getAsJsonObject())));
    }

    public String getUrlName() {
        return name.replace(" ", "-").toLowerCase();
    }

    public List<ForumModel> getFormattedForums(ProfileModel model) {
        if (forums.isEmpty())
            return forums;

        ArrayList<ForumModel> toReturn = new ArrayList<>(forums);
        toReturn.sort(Comparator.comparing(
                ForumModel::getWeight
        ).reversed());

        for (ForumModel forum : forums) {
            String forumPermission = forum.getPermission();
            if (forumPermission.isEmpty())
                continue;

            if (model == null || !model.hasPermission(forumPermission))
                toReturn.remove(forum);
        }

        return toReturn;
    }

    public boolean canPost(ProfileModel model) {
        return model != null && model.hasPermission("website.forum.post." + id.toLowerCase());
    }

    public boolean hasPermission(ProfileModel model) {
        if (model == null)
            return permission.isEmpty();

        return permission.isEmpty()
                || model.hasPermission(permission);
    }

}