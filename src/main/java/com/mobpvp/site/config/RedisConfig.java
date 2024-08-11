package com.mobpvp.site.config;


import com.mobpvp.site.util.configuration.SiteConfiguration;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;


@NoArgsConstructor
@Data
@EqualsAndHashCode
@ToString
public class RedisConfig implements SiteConfiguration {

    private String host = "localhost";
    private int port = 6379;
    private boolean authEnabled = false;
    private String authPassword = "password";
    private int dbId = 0;

}
