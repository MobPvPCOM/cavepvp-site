package com.mobpvp.site.cache.impl;

import com.google.gson.JsonElement;
import com.mobpvp.site.cache.type.MapCache;
import com.mobpvp.site.model.profile.NotificationModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class NotificationCache extends MapCache<UUID, List<NotificationModel>> {

    @Override
    public void update(UUID key) {
        List<NotificationModel> notifications = new ArrayList<>();
        RequestResponse response = RequestHandler.get("forum/notifications/%s", key.toString());

        if (!response.wasSuccessful())
            return;

        for (JsonElement element : response.asArray())
            notifications.add(new NotificationModel(
                    element.getAsJsonObject()
            ));

        notifications.sort(NotificationModel.COMPARATOR);
        cache(key, notifications);
    }

    @Override
    public List<NotificationModel> getDefaultCacheValue() {
        return new ArrayList<>();
    }

    public int getUnreadCount(UUID target) {
        int count = 0;

        for (NotificationModel notification : get(target)) {
            if (!notification.isRead())
                count++;
        }

        return count;
    }

    public NotificationModel getNotification(UUID target, UUID uuid) {
        for (NotificationModel notification : get(target)) {
            if (notification.getUuid().equals(uuid))
                return notification;
        }

        return null;
    }

}