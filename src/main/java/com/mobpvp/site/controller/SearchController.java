package com.mobpvp.site.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mobpvp.site.SiteConstant;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SearchController {

    @GetMapping("/search")
    @ResponseBody
    public String search(@RequestParam("query") String query) {
        RequestResponse response = RequestHandler.get("search?query=%s", query);
        JsonObject object = new JsonObject();
        JsonArray array = new JsonArray();

        if (response.wasSuccessful()) {
            for (JsonElement jsonElement : response.asArray()) {
                JsonObject userObject = jsonElement.getAsJsonObject();

                String name = userObject.get("name").getAsString();
                userObject.addProperty("link", "/u/" + name);
                userObject.addProperty("avatar", "https://mc-heads.net/avatar/" + name + "/32");

                array.add(userObject);
            }
        }

        object.add("users", array);
        return SiteConstant.GSON.toJson(object);
    }

}
