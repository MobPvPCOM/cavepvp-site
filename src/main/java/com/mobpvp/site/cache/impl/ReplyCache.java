package com.mobpvp.site.cache.impl;

import com.google.gson.JsonElement;
import com.mobpvp.site.cache.type.RepeatingCache;
import com.mobpvp.site.cache.type.TimedMultiCache;
import com.mobpvp.site.model.replies.ReplyModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * @author alfie
 * @project site
 * @date 21/08/2024 / 19:18
 */

public class ReplyCache extends RepeatingCache<List<ReplyModel>> {

    public ReplyCache() {
        super(TimeUnit.SECONDS.toMillis(10));
    }

    @Override
    public void execute() {
        RequestResponse response = RequestHandler.get("forum/replies");
        if (!response.wasSuccessful())
            return;

        List<ReplyModel> replies = new ArrayList<>();
        for (JsonElement element : response.asArray())
            replies.add(new ReplyModel(element.getAsJsonObject()));

        cache(replies);
    }

    @Override
    public List<ReplyModel> getDefaultValue() {
        return new ArrayList<>();
    }
}
