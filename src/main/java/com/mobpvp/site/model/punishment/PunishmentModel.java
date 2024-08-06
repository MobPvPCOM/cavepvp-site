package com.mobpvp.site.model.punishment;

import com.google.gson.JsonObject;
import com.mobpvp.site.util.TimeUtils;
import lombok.Getter;

import java.util.Comparator;
import java.util.UUID;

@Getter
public class PunishmentModel {

    public static final Comparator<PunishmentModel> COMPARATOR
            = (o1, o2) -> (int) (o2.getPunishedAt() - o1.getPunishedAt());

    private final UUID id;
    private final UUID uuid;
    private final PunishmentType type;

    private final long duration;

    private final String punishedBy;
    private final long punishedAt;

    private final String punishedReason;
    private final String template;

    private final String serverType;
    private final String server;

    private final boolean removed;
    private final String removedBy;
    private final long removedAt;
    private final String removedReason;

    private final String punishedByName;
    private final String punishedByWebColor;

    public PunishmentModel(JsonObject object) {
        this.id = UUID.fromString(object.get("_id").getAsString());
        this.uuid = UUID.fromString(object.get("uuid").getAsString());
        this.type = PunishmentType.valueOf(object.get("type").getAsString());

        this.duration = object.get("duration").getAsLong();

        this.punishedBy = object.get("punishedBy").getAsString();
        this.punishedAt = object.get("punishedAt").getAsLong();

        this.punishedReason = object.get("punishedReason").getAsString();
        this.template = object.get("template").getAsString();

        this.serverType = object.get("serverType").getAsString();
        this.server = object.get("server").getAsString();

        this.removed = object.get("removed").getAsBoolean();
        this.removedBy = object.get("removedBy").getAsString();
        this.removedAt = object.get("removedAt").getAsLong();
        this.removedReason = object.get("removedReason").getAsString();

        this.punishedByName = object.get("punishedByName").getAsString();
        this.punishedByWebColor = object.get("punishedByWebColor").getAsString();
    }

    public String getPunishedAgo() {
        return TimeUtils.formatTimeAgo(punishedAt);
    }

    public String formatDuration() {
        return TimeUtils.formatDetailed(duration);
    }

    public String formatStatus() {
        if (removed)
            return "Removed";

        if (isActive())
            return "Active";

        return "Expired";
    }

    public long getEnd() {
        return duration == -1 ? -1 : punishedAt + duration;
    }

    public boolean isActive() {
        if (removed)
            return false;

        long end = getEnd();
        if (end == -1)
            return true;

        return end >= System.currentTimeMillis();
    }

}
