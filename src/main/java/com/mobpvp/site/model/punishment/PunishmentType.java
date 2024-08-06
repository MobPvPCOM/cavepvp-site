package com.mobpvp.site.model.punishment;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.concurrent.TimeUnit;

@Getter
@RequiredArgsConstructor
public enum PunishmentType {

    BLACKLIST("Blacklist", "Blacklisted", -1),
    BAN("Ban", "Banned", TimeUnit.DAYS.toMillis(7)),
    MUTE("Mute", "Muted", TimeUnit.DAYS.toMillis(7)),
    WARN("Warn", "Warned", -1),
    KICK("Kick", "Kicked", -1);

    private final String displayName;
    private final String context;
    private final long maxTempDuration;

    public boolean isMinor() {
        return this == WARN
                || this == KICK;
    }

    public String getPermPermission() {
        return "core.punishment." + name() + ".permanent";
    }

}
