package com.mobpvp.site.server;

import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Emilxyz (langgezockt@gmail.com)
 * 19.02.2020 / 19:51
 * Core / org.hcrival.core.spigot.server
 */

@Data
public class ServerInfo {

    private static final Map<String, ServerInfo> servers = new HashMap<>();
    public static final long MAX_TIMEOUT = 5000L;

    private String name = "";
    private String grantScope = "";
    private long lastHeartbeat = System.currentTimeMillis();
    private ServerState state = ServerState.UNKNOWN;
    private int onlinePlayers = 0;
    private int maxPlayers = 0;
    private double tps = 0D;
    private double lastMSPT = 0D;
    private long usedMemory = 0L;
    private long allocatedMemory = 0L;
    private boolean antiVpn = true;
    private boolean queueEnabled = false;
    private boolean queuePaused = false;
    private int queueRate = 0;
    private int playersInQueue = 0;

    public ServerInfo(String name) {
        this.name = name;
        servers.put(name.toLowerCase(), this);
    }

    public boolean isOnline() {
        switch (state) {
            case ONLINE:
            case WHITELISTED:
                return true;
            default:
                return false;
        }
    }

    public boolean isProxy() {
        return grantScope.equals("proxy");
    }

    public int getOnlinePlayers() {
        return isOnline() ? onlinePlayers : 0;
    }

    public static ServerInfo getServerInfo(String name) {
        return servers.getOrDefault(name.toLowerCase(), null);
    }

    public static List<ServerInfo> getServers() {
        return new ArrayList<>(servers.values());
    }

    public static List<ServerInfo> getByGroup(String group) {
        List<ServerInfo> toReturn = new ArrayList<>();

        for (ServerInfo server : servers.values())
            if (server.getGrantScope().equalsIgnoreCase(group))
                return toReturn;

        return null;
    }

    public static void updateServerInfo(String name, ServerInfo serverInfo) {
        servers.put(name.toLowerCase(), serverInfo);
    }

    public static int getGlobalPlayerCount() {

        int i = 0;
        for (ServerInfo serverInfo : servers.values()) {
            if (serverInfo.isProxy())
                continue;

            i += serverInfo.getOnlinePlayers();
        }

        return i;
    }
}
