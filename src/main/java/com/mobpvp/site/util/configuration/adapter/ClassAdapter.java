package com.mobpvp.site.util.configuration.adapter;

import com.google.gson.*;

import java.lang.reflect.Type;

/**
 * A {@link JsonSerializer}, {@link JsonDeserializer} to properly read and write {@link Class}s to and from json.
 */
public class ClassAdapter implements JsonSerializer<Class<?>>, JsonDeserializer<Class<?>> {

    @Override
    public Class<?> deserialize(JsonElement element, Type type, JsonDeserializationContext context) throws JsonParseException {
        if (element == null || element.isJsonNull())
            return null;

        try {
            return Class.forName(element.getAsString());
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public JsonElement serialize(Class<?> clazz, Type type, JsonSerializationContext context) {
        return clazz == null ? null : new JsonPrimitive(clazz.getName());
    }
}
