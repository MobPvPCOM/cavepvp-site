package com.mobpvp.site.util;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Moose1301
 * @date 8/17/2024
 */
//Based off https://github.com/nailujx86/mcmotdparser
public class MinecraftTextUtils {
    public static final char COLOR_CHAR = '§';
    public static final Map<String, String> CLASSES = new HashMap<>();
    public static final Map<String, String> COLORS = new HashMap<>();
    public static final Map<String, String> EXTRAS = new HashMap<>();

    static {
        CLASSES.put("bold", "mc_bold");
        CLASSES.put("italic", "mc_italic");
        CLASSES.put("underlined", "mc_underlined");
        CLASSES.put("strikethrough", "mc_strikethrough");
        CLASSES.put("obfuscated", "mc_obfuscated");

        COLORS.put("§0", "black");
        COLORS.put("§1", "dark_blue");
        COLORS.put("§2", "dark_green");
        COLORS.put("§3", "dark_aqua");
        COLORS.put("§4", "dark_red");
        COLORS.put("§5", "dark_purple");
        COLORS.put("§6", "gold");
        COLORS.put("§7", "gray");
        COLORS.put("§8", "dark_gray");
        COLORS.put("§9", "blue");
        COLORS.put("§a", "green");
        COLORS.put("§b", "aqua");
        COLORS.put("§c", "red");
        COLORS.put("§d", "light_purple");
        COLORS.put("§e", "yellow");
        COLORS.put("§f", "white");

        EXTRAS.put("§k", "obfuscated");
        EXTRAS.put("§l", "bold");
        EXTRAS.put("§m", "strikethrough");
        EXTRAS.put("§n", "underline");
        EXTRAS.put("§o", "italic");
    }

    public static JsonObject textToJson(String text) {
        JsonObject jsonObj = new JsonObject();
        jsonObj.addProperty("text", "");
        JsonArray extraArray = new JsonArray();
        jsonObj.add("extra", extraArray);

        var curObj = jsonObj;
        var arr = text.split("");
        for (var i = 0; i < arr.length; i++) {
            var innerObj = new JsonObject();
            if (!arr[i].equalsIgnoreCase("§")) {
                curObj.addProperty("text", curObj.get("text").getAsString() + arr[i]);

            } else if (arr[i + 1].equalsIgnoreCase("r")) {
                innerObj = new JsonObject();
                innerObj.addProperty("text", "");
                innerObj.add("extra", new JsonArray());
                jsonObj.getAsJsonArray("extra").add(innerObj);
                curObj = innerObj;

                i++;

            } else {
                var codeStr = '§' + arr[i + 1];
                innerObj = new JsonObject();
                innerObj.addProperty("text", "");
                innerObj.add("extra", new JsonArray());
                if (COLORS.containsKey(codeStr)) {
                    innerObj.addProperty("color", COLORS.get(codeStr));
                }
                if (EXTRAS.containsKey(codeStr)) {
                    innerObj.addProperty(EXTRAS.get(codeStr), true);
                }
                curObj.getAsJsonArray("extra").add(innerObj);
                curObj = innerObj;

                i++;
            }
        }
        return jsonObj;
    }

    public static String parseJsonToHTML(JsonElement jsonPart) {
        JsonArray toParse = jsonPart.isJsonArray() ? jsonPart.getAsJsonArray() : new JsonArray();
        if (jsonPart.isJsonObject()) {
            toParse.add(jsonPart.getAsJsonObject());
        }

        String html = "";
        for (JsonElement element : toParse) {
            JsonObject parsePart = element.getAsJsonObject();
            String classlist = "";
            String styleList = "";
            String text = "";
            for (Map.Entry<String, JsonElement> entry : parsePart.entrySet()) {
                String key = entry.getKey();
                JsonElement value = entry.getValue();
                if (key.equalsIgnoreCase("text")) {
                    text += value.getAsString();
                    continue;
                }
                if (CLASSES.containsKey(key)) {
                    classlist += " " + CLASSES.get(key);
                    continue;
                }
                if (key.equalsIgnoreCase("color")) {

                    String colorValue = value.getAsString();
                    if (colorValue.startsWith("#")) {
                        styleList += "color: " + colorValue;
                    } else {
                        classlist += " mc_" + colorValue;
                    }
                    continue;
                }
                if (key.equalsIgnoreCase("extra")) {
                    for (JsonElement jsonPartExtra : value.getAsJsonArray()) {
                        text += parseJsonToHTML(jsonPartExtra);
                    }

                }
            }
            html += "<span class=\"" + classlist.trim() + "\" style=\"" + styleList.trim() + "\">" + text + "</span>";
        }
        return html.toString();
    }

    public static String jsonToHtml(JsonElement json) {
        // Replace newline characters with <br>
        String jsonString = json.toString().replace("\\n", "<br>");

        // Parse the updated JSON string back into a JsonElement
        JsonElement parsedJson = JsonParser.parseString(jsonString);

        // Convert JSON to HTML
        String motd = parseJsonToHTML(parsedJson);

        // Use the callback to return the HTML
        return motd;
    }

    public static String toHtml(Object motd) {
        if (motd instanceof JsonElement) {
            // Case when motd is already a JSON object
            return jsonToHtml((JsonElement) motd);
        } else if (motd instanceof String) {
            // Case when motd is a string and needs to be converted to JSON
            return jsonToHtml(textToJson((String)motd));
        }
        return null;
    }
}
