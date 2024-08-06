package com.mobpvp.site.model.staff;

import com.google.gson.JsonObject;
import lombok.Data;

import java.util.UUID;

@Data
public class StaffMember {

    private final UUID uuid;
    private final String name;

    public StaffMember(JsonObject object) {
        this.uuid = UUID.fromString(object.get("uuid").getAsString());
        this.name = object.get("name").getAsString();
    }

}