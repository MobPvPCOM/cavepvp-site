package com.mobpvp.site.server.packet;

import com.mobpvp.site.redis.packet.RPacket;
import com.mobpvp.site.server.ServerInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateServerPacket implements RPacket {

    private ServerInfo serverInfo;

    @Override
    public void receive() {
        ServerInfo.updateServerInfo(serverInfo.getName(), serverInfo);
    }

    @Override
    public String getId() {
        return "org.hcrival.core.server.packet.UpdateServerPacket";
    }
}
