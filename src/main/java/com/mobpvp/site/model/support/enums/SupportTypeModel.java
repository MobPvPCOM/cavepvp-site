package com.mobpvp.site.model.support.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.support.format.QuestionSet;
import com.mobpvp.site.model.support.format.QuestionSetRegistry;

import java.util.function.Predicate;

@Getter
@RequiredArgsConstructor
public enum SupportTypeModel {

    BAN_APPEAL(
            "Ban Appeal",
            model -> model.getActiveBan() != null,
            QuestionSetRegistry.PUNISHMENT_QUESTIONS.clone("punishment", "banned")
    ),
    MUTE_APPEAL(
            "Mute Appeal",
            model -> model.getActiveMute() != null,
            QuestionSetRegistry.PUNISHMENT_QUESTIONS.clone("punishment", "muted")
    ),
    GENERAL_SUPPORT(
            "General Support", model -> true,
            QuestionSetRegistry.GENERAL_SUPPORT
    ),
    PAYMENT_SUPPORT(
            "Payment Support", model -> true,
            QuestionSetRegistry.PAYMENT_SUPPORT
    ),
    PLAYER_REPORT(
            "Player Report", model -> true,
            QuestionSetRegistry.USER_REPORT.clone("type", "player")
    ),
    STAFF_REPORT(
            "Staff Report", model -> true,
            QuestionSetRegistry.USER_REPORT.clone("type", "staff member")
    ),
    BUG_REPORT(
            "Bug Report", model -> true,
            QuestionSetRegistry.BUG_REPORT
    ),
    STAFF_APPLICATION(
            "Staff Application",
            model -> true,
            QuestionSetRegistry.STAFF_APPLICATION
    ),
    BUILDER_APPLICATION(
            "Builder Application", model -> true,
            QuestionSetRegistry.BUILDER_APPLICATION
    ),
    TRANSLATOR_APPLICATION(
            "Translator Application", model -> true,
            QuestionSetRegistry.TRANSLATOR_APPLICATION
    ),
    MEDIA_APPLICATION(
            "Media Application", model -> true,
            QuestionSetRegistry.MEDIA_APPLICATION
    );

    private final String fancyName;
    private final Predicate<ProfileModel> shouldDisplay;
    private final QuestionSet questionSet;

    public boolean isAppeal() {
        return this == BAN_APPEAL || this == MUTE_APPEAL;
    }

    public String formatUrl() {
        return "/support/" + name().toLowerCase().replaceAll("_", "-");
    }

    public static SupportTypeModel fromInput(String input) {
        input = input.toUpperCase().replaceAll("-", "_");

        for (SupportTypeModel value : values()) {
            if (value.name().equals(input))
                return value;
        }

        return null;
    }

}