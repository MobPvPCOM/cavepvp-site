package com.mobpvp.site.model.profile;

import com.google.gson.JsonObject;
import com.mobpvp.site.util.TimeUtils;
import lombok.Data;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Data
public class NotificationModel {

    public static final Comparator<NotificationModel> COMPARATOR
            = Comparator.comparing(NotificationModel::isRead).reversed()
            .thenComparing(NotificationModel::getCreatedAt).reversed();

    private final UUID uuid;
    private final UUID target;
    private final long createdAt;
    private final String text;

    private final Map<String, String> placeholders = new HashMap<>();
    private boolean read;

    public NotificationModel(JsonObject object) {
        this.uuid = UUID.fromString(object.get("uuid").getAsString());
        this.target = UUID.fromString(object.get("target").getAsString());
        this.createdAt = object.get("createdAt").getAsLong();
        this.text = object.get("text").getAsString();
        this.read = object.get("read").getAsBoolean();

        object.get("placeholders").getAsJsonObject().entrySet().forEach(entry ->
                placeholders.put(entry.getKey(), entry.getValue().getAsString())
        );
    }

    public String getReplacedText() {
        String text = this.text;

        for (Map.Entry<String, String> entry : placeholders.entrySet())
            text = text.replace(entry.getKey(), entry.getValue());

        return text;
    }

    public String getTimeAgo() {
        return TimeUtils.formatTimeAgo(createdAt);
    }

}