package com.mobpvp.site.model.punishment;

import com.google.gson.JsonObject;
import com.mobpvp.site.util.TimeUtils;
import com.mobpvp.site.util.uuid.UUIDCache;
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

    private final String removerByName;
    private final String removerByWebColor;

    public PunishmentModel(JsonObject object) {
        this.id = UUID.fromString(object.get("id").getAsString());
        this.uuid = UUID.fromString(object.get("uuid").getAsString());
        this.type = PunishmentType.valueOf(object.get("punishmentType").getAsString());

        this.duration = object.get("duration").getAsLong();

        this.punishedBy = object.get("punishedBy").getAsString();
        this.punishedAt = object.get("punishedAt").getAsLong();

        this.punishedReason = object.get("punishedReason").getAsString();
        this.template = (object.has("template") ? object.get("template").getAsString() : null);

        this.serverType = object.get("punishedServerType").getAsString();
        this.server = object.get("punishedServer").getAsString();

        this.removed = object.get("removed").getAsBoolean();
        this.removedBy = object.get("removedBy").getAsString();
        this.removedAt = object.get("removedAt").getAsLong();
        this.removedReason = object.get("removedReason").getAsString();

        if (object.has("punishedByName"))
            this.punishedByName = object.get("punishedByName").getAsString();
        else this.punishedByName = UUIDCache.getName(UUID.fromString(punishedBy));

        if (object.has("punishedByWebColor"))
            this.punishedByWebColor = object.get("punishedByWebColor").getAsString();
        else this.punishedByWebColor = "#212529";


        if (object.has("removerByName"))
            this.removerByName = object.get("removerByName").getAsString();
        else this.removerByName = (removedBy.equals("N/A") ? null : UUIDCache.getName(UUID.fromString(removedBy)));

        if (object.has("removerByWebColor"))
            this.removerByWebColor = object.get("removerByWebColor").getAsString();
        else this.removerByWebColor = "#212529";
    }

    public String getPunishedAgo() {
        return TimeUtils.formatTimeAgo(punishedAt);
    }

    public String getRemovedAgo() {
        return TimeUtils.formatTimeAgo(removedAt);
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

    public boolean isRemoved() {
        return !this.removedBy.equals("N/A");
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
