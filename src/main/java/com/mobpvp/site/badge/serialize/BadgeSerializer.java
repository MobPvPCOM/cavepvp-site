package com.mobpvp.site.badge.serialize;

import com.google.gson.*;
import com.mobpvp.site.badge.BadgeModel;
import com.mobpvp.site.util.configuration.ConfigurationHandler;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class BadgeSerializer implements JsonSerializer<List<BadgeModel>>, JsonDeserializer<List<BadgeModel>> {

    @Override
    public JsonElement serialize(List<BadgeModel> badgeModels, Type type, JsonSerializationContext jsonSerializationContext) {
        JsonArray array = new JsonArray();

        badgeModels.forEach(badgeModel -> {
            JsonObject object = badgeModel.toJson();
            array.add(object);
        });

        return array;
    }

    @Override
    public List<BadgeModel> deserialize(JsonElement jsonElement, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
        if (jsonElement.isJsonNull() || !jsonElement.isJsonArray())
            return null;

        List<BadgeModel> badges = new ArrayList<>();
        JsonArray array = jsonElement.getAsJsonArray();

        try {
            for (JsonElement element : array) {
                JsonObject object = element.getAsJsonObject();
                Class<?> clazz = Class.forName(object.get("clazz").getAsString());

                badges.add((BadgeModel) ConfigurationHandler.GSON.fromJson(object, clazz));
            }
        } catch (ClassNotFoundException ignored) {
        }

        return badges;
    }
}