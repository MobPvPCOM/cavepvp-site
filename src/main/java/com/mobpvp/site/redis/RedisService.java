package com.mobpvp.site.redis;

import com.google.gson.JsonObject;
import com.mobpvp.site.SiteConstant;
import com.mobpvp.site.config.RedisConfig;
import com.mobpvp.site.redis.packet.PacketPubSub;
import com.mobpvp.site.redis.packet.RPacket;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPubSub;

public class RedisService {

    private final RedisConfig config;

    private final JedisPool pool;

    private final String channel;

    private Jedis subscribeClient;
    private Thread subscribeThread;
    /**
     * Constructs a new redis service.
     *
     * @param config the {@link RedisConfig} object for this
     *               service to use to create a connection
     */
    public RedisService(RedisConfig config, String channel) {
        this.config = config;
        this.channel = channel;
        this.pool = new JedisPool(config.getHost(), config.getPort());
        this.subscribe();
    }

    public void subscribe() {
        if (this.subscribeThread != null) {
            return;
        }

        this.subscribeThread = new Thread(() -> {
            if (subscribeClient == null) {
                subscribeClient = pool.getResource();
                if (config.isAuthEnabled())
                    subscribeClient.auth(config.getAuthPassword());
            }

            JedisPubSub pubSub = new PacketPubSub();
            subscribeClient.subscribe(pubSub, this.channel);
        }, "SpinLib - Redis Subscriber");
        this.subscribeThread.setDaemon(true);
        this.subscribeThread.start();
    }
    /**
     * Executes a {@link RedisCommand}.
     *
     * @param command the command to execute
     * @param <T>     the generic type the command should return
     * @return the result of the command
     */
    public <T> T executeCommand(RedisCommand<T> command) {
        Jedis jedis = null;
        try {
            jedis = pool.getResource();
            if (config.isAuthEnabled())
                jedis.auth(config.getAuthPassword());

            jedis.select(config.getDbId());
            return command.execute(jedis);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (jedis != null) {
                jedis.close();
                jedis = null;
            }
        }
    }


    public void publish(RPacket packet) {
        this.executeCommand(redis -> {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("packet", packet.getId());
            jsonObject.addProperty("data", SiteConstant.GSON.toJson(packet));
            redis.publish(this.channel, jsonObject.toString());
            return null;
        });
    }

    public static String convertPacketName(String oldName) {
        if(oldName.endsWith("UpdateServerPacket")) {
            return "com.mobpvp.site.server.packet.UpdateServerPacket";
        }
        return oldName;
    }
}
