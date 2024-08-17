package com.mobpvp.site.model;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class RankModel {

    private final UUID id;
    private final String name;
    private final String webColor;
    private final String prefix;
    private final String color;
    private final String chatColor;

    private final int weight;
    private final List<String> permissions = new ArrayList<>();

    public RankModel(JsonObject object) {
        this.id = UUID.fromString(object.get("uuid").getAsString());
        this.name = object.get("name").getAsString();
        this.prefix = object.get("prefix").getAsString();
        this.color = object.get("color").getAsString();
        this.chatColor	 = object.get("chatColor").getAsString();
        this.weight = object.get("weight").getAsInt();

        this.webColor = object.get("webColor").getAsString();

        for (JsonElement element : object.get("permissions").getAsJsonArray())
            permissions.add(element.getAsString());
    }

}