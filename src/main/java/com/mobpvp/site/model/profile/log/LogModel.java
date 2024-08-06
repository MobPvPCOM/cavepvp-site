package com.mobpvp.site.model.profile.log;

import com.google.gson.JsonObject;
import com.mobpvp.site.util.TimeUtils;
import com.mobpvp.site.util.uuid.UUIDCache;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Data
public class LogModel {

    private final UUID id = UUID.randomUUID();

    private final UUID addedBy;
    private final long addedAt;
    private final String server;
    private final String logAction;
    private final String logTextName;
    private final Map<String, Object> metadata = new HashMap<>();

    private final String addedByName;
    private final String addedByWebColor;

    public LogModel(JsonObject object) {
        this.addedBy = UUID.fromString(object.get("addedBy").getAsString());
        this.addedAt = object.get("addedAt").getAsLong();
        this.server = object.get("server").getAsString();
        this.logAction = object.get("action").getAsString();
        this.logTextName = object.get("textName").getAsString();

        this.addedByName = object.has("addedByName")
                ? object.get("addedByName").getAsString()
                : UUIDCache.getName(addedBy);

        this.addedByWebColor = object.has("addedByWebColor")
                ? object.get("addedByWebColor").getAsString()
                : "#ffffff";

        object.get("metadata").getAsJsonObject().entrySet().forEach(
                entry -> metadata.put(entry.getKey(), entry.getValue().getAsString())
        );
    }

    public String formatMetaKey(String key) {
        String s = key.substring(0, 1).toUpperCase() + key.substring(1);
        return s.replaceAll("([A-Z])", " $1");
    }

    public String formatMetaValue(String value) {
        if (UUIDCache.isUuid(value)) {
            UUID uuid = UUIDCache.getUuid(value);
            return uuid == null ? value : UUIDCache.getName(uuid);
        }

        return value;
    }

    public String getAddedAgo() {
        return TimeUtils.formatTimeAgo(addedAt);
    }

}