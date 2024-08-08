package com.mobpvp.site.cache.impl;

import com.google.gson.JsonElement;
import com.mobpvp.site.model.support.SupportTicketModel;
import com.mobpvp.site.model.support.enums.TicketStatus;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import com.mobpvp.site.cache.type.RepeatingCache;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class ApplicationSupportCache extends RepeatingCache<List<SupportTicketModel>> {

    public ApplicationSupportCache() {
        super(TimeUnit.SECONDS.toMillis(10));
    }

    @Override
    public void execute() {
        RequestResponse response = RequestHandler.get("forum/ticket/s/all/applications");

        if (!response.wasSuccessful())
            return;

        List<SupportTicketModel> tickets = new ArrayList<>();

        for (JsonElement element : response.asArray())
            tickets.add(new SupportTicketModel(element.getAsJsonObject()));

        tickets.sort((o1, o2) -> {
            int open = SupportTicketModel.OPEN_COMPARATOR.compare(o1, o2);
            if (open != 0)
                return open;

            if (o1.getStatus() == TicketStatus.PENDING
                    && o2.getStatus() != TicketStatus.PENDING)
                return -1;

            if (o2.isClosed() && o1.isClosed())
                return (int) (o2.getLastUpdatedAt() - o1.getLastUpdatedAt());

            return (int) (o1.getLastUpdatedAt() - o2.getLastUpdatedAt());
        });

        cache(tickets);
    }

    @Override
    public List<SupportTicketModel> getDefaultValue() {
        return new ArrayList<>();
    }
}