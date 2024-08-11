package com.mobpvp.site.redis.packet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mobpvp.site.SiteConstant;
import com.mobpvp.site.redis.RedisService;
import redis.clients.jedis.JedisPubSub;

/**
 * @author Emilxyz (langgezockt@gmail.com)
 * 31.12.2019 / 03:37
 * Libraries / org.hcrival.libraries.redis
 */

public class PacketPubSub extends JedisPubSub {

    @Override
    public void onMessage(String channel, String redisMessage) {
        JsonObject redisJson = SiteConstant.GSON.fromJson(redisMessage, JsonObject.class);
        String packetClassName = RedisService.convertPacketName(redisJson.get("packet").getAsString());
        String packetJson = redisJson.get("data").getAsString();

        Class<?> packetClass;

        try {
            packetClass = Class.forName(packetClassName);
        } catch (ClassNotFoundException e) {
            return;
        }

        RPacket packet = (RPacket) SiteConstant.GSON.fromJson(packetJson, packetClass);

        try {
            packet.receive();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
