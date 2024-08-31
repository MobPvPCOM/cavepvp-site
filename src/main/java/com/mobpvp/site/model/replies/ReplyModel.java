package com.mobpvp.site.model.replies;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.util.TimeUtils;
import com.mobpvp.site.util.uuid.UUIDCache;
import com.mobpvp.site.util.uuid.UUIDHolder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @author alfie
 * @project site
 * @date 21/08/2024 / 19:04
 */

@EqualsAndHashCode(callSuper = true)
@RequiredArgsConstructor
@Data
public class ReplyModel extends UUIDHolder {

    private final UUID uuid;
    private final UUID author;
    private final String authorWebColor;
    private final String thread;
    private String comment;

    private long createdAt;
    private long lastEditedAt;

    private List<ReplyModel> replies = new ArrayList<>();

    public ReplyModel(JsonObject object) {
        this.uuid = UUID.fromString(object.get("uuid").getAsString());
        this.author = UUID.fromString(object.get("author").getAsString());
        this.thread = object.get("thread").getAsString();
        this.comment = object.get("comment").getAsString();
        this.createdAt = object.get("createdAt").getAsLong();
        this.authorWebColor = object.get("authorWebColor").getAsString();

        if (object.has("replies")) {
            for (JsonElement element : object.get("replies").getAsJsonArray())
                replies.add(new ReplyModel(element.getAsJsonObject()));
        }

        if (object.has("lastEditedAt"))
            this.lastEditedAt = object.get("lastEditedAt").getAsLong();

    }

    public String getAuthorName() {
        return UUIDCache.getName(author);
    }

    public String getPostedAgo() {
        return TimeUtils.formatTimeAgo(createdAt);
    }

    public boolean canDelete(ProfileModel profileModel) {
        if (profileModel == null)
            return false;

        return author.equals(profileModel.getUuid())
                || profileModel.hasPermission("website.reply.delete.*");
    }

}
