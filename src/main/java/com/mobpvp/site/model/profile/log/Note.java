package com.mobpvp.site.model.profile.log;

import com.google.gson.JsonObject;
import com.mobpvp.site.util.TimeUtils;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class Note {

    private UUID id;
    private UUID uuid;
    private String addedBy;
    private String note;
    private String addedOn;
    private long addedAt;

    private String addedByWebColor;
    private String addedByName;


    public Note(JsonObject object) {
        this.id = UUID.fromString(object.get("id").getAsString());
        this.uuid = UUID.fromString(object.get("uuid").getAsString());
        this.addedBy = object.get("addedBy").getAsString();
        this.note = object.get("note").getAsString();
        this.addedOn = object.get("addedOn").getAsString();
        this.addedAt = object.get("addedAt").getAsLong();

        this.addedByWebColor = object.get("addedByWebColor").getAsString();
        this.addedByName = object.get("addedByName").getAsString();
    }


    public String getAddedAgo() {
        return TimeUtils.formatTimeAgo(this.addedAt);
    }


}
