package com.mobpvp.site;

import com.mobpvp.site.cache.impl.*;
import com.mobpvp.site.config.RedisConfig;
import com.mobpvp.site.config.SiteBadgeConfig;
import com.mobpvp.site.redis.RedisService;
import lombok.Getter;
import com.mobpvp.site.badge.BadgeHandler;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.thread.CacheThread;
import com.mobpvp.site.util.configuration.ConfigurationHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@Getter
@SpringBootApplication
public class SiteApplication {

    public static SiteApplication INSTANCE;

    private final CacheThread cacheThread;
    private final BadgeHandler badgeHandler;
    private final SiteBadgeConfig badgeConfig;
    private final RedisConfig redisConfig;
    private final RedisService redisService;

    public SiteApplication() {
        INSTANCE = this;

        this.badgeConfig = ConfigurationHandler.INSTANCE.loadConfiguration(
                SiteBadgeConfig.class,
                new File("config/badges.json")
        );

        this.redisConfig = ConfigurationHandler.INSTANCE.loadConfiguration(
                RedisConfig.class,
                new File("config/redis.json")
        );

        this.cacheThread = new CacheThread();
        this.badgeHandler = new BadgeHandler();
        this.redisService = new RedisService(this.redisConfig, "core");

        CacheHandler.registerAll(
                new StaffCache(),
                new CategoryCache(),
                new LeaderboardCache(),
                new PlayerCountCache(),
                new AnnouncementCache(),
                new StaffSupportCache(),
                new ApplicationSupportCache(),
                new ProfileCache(),
                new SessionCache(),
                new TagCache(),
                new ReplyCache(),
                new NotificationCache()
        );

        Runtime.getRuntime().addShutdownHook(new Thread(
                cacheThread::interrupt,
                "Site -  Shutdown"
        ));
    }

    public static void main(String[] args) {
        SpringApplication.run(SiteApplication.class);
    }

}