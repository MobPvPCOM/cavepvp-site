package com.mobpvp.site;

import com.mobpvp.site.cache.impl.*;
import lombok.Getter;
import com.mobpvp.site.badge.BadgeHandler;
import com.mobpvp.site.cache.CacheHandler;
import com.mobpvp.site.cache.impl.*;
import com.mobpvp.site.cache.thread.CacheThread;
import com.mobpvp.site.config.badge.SiteBadgeConfig;
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

    public SiteApplication() {
        INSTANCE = this;

        this.badgeConfig = ConfigurationHandler.INSTANCE.loadConfiguration(
                SiteBadgeConfig.class,
                new File("config/badges.json")
        );

        this.cacheThread = new CacheThread();
        this.badgeHandler = new BadgeHandler();

        CacheHandler.registerAll(
                new StaffCache(),
                new CategoryCache(),
                new LeaderboardCache(),
                new PlayerCountCache(),
                new AnnouncementCache(),
                new StaffSupportCache(),
                new ApplicationSupportCache(),
                new ProfileCache(),
                new SessionCache()
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