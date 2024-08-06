package com.mobpvp.site.cache.impl;

import com.google.gson.JsonElement;
import com.mobpvp.site.cache.type.RepeatingCache;
import com.mobpvp.site.model.leaderboard.LeaderboardModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class LeaderboardCache extends RepeatingCache<List<LeaderboardModel>> {

    public LeaderboardCache() {
        super(TimeUnit.SECONDS.toMillis(10));
    }

    @Override
    public void execute() {
        RequestResponse response = RequestHandler.get("leaderboard");

        if (!response.wasSuccessful())
            return;

        List<LeaderboardModel> models = new ArrayList<>();

        for (JsonElement element : response.asArray())
            models.add(new LeaderboardModel(element.getAsJsonObject()));

        cache(models);
    }

    public LeaderboardModel getLeaderboard(String name) {
        for (LeaderboardModel model : getCachedData()) {
            if (model.getName().equalsIgnoreCase(name))
                return model;
        }

        return null;
    }

    @Override
    public List<LeaderboardModel> getDefaultValue() {
        return new ArrayList<>();
    }

}