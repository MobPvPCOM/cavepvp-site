package com.mobpvp.site.model.support.enums;

import com.mobpvp.site.model.support.SupportTicketModel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@RequiredArgsConstructor
public enum TicketStatus {

    // General Support
    AWAITING_ADMIN("Awaiting Admin", "#8b0000", false),
    AWAITING_STAFF_REPLY("Awaiting Staff Reply", "#44a1e3", false),
    AWAITING_USER_REPLY("Awaiting User Reply", "#bb8c00", false),
    RESOLVED("Resolved", "#198754", true),
    CLOSED("Closed", "#dc3545", true),

    // Applications
    ACCEPTED("Accepted", "#198754", true),
    DENIED("Denied", "#dc3545", true),
    PENDING("Pending", "#bb8c00", false);

    private final String displayName;
    private final String webColor;
    private final boolean settable;

    public static List<TicketStatus> getSettable(SupportTicketModel ticket, TicketStatus current) {
        List<TicketStatus> settable = new ArrayList<>();
        boolean applicationTicket = ticket.getCategory().name().contains("APPLICATION");

        for (TicketStatus value : values()) {
            if (applicationTicket && (value == RESOLVED || value == CLOSED))
                continue;

            if (!applicationTicket && (value == ACCEPTED || value == DENIED))
                continue;

            if (value.isSettable() && !value.equals(current))
                settable.add(value);
        }

        return settable;
    }

    public static TicketStatus getStatus(String name) {
        for (TicketStatus value : values())
            if (value.name().equalsIgnoreCase(name))
                return value;

        return null;
    }

}