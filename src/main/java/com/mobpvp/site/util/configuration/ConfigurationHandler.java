package com.mobpvp.site.util.configuration;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.mobpvp.site.badge.BadgeModel;
import com.mobpvp.site.badge.serialize.BadgeSerializer;
import com.mobpvp.site.util.configuration.adapter.ClassAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class ConfigurationHandler {

    public static final ConfigurationHandler INSTANCE
            = new ConfigurationHandler();

    public static final Logger LOGGER
            = LoggerFactory.getLogger(ConfigurationHandler.class);

    public static final Gson GSON = new GsonBuilder()
            .disableHtmlEscaping()
            .setPrettyPrinting()
            .registerTypeAdapter(new TypeToken<List<BadgeModel>>(){}.getType(), new BadgeSerializer())
            .registerTypeHierarchyAdapter(Class.class, new ClassAdapter())
            .create();

    public void saveConfiguration(SiteConfiguration configuration, File file) {
        try {
            FileOutputStream outputStream = new FileOutputStream(file);
            OutputStreamWriter writer = new OutputStreamWriter(outputStream, StandardCharsets.UTF_8);
            GSON.toJson(configuration, writer);
            writer.flush();
            writer.close();
        } catch (IOException e) {
            LOGGER.warn(String.format("Failed to save configuration %s to file %s",
                    configuration.getClass().getName(), file.getName()), e);
        }
    }

    public <T extends SiteConfiguration> T loadConfiguration(Class<? extends T> clazz, File file) {
        if (!file.getParentFile().exists() && !file.getParentFile().mkdir()) {
            LOGGER.warn(String.format("Failed to create parent file for %s", file.getName()));
            return null;
        }

        try {
            if (!file.exists()) {
                if (!file.createNewFile()) {
                    LOGGER.warn(String.format("Failed to create file for %s", file.getName()));
                    return null;
                }

                // save defaults
                T config = clazz.newInstance();
                saveConfiguration(config, file);
            }

            T config = GSON.fromJson(new BufferedReader(new FileReader(file)), clazz);
            saveConfiguration(config, file);
            return config;
        } catch (InstantiationException | IllegalAccessException | IOException e) {
            LOGGER.warn(String.format("Failed to load configuration %s from file %s",
                    clazz.getName(), file.getName()), e);
        }

        return null;
    }
}
