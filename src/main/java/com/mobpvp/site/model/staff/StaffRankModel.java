package com.mobpvp.site.model.staff;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mobpvp.site.cache.impl.ProfileCache;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class StaffRankModel {

    private final UUID uuid;
    private final String name;
    private final int weight;
    private final String webColor;
    private final List<StaffMember> members = new ArrayList<>();

    public StaffRankModel(JsonObject object) {
        this.uuid = UUID.fromString(object.get("uuid").getAsString());
        this.name = object.get("name").getAsString();
        this.weight = object.get("weight").getAsInt();
        this.webColor = object.get("webColor").getAsString();

        for (JsonElement element : object.get("members").getAsJsonArray()) {
            StaffMember member = new StaffMember(element.getAsJsonObject());

            if (members.contains(member)) {
                continue;
            }



            members.add(member);
        }
    }

}