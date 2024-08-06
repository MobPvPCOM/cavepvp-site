package com.mobpvp.site.model.profile.data;

import com.google.gson.JsonObject;
import com.google.gson.annotations.SerializedName;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.util.TimeUtils;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Comparator;
import java.util.UUID;

@Data
@AllArgsConstructor
public class CommentModel {

    public static final Comparator<CommentModel> COMPARATOR
            = (o1, o2) -> (int) (o2.getAddedAt() - o1.getAddedAt());

    @SerializedName("_id")
    private final UUID uuid;
    private final UUID profile;
    private final UUID author;
    private final String content;
    private final long addedAt;

    private final String authorName;
    private final String authorWebColor;

    public CommentModel(JsonObject object) {
        this(
                UUID.fromString(object.get("_id").getAsString()),
                UUID.fromString(object.get("profile").getAsString()),
                UUID.fromString(object.get("author").getAsString()),
                object.get("comment").getAsString(),
                object.get("addedAt").getAsLong(),
                object.get("authorName").getAsString(),
                object.get("authorWebColor").getAsString()
        );
    }

    public String getCommentedAgo() {
        return TimeUtils.formatTimeAgo(addedAt);
    }

    public boolean canDelete(ProfileModel profile) {
        if (profile == null)
            return false;

        return profile.getUuid().equals(this.profile)
                || profile.getUuid().equals(this.author)
                || profile.hasPermission("website.comment.delete");
    }

}