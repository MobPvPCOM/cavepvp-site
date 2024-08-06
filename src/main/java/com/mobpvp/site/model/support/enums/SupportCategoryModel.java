package com.mobpvp.site.model.support.enums;

import lombok.Getter;
import com.mobpvp.site.model.profile.ProfileModel;

import java.util.ArrayList;
import java.util.List;

@Getter
public enum SupportCategoryModel {

    APPEAL_PUNISHMENTS(
            "Appeal Punishments",
            SupportTypeModel.BAN_APPEAL,
            SupportTypeModel.MUTE_APPEAL
    ),

    TICKETS(
            "General Support",
            SupportTypeModel.GENERAL_SUPPORT,
            SupportTypeModel.PAYMENT_SUPPORT,
            SupportTypeModel.PLAYER_REPORT,
            SupportTypeModel.STAFF_REPORT,
            SupportTypeModel.BUG_REPORT
    ),

    APPLICATIONS(
            "Applications",
            SupportTypeModel.STAFF_APPLICATION,
            SupportTypeModel.BUILDER_APPLICATION,
            SupportTypeModel.TRANSLATOR_APPLICATION,
            SupportTypeModel.MEDIA_APPLICATION
    );

    private final String name;
    private final List<SupportTypeModel> models;

    SupportCategoryModel(String name, SupportTypeModel... models) {
        this.name = name;
        this.models = List.of(models);
    }

    public static List<SupportCategoryModel> getApplicable(ProfileModel profile) {
        List<SupportCategoryModel> categories = new ArrayList<>();

        for (SupportCategoryModel value : values()) {
            int count = 0;

            for (SupportTypeModel model : value.getModels()) {
                if (model.getShouldDisplay().test(profile))
                    count++;
            }

            if (count > 0)
                categories.add(value);
        }

        return categories;
    }

}