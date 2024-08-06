package com.mobpvp.site.model.support;

import com.google.gson.JsonObject;
import com.mobpvp.site.util.TimeUtils;
import com.mobpvp.site.util.uuid.UUIDCache;
import lombok.Data;

import java.util.UUID;

@Data
public class TicketReplyModel {

    private final String id;
    private final String body;
    private final UUID author;
    private final long createdAt;
    private final String parentTicketId;
    private final String authorName;
    private final String authorWebColor;

    public TicketReplyModel(JsonObject object) {
        this.id = object.get("id").getAsString();
        this.body = object.get("body").getAsString();
        this.author = UUID.fromString(object.get("author").getAsString());
        this.createdAt = object.get("createdAt").getAsLong();
        this.parentTicketId = object.get("parentTicketId").getAsString();

        this.authorName = object.has("authorName")
                ? object.get("authorName").getAsString() : UUIDCache.getName(author);

        this.authorWebColor = object.has("authorWebColor")
                ? object.get("authorWebColor").getAsString() : "#ffffff";
    }

    public String getPostedAgo() {
        return TimeUtils.formatTimeAgo(createdAt);
    }

    public String formatCreationDate() {
        return TimeUtils.formatCalendarString(createdAt, true);
    }

}