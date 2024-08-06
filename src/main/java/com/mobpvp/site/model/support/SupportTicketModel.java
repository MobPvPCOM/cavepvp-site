package com.mobpvp.site.model.support;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mobpvp.site.SiteConstant;
import com.mobpvp.site.model.support.enums.SupportTypeModel;
import com.mobpvp.site.util.TimeUtils;
import com.mobpvp.site.util.uuid.UUIDCache;
import lombok.Data;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.punishment.PunishmentModel;
import com.mobpvp.site.model.support.enums.TicketStatus;

import java.util.*;

@Data
public class SupportTicketModel {

    // open tickets first
    public static final Comparator<SupportTicketModel> OPEN_COMPARATOR = (o1, o2) -> {
        // o1 open && o2 closed -> o1 before o2 -> -1
        if (!o1.isClosed() && o2.isClosed())
            return -1;

        //  o1 closed && o2 open -> o2 before o1 -> 1
        if (o1.isClosed() && !o2.isClosed())
            return 1;

        return 0;
    };

    // open tickets first -> sorted by last update newest to oldest
    public static final Comparator<SupportTicketModel> TICKET_COMPARATOR = (o1, o2) -> {
        int open = OPEN_COMPARATOR.compare(o1, o2);
        if (open != 0)
            return open;

        // newest to oldest
        return (int) (o2.getLastUpdatedAt() - o1.getLastUpdatedAt());
    };


    // open tickets first -> tickets awaiting staff reply first -> sorting from oldest to newest
    public static final Comparator<SupportTicketModel> STAFF_TICKET_COMPARATOR = (o1, o2) -> {
        int open = OPEN_COMPARATOR.compare(o1, o2);
        if (open != 0)
            return open;

        // o1 waiting for staff & o2 not waiting for staff -> o1 before o2 -> -1
        if (o1.getStatus() == TicketStatus.AWAITING_STAFF_REPLY
                && o2.getStatus() != TicketStatus.AWAITING_STAFF_REPLY)
            return -1;

        // o1 not waiting for staff && o2 waiting for staff -> o2 before o1 - 1
        if (o1.getStatus() != TicketStatus.AWAITING_STAFF_REPLY
                && o2.getStatus() == TicketStatus.AWAITING_STAFF_REPLY)
            return 1;

        // both tickets are closed, sort by newest to oldest
        if (o2.isClosed() && o1.isClosed())
            return (int) (o2.getLastUpdatedAt() - o1.getLastUpdatedAt());

        // oldest to newest
        return (int) (o1.getLastUpdatedAt() - o2.getLastUpdatedAt());
    };

    // open tickets first -> tickets awaiting admin first -> tickets awaiting staff -> sorting from oldest to newest
    public static final Comparator<SupportTicketModel> ADMIN_TICKET_COMPARATOR = (o1, o2) -> {
        int open = OPEN_COMPARATOR.compare(o1, o2);
        if (open != 0)
            return open;

        // o1 waiting for admin && o2 not waiting for admin -> o1 before o2 -> -1
        if (o1.getStatus() == TicketStatus.AWAITING_ADMIN && o2.getStatus() != TicketStatus.AWAITING_ADMIN)
            return -1;

        // o1 not waiting for admin && o2 waiting for admin -> o2 before o1 -> 1
        if (o1.getStatus() != TicketStatus.AWAITING_ADMIN && o2.getStatus() == TicketStatus.AWAITING_ADMIN)
            return 1;

        // default to staff view
        return STAFF_TICKET_COMPARATOR.compare(o1, o2);
    };

    public static final Comparator<TicketReplyModel> REPLY_COMPARATOR =
            (o1, o2) -> (int) (o1.getCreatedAt() - o2.getCreatedAt());

    private final String id;
    private final String title;
    private final SupportTypeModel category;
    private final TicketStatus status;

    private final UUID author;
    private final long createdAt;
    private final long lastUpdatedAt;

    private final Map<Integer, String> questions;
    private final List<TicketReplyModel> replies = new ArrayList<>();

    private final String authorName;
    private final String authorWebColor;

    private final PunishmentModel punishment;
    private final ResolveSuggestion resolveSuggestion;

