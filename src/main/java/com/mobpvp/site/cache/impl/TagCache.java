package com.mobpvp.site.cache.impl;

import com.google.gson.JsonElement;
import com.mobpvp.site.cache.type.RepeatingCache;
import com.mobpvp.site.model.TagModel;
import com.mobpvp.site.model.staff.StaffRankModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class TagCache extends RepeatingCache<List<TagModel>> {

    public TagCache() {
        super(TimeUnit.MINUTES.toMillis(1));
    }

    @Override
    public void execute() {
        RequestResponse response = RequestHandler.get("tag");
        if (!response.wasSuccessful())
            return;

        List<TagModel> tags = new ArrayList<>();

        for (JsonElement rankElement : response.asArray())
            tags.add(new TagModel(
                    rankElement.getAsJsonObject()
            ));

        cache(tags);
    }

    @Override
    public List<TagModel> getDefaultValue() {
        return new ArrayList<>();
    }

}