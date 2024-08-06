package com.mobpvp.site.model.profile.data;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class StatsModel {

    private final String serverName;
    private final Map<String, String> metadata = new HashMap<>();

    public StatsModel(JsonObject object) {
        this.serverName = object.get("name").getAsString();

        for (JsonElement element : object.get("stats").getAsJsonArray()) {
            JsonObject statObject = element.getAsJsonObject();
            metadata.put(
                    statObject.get("name").getAsString(),
                    statObject.get("value").getAsString()
            );
        }
    }

}