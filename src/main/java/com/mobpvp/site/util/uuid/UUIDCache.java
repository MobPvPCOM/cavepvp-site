package com.mobpvp.site.util.uuid;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import com.google.gson.JsonObject;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;

import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

public class UUIDCache {

    private static final LoadingCache<String, UUID> NAME_UUID_CACHE = Caffeine.newBuilder()
            .expireAfterWrite(15L, TimeUnit.MINUTES)
            .build(name -> {
                RequestResponse response = RequestHandler.get("/uuid/%s", name);
                if (!response.wasSuccessful())
                    return null;

                JsonObject object = response.asObject();
                return UUID.fromString(object.get("uuid").getAsString());
            });

    private static final LoadingCache<UUID, String> UUID_NAME_CACHE = Caffeine.newBuilder()
            .expireAfterWrite(15L, TimeUnit.MINUTES)
            .build(uuid -> {
                RequestResponse response = RequestHandler.get("/uuid/%s", uuid.toString());
                if (!response.wasSuccessful())
                    return null;

                JsonObject object = response.asObject();
                return object.get("name").getAsString();
            });

    private static final Pattern UUID_PATTERN = Pattern.compile("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[34][0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}");

    public static UUID getUuid(String name) {
        return NAME_UUID_CACHE.get(name);
    }

    public static String getName(UUID uuid) {
        return UUID_NAME_CACHE.get(uuid);
    }

    public static boolean isUuid(String input) {
        return UUID_PATTERN.matcher(input).matches();
    }

}
