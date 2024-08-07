package com.mobpvp.site.model.account;

import com.google.gson.JsonObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ForumAccountModel {

    private UUID uuid;
    private String email;
    private String password;
    private String token;
    private Map<String, String> settings = new HashMap<>();

    public ForumAccountModel(JsonObject object) {
        this.uuid = UUID.fromString(object.get("uuid").getAsString());
        this.email = object.get("email").getAsString();
        this.token = object.has("token") ? object.get("token").getAsString() : null;
        this.password = object.has("password")
                ? object.get("password").getAsString() : null;

        JsonObject settingsObject = object.get("settings").getAsJsonObject();
        settingsObject.keySet().forEach(key -> settings.put(
                key, settingsObject.get(key).getAsString()
        ));
    }

}