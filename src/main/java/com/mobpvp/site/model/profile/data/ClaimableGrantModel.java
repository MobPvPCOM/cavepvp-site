package com.mobpvp.site.model.profile.data;

import com.google.gson.JsonObject;
import com.google.gson.annotations.SerializedName;
import com.mobpvp.site.util.TimeUtils;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Comparator;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ClaimableGrantModel {

    public static final Comparator<ClaimableGrantModel> COMPARATOR
            = (o1, o2) -> o2.getRankWeight() - o1.getRankWeight();

    @SerializedName("_id")
    private final UUID id;

    private final UUID uuid;
    private final UUID rank;
    private final UUID oldRankId;
    private final String oldRankName;
    private final String oldRankColor;

    private final long duration;
    private final int rankWeight;

    private final String rankName;
    private final String rankColor;
    private final String rankWebColor;
    private final String oldRankWebColor;

    public ClaimableGrantModel(JsonObject object) {
        this.id = UUID.fromString(object.get("_id").getAsString());
        this.uuid = UUID.fromString(object.get("uuid").getAsString());
        this.rank = UUID.fromString(object.get("rank").getAsString());
        this.oldRankId = UUID.fromString(object.get("oldRankId").getAsString());
        this.oldRankName = object.get("oldRankName").getAsString();
        this.oldRankColor = object.get("oldRankColor").getAsString();
        this.duration = object.get("duration").getAsLong();
        this.rankName = object.has("rankName")
                ? object.get("rankName").getAsString() : "N/A";

        this.rankColor = object.has("rankColor")
                ? object.get("rankColor").getAsString() : "#FFFFFF";

        this.rankWebColor = object.has("rankWebColor")
                ? object.get("rankWebColor").getAsString() : "#FFFFFF";

        this.rankWeight = object.has("rankWeight")
                ? object.get("rankWeight").getAsInt() : 0;

        this.oldRankWebColor = object.get("oldRankWebColor").getAsString();
    }

    public String getFormattedDuration() {
        if (duration == -1)
            return "Permanent";

        return TimeUtils.formatDetailed(duration);
    }

}