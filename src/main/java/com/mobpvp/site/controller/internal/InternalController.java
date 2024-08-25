package com.mobpvp.site.controller.internal;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mobpvp.site.SiteApplication;
import com.mobpvp.site.SiteConstant;
import com.mobpvp.site.server.ServerInfo;
import com.mobpvp.site.server.ServerState;
import com.mobpvp.site.server.packet.UpdateServerPacket;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Moose1301
 * @date 8/11/2024
 */

@RestController
public class InternalController {
    private static final String AUTH_KEY = "z46tR9ogDXkV0mXGB5CTFB5mvLWxrXrbv4R3gj51E1qJG0Pjglqwa1f3JWrZI7Mh";

    @PostMapping("/api/sync/vanic")
    public ResponseEntity<String> handle(HttpServletRequest request, @RequestBody String objectData) {
        JsonObject response = new JsonObject();
        if (request.getHeader("SyncAuth") == null) {
            return new ResponseEntity<>(SiteConstant.GSON.toJson(response), HttpStatus.NOT_FOUND);
        }
        String authKey = request.getHeader("SyncAuth");

        if (!authKey.equals(AUTH_KEY)) {
            return new ResponseEntity<>(SiteConstant.GSON.toJson(response), HttpStatus.NOT_FOUND);
        }
        JsonObject object = SiteConstant.GSON.fromJson(objectData, JsonObject.class);
        if (!object.has("online")) {
            return new ResponseEntity<>(SiteConstant.GSON.toJson(response), HttpStatus.NOT_FOUND);
        }
        int online = object.get("online").getAsInt();
        sendVanicLink(online);
        JsonObject servers = new JsonObject();

        for (ServerInfo server : ServerInfo.getServers()) {
            if (server.getGrantScope().equals("proxy") || server.getGrantScope().equals("linked")) {
                continue;
            }
            JsonObject serverObject = new JsonObject();
            serverObject.addProperty("name", server.getName());
            serverObject.addProperty("online", server.getOnlinePlayers());
            servers.add(server.getName(), serverObject);
        }
        response.add("mobServers", servers);

        return new ResponseEntity<>(SiteConstant.GSON.toJson(response), HttpStatus.OK);
    }

    private ServerInfo serverInfo;

    private void sendVanicLink(int online) {
        if (this.serverInfo == null) {
            this.serverInfo = new ServerInfo("uhc-2");
            this.serverInfo.setGrantScope("linked");
            this.serverInfo.setMaxPlayers(1000);
            this.serverInfo.setTps(20);
            this.serverInfo.setState(ServerState.ONLINE);
        }
        this.serverInfo.setLastHeartbeat(System.currentTimeMillis());
        this.serverInfo.setOnlinePlayers(online);
        SiteApplication.INSTANCE.getRedisService().publish(new UpdateServerPacket(this.serverInfo));
    }
}
