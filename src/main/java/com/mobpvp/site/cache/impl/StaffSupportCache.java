package com.mobpvp.site.cache.impl;

import com.google.gson.JsonElement;
import com.mobpvp.site.cache.type.RepeatingCache;
import com.mobpvp.site.model.support.SupportTicketModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class StaffSupportCache extends RepeatingCache<List<SupportTicketModel>> {

    public StaffSupportCache() {
        super(TimeUnit.SECONDS.toMillis(10));
    }

    @Override
    public void execute() {
        RequestResponse response = RequestHandler.get("forum/ticket/s/all");

        if (!response.wasSuccessful())
            return;

        List<SupportTicketModel> tickets = new ArrayList<>();

        for (JsonElement element : response.asArray())
            tickets.add(new SupportTicketModel(element.getAsJsonObject()));

        tickets.sort(SupportTicketModel.STAFF_TICKET_COMPARATOR);

        cache(tickets);
    }

    @Override
    public List<SupportTicketModel> getDefaultValue() {
        return new ArrayList<>();
    }
}