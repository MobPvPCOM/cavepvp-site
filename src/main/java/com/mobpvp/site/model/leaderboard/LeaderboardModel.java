package com.mobpvp.site.model.leaderboard;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class LeaderboardModel {

    private final String name;
    private final Map<String, List<LeaderboardEntryModel>> entries;

    public LeaderboardModel(JsonObject object) {
        this.name = object.get("name").getAsString();
        this.entries = new HashMap<>();

        for (JsonElement element : object.get("entries").getAsJsonArray()) {
            JsonObject entryObject = element.getAsJsonObject();
            List<LeaderboardEntryModel> entryModels = new ArrayList<>();

            for (JsonElement value : entryObject.get("values").getAsJsonArray())
                entryModels.add(new LeaderboardEntryModel(value.getAsJsonObject()));

            entries.put(entryObject.get("key").getAsString(), entryModels);
        }
    }

}