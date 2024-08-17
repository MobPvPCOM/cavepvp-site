package com.mobpvp.site.redis.types;

import com.mobpvp.site.redis.packet.RPacket;

/**
 * @author Moose1301
 * @date 8/17/2024
 */
public class TagReloadPacket implements RPacket {
    @Override
    public void receive() {
    }

    @Override
    public String getId() {
        return "org.hcrival.core.tag.packet.TagReloadPacket";
    }
}