    public SupportTicketModel(JsonObject object) {
        this.id = object.get("id").getAsString();
        this.title = object.get("title").getAsString();
        this.category = SupportTypeModel.valueOf(object.get("category").getAsString());
        this.status = TicketStatus.valueOf(object.get("status").getAsString());
        this.author = UUID.fromString(object.get("author").getAsString());
        this.createdAt = object.get("createdAt").getAsLong();
        this.lastUpdatedAt = object.get("lastUpdatedAt").getAsLong();

        this.questions = new HashMap<>();
        for (JsonElement element : object.get("questions").getAsJsonArray()) {
            JsonObject questionObject = element.getAsJsonObject();

            questions.put(
                    questionObject.get("id").getAsInt(),
                    questionObject.get("body").getAsString().replaceAll("\\r\\n", "<br>")
            );
        }

        this.authorName = object.has("authorName")
                ? object.get("authorName").getAsString() : UUIDCache.getName(author);

        this.authorWebColor = object.has("authorWebColor")
                ? object.get("authorWebColor").getAsString() : "#ffffff";

        this.punishment = object.has("punishment")
                ? new PunishmentModel(object.get("punishment").getAsJsonObject()) : null;

        this.resolveSuggestion = object.has("resolveSuggestion")
                ? new ResolveSuggestion(object.get("resolveSuggestion").getAsJsonObject()) : null;

        JsonArray array = object.get("replies").getAsJsonArray();
        array.forEach(element -> replies.add(new TicketReplyModel(element.getAsJsonObject())));
    }

    public boolean canReply(ProfileModel model) {
        if (model == null)
            return false;

        if (isClosed() || status == TicketStatus.AWAITING_ADMIN)
            return model.hasPermission("website.support.reply");

        return model.getUuid().equals(author) || model.hasPermission("website.support.reply");
    }

    public String getWebDisplay() {
        return category.getFancyName() + " #" + id;
    }

    public TicketReplyModel getLastReply() {
        if (replies.isEmpty())
            return null;

        return replies.get(replies.size() - 1);
    }

    public String formatCreationDate() {
        return TimeUtils.formatCalendarString(createdAt, true);
    }

    public String getPostedAgo() {
        return TimeUtils.formatTimeAgo(createdAt);
    }

    public boolean isClosed() {
        return status == TicketStatus.CLOSED || status == TicketStatus.RESOLVED
                || status == TicketStatus.DENIED || status == TicketStatus.ACCEPTED;
    }

    public String getQuestionHeader(int id) {
        return category.getQuestionSet()
                .getQuestions().get(id).getQuestion();
    }

    public String getContent(int id) {
        String sanitizedHtml = SiteConstant.POLICY_FACTORY.sanitize(
                questions.getOrDefault(id, ""));

        return SiteConstant.MARKDOWN_RENDERER.render(
                SiteConstant.MARKDOWN_PARSER.parse(sanitizedHtml)
        );
    }

    @Data
    public static class ResolveSuggestion {

        private final UUID staff;
        private final String staffName;
        private final String staffWebColor;
        private final TicketStatus status;
        private final String punishmentAction;
        private final long punishmentNewDuration;
        private final boolean decreaseLevel;

        public ResolveSuggestion(JsonObject object) {
            this.staff = UUID.fromString(object.get("staff").getAsString());

            this.staffName = object.has("staffName")
                    ? object.get("staffName").getAsString()
                    : "N/A";

            this.staffWebColor = object.has("staffWebColor")
                    ? object.get("staffWebColor").getAsString()
                    : "#FFFFFF";

            this.status = TicketStatus.getStatus(object.get("status").getAsString());

            if (object.has("punishmentAction") && !object.get("punishmentAction").isJsonNull())
                punishmentAction = object.get("punishmentAction").getAsString();
            else punishmentAction = null;

            punishmentNewDuration = object.get("punishmentNewDuration").getAsLong();
            decreaseLevel = object.get("decreaseLevel").getAsBoolean();
        }

        public String formatNewDuration() {
            return TimeUtils.formatDetailed(punishmentNewDuration);
        }

        public String formatPunishmentAction() {
            if (punishmentAction == null)
                return "null";

            return punishmentAction;
        }

    }

}