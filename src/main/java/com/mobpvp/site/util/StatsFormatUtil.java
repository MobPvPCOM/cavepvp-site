package com.mobpvp.site.util;

import com.google.gson.JsonElement;
import org.springframework.util.NumberUtils;
import org.springframework.util.StringUtils;

/**
 * @author Moose1301
 * @date 8/6/2024
 */
public class StatsFormatUtil {
    public static String getFormattedName(String name) {
        if(name.equalsIgnoreCase("highestKillStreak")) {
            return "Highest Kill Streak";
        } else  if(name.equalsIgnoreCase("killStreak")) {
            return "Kill Streak";
        }else  if(name.equalsIgnoreCase("killKeys")) {
            return "Kill Keys";
        }
        return StringUtils.capitalize(name.toLowerCase());
    }
    public static String getFormattedValue(String name, JsonElement element) {
        if(name.equalsIgnoreCase("playTime")) {
            return TimeUtils.formatTimeShort(element.getAsLong());
        }
        return element.toString();
    }
}
