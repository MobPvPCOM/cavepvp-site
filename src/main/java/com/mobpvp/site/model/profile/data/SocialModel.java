package com.mobpvp.site.model.profile.data;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SocialModel {

    YOUTUBE("YouTube", "fab fa-youtube", "https://youtube.com/", "#FF0000"),
    TWITTER("Twitter", "fab fa-twitter", "https://twitter.com/", "#00acee"),
    TWITCH("Twitch", "fab fa-twitch", "https://twitch.tv/", "#6441a5"),
    TELEGRAM("Telegram", "fab fa-telegram", "https://telegram.me/", "#0088cc"),
    DISCORD("Discord", "fab fa-discord", "", "#7289da"),
    GITHUB("GitHub", "fab fa-github", "https://github.com/", "#2b3137");

    private final String name;
    private final String icon;
    private final String startingUrl;
    private final String hexColor;

    public String getSettingName() {
        return "SOCIAL_" + name();
    }

}