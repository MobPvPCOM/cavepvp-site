package com.mobpvp.site.model.profile;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mobpvp.site.SiteApplication;
import com.mobpvp.site.model.profile.data.*;
import com.mobpvp.site.model.punishment.PunishmentModel;
import com.mobpvp.site.util.TimeUtils;
import com.mobpvp.site.util.uuid.UUIDHolder;
import lombok.Getter;
import com.mobpvp.site.model.RankModel;
import com.mobpvp.site.model.profile.data.*;
import com.mobpvp.site.model.forum.ForumThread;
import com.mobpvp.site.badge.BadgeModel;
import com.mobpvp.site.model.profile.log.LogModel;

import java.util.*;

@Getter
public class ProfileModel extends UUIDHolder {

    private final UUID uuid;
    private final String name;

    private final long firstJoin;
    private final long lastSeen;
    private final String lastServer;
    private final String currentServer;

    private final RankModel rank;

    private final PunishmentModel activeBan;
    private final PunishmentModel activeMute;

    private final List<StatsModel> stats = new ArrayList<>();
    private final List<ForumThread> threads = new ArrayList<>();
    private final List<FriendModel> friends = new ArrayList<>();
    private final List<CommentModel> comments = new ArrayList<>();
    private final Map<String, Boolean> permissions = new HashMap<>();

    private final List<LogModel> logs = new ArrayList<>();
    private final List<BadgeModel> badges = new ArrayList<>();


    private final Map<String, String> settings = new HashMap<>();

    public ProfileModel(JsonObject object) {
        this.uuid = UUID.fromString(object.get("uuid").getAsString());
        this.name = object.get("name").getAsString();
        this.firstJoin = object.get("firstLogin").getAsLong();

        this.lastSeen = object.has("lastSeen")
                ? object.get("lastSeen").getAsLong()
                : -1;

        this.lastServer = object.has("lastServer")
                ? object.get("lastServer").getAsString()
                : "N/A";

        this.currentServer = object.has("currentServer")
                ? object.get("currentServer").getAsString()
                : null;

        this.rank = new RankModel(object.get("rank").getAsJsonObject());

        this.activeBan = object.has("activeBan")
                ? new PunishmentModel(object.get("activeBan").getAsJsonObject())
                : null;

        this.activeMute = object.has("activeMute")
                ? new PunishmentModel(object.get("activeMute").getAsJsonObject())
                : null;

        if (object.has("effectivePermissions")) {
            JsonObject jsonObject = object.get("effectivePermissions").getAsJsonObject();
            for (String permission : jsonObject.keySet()) {
                if (!jsonObject.get(permission).getAsString().equals("true"))
                    continue;

                this.permissions.put(permission, true);
            }
        }

        if (object.has("logs"))
            for (JsonElement element : object.get("logs").getAsJsonArray())
                logs.add(new LogModel(element.getAsJsonObject()));

//        if (object.has("badges"))
//            for (JsonElement element : object.get("badges").getAsJsonArray()) {
//                BadgeModel badge = SiteApplication.INSTANCE
//                        .getBadgeHandler()
//                        .getBadge(element.getAsString());
//
//                if (badge != null)
//                    badges.add(badge);
//            }


        if (object.has("settings")) {
            JsonObject settingsObject = object.get("settings").getAsJsonObject();
            settingsObject.keySet().forEach(key -> settings.put(
                    key, settingsObject.get(key).getAsString()
            ));
        }

        if (object.has("stats")
                && object.has("comments")
                && object.has("threads")
                && object.has("friends"))
            loadProfileData(object);
    }

    private void loadProfileData(JsonObject object) {
        for (JsonElement element : object.get("stats").getAsJsonArray())
            stats.add(new StatsModel(element.getAsJsonObject()));

        for (JsonElement element : object.get("threads").getAsJsonArray())
            threads.add(new ForumThread(element.getAsJsonObject()));

        for (JsonElement element : object.get("friends").getAsJsonArray())
            friends.add(new FriendModel(element.getAsJsonObject()));

        for (JsonElement element : object.get("comments").getAsJsonArray())
            comments.add(new CommentModel(element.getAsJsonObject()));

        comments.sort(CommentModel.COMPARATOR);
    }


    public String getSocial(SocialModel social) {
        return settings.getOrDefault(social.getSettingName(), "");
    }

    public String formatSeenAgo() {
        return TimeUtils.formatTimeAgo(lastSeen);
    }

    public String formatFirstJoin() {
        return TimeUtils.formatCalendarString(firstJoin, false);
    }

    public boolean isOnline() {
        return currentServer != null;
    }

    public boolean hasPermission(String permission) {
        boolean superPerm = hasSuperPerm();
        if (permission.equals("*"))
            return superPerm;

        if (superPerm)
            return true;

        return permissions.getOrDefault(
                permission.toLowerCase(),
                false
        );
    }

    public boolean hasSuperPerm() {
        return permissions.containsKey("*") && permissions.get("*");
    }

    public boolean hasBadge(String id) {
        for (BadgeModel badge : badges) {
            if (badge.getId().equals(id))
                return true;
        }

        return false;
    }

    public List<SocialModel> getActiveSocials() {
        List<SocialModel> toReturn = new ArrayList<>();

        for (SocialModel value : SocialModel.values()) {
            if (!settings.containsKey(value.getSettingName()) || getSocial(value).isEmpty())
                continue;

            toReturn.add(value);
        }

        return toReturn;
    }

    public PrivacyModel getCommentStatus() {
        return PrivacyModel.valueOf(settings.getOrDefault(
                "COMMENT_STATUS",
                "EVERYONE"
        ));
    }

    public PrivacyModel getOnlineStatus() {
        return PrivacyModel.valueOf(settings.getOrDefault(
                "ONLINE_STATUS",
                "EVERYONE"
        ));
    }

    public boolean hasFriend(ProfileModel profile) {
        if (profile == null)
            return false;

        for (FriendModel friend : friends)
            if (friend.contains(profile.getUuid()))
                return true;

        return false;
    }

    public PunishmentModel getActiveBan() {
        if (activeBan == null || !activeBan.isActive())
            return null;

        return activeBan;
    }

    public PunishmentModel getActiveMute() {
        if (activeMute == null || !activeMute.isActive())
            return null;

        return activeMute;
    }
}