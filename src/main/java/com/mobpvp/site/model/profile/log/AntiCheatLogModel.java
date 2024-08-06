package com.mobpvp.site.model.profile.log;

import com.google.gson.JsonObject;
import com.mobpvp.site.util.TimeUtils;
import lombok.Data;

import java.util.UUID;

@Data
public class AntiCheatLogModel {

    private final UUID id = UUID.randomUUID();

    private final UUID uuid;
    private final long timestamp;
    private final String check;
    private final String server;
    private final double banVl;
    private final double violation;
    private final JsonObject details;

    public AntiCheatLogModel(JsonObject object) {
        this.uuid = UUID.fromString(object.get("uuid").getAsString());
        this.timestamp = object.get("timestamp").getAsLong();
        this.check = object.get("check").getAsString();
        this.server = object.get("server").getAsString();
        this.banVl = object.get("banVl").getAsDouble();
        this.violation = object.get("violation").getAsDouble();
        this.details = object.get("details").getAsJsonObject();
    }

    public String getTimestampAgo() {
        return TimeUtils.formatTimeAgo(timestamp);
    }

}