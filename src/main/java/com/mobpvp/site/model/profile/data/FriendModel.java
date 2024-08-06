package com.mobpvp.site.model.profile.data;

import com.google.gson.JsonObject;
import lombok.Data;

import java.util.UUID;

@Data
public class FriendModel {

    private final UUID uuidA;
    private final UUID uuidB;

    private final String nameA;
    private final String nameB;

    private final long acceptedAt;

    public FriendModel(JsonObject object) {
        this.uuidA = UUID.fromString(object.get("uuidA").getAsString());
        this.uuidB = UUID.fromString(object.get("uuidB").getAsString());

        this.nameA = object.has("nameA")
                ? object.get("nameA").getAsString()
                : "N/A";

        this.nameB = object.has("nameB")
                ? object.get("nameB").getAsString()
                : "N/A";

        this.acceptedAt = object.get("acceptedAt").getAsLong();
    }

    public String getOtherName(UUID uuid) {
        return uuid.equals(uuidA) ? nameB : nameA;
    }

    public boolean contains(UUID uuid) {
        return uuid.equals(uuidA) || uuid.equals(uuidB);
    }

}