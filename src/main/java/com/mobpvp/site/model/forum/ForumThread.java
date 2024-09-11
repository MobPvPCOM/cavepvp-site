package com.mobpvp.site.model.forum;

import com.google.gson.JsonObject;
import com.mobpvp.site.SiteApplication;
import com.mobpvp.site.SiteConstant;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.ReplyCache;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.replies.ReplyModel;
import com.mobpvp.site.request.RequestResponse;
import com.mobpvp.site.util.TimeUtils;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class ForumThread {

    public static final ReplyCache REPLY_CACHE = CacheHandler.getCache(ReplyCache.class);

    private final String id;

    private String title;
    private String body;

    private String forum;
    private String forumName;
    private UUID author;
    private String authorName;
    private String authorWebColor;
    private long createdAt;

    private UUID lastEditedBy;
    private long lastEditedAt;

    private long lastReplyAt;

    private boolean pinned;
    private boolean locked;

    private String parentThreadId;
    private String forumPermission;

    private String imageUrl;
    private List<UUID> seenBy = new ArrayList<>();

    public ForumThread(JsonObject object) {
        this.id = object.get("id").getAsString();
        this.title = object.get("title").getAsString();
        this.body = object.get("body").getAsString();

        if (object.has("forum"))
            this.forum = object.get("forum").getAsString();

        if (object.has("forumName"))
            this.forumName = object.get("forumName").getAsString();

        this.author = UUID.fromString(object.get("author").getAsString());
        this.authorName = object.get("authorName").getAsString();
        this.authorWebColor = object.get("authorWebColor").getAsString();
        this.createdAt = object.get("createdAt").getAsLong();

        if (object.has("lastEditedBy"))
            this.lastEditedBy = UUID.fromString(object.get("lastEditedBy").getAsString());

        if (object.has("forumPermission"))
            this.forumPermission = object.get("forumPermission").getAsString();

        this.lastEditedAt = object.get("lastEditedAt").getAsLong();
        this.lastReplyAt = object.get("lastReplyAt").getAsLong();
        this.pinned = object.get("pinned").getAsBoolean();
        this.locked = object.get("locked").getAsBoolean();

        this.imageUrl = object.has("imageUrl")
                ? object.get("imageUrl").getAsString() : "";

        if (object.has("parentThreadId"))
            this.parentThreadId = object.get("parentThreadId").getAsString();

        if (object.has("seenBy"))
            object.get("seenBy").getAsJsonArray().forEach(element ->
                    seenBy.add(UUID.fromString(element.getAsString())));
    }

    public ReplyModel getLastReply() {
        List<ReplyModel> replies = this.getReplies();
        if (replies.isEmpty())
            return null;

        return replies.get(0);
    }

    public List<ReplyModel> getReplies() {
        List<ReplyModel> replies = new ArrayList<>();

        for (ReplyModel replyModel : REPLY_CACHE.getCachedData()) {
            if (replyModel.getThread().equals(id))
                replies.add(replyModel);
        }

        return replies;
    }

    public String getFormattedForum() {
        return forumName.replace(" ", "-").toLowerCase();
    }

    public String getLastReplyAgo() {
        if (lastReplyAt == -1)
            return "Never";

        return TimeUtils.formatTimeAgo(lastReplyAt);
    }

    public String getLastEditedAgo() {
        if (lastEditedAt == -1)
            return "Never";

        return TimeUtils.formatTimeAgo(lastEditedAt);
    }

    public String getPostedAgo() {
        return TimeUtils.formatTimeAgo(createdAt);
    }

    public boolean canDelete(ProfileModel profileModel) {
        if (profileModel == null)
            return false;

        return author.equals(profileModel.getUuid())
                || profileModel.hasPermission("website.thread.delete.*");
    }

    public boolean canEdit(ProfileModel profileModel) {
        if (profileModel == null)
            return false;

        return author.equals(profileModel.getUuid())
                || profileModel.hasPermission("website.thread.edit.*")
                || profileModel.hasPermission("website.thread.edit." + id);
    }

    public boolean canLock(ProfileModel profile) {
        return profile != null && profile.hasPermission("website.thread.lock");
    }

    public boolean hasSeen(ProfileModel profile) {
        return seenBy.contains(profile.getUuid());
    }

    public String getContent() {
        String sanitizedHtml = SiteConstant.POLICY_FACTORY.sanitize(body);

        return SiteConstant.MARKDOWN_RENDERER.render(
                SiteConstant.MARKDOWN_PARSER.parse(sanitizedHtml)
        );
    }

}
