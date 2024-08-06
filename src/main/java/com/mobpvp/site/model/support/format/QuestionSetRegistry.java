package com.mobpvp.site.model.support.format;

public class QuestionSetRegistry {

    public static final QuestionSet GENERAL_SUPPORT = new QuestionSet()
            .add("What is your enquiry?", 5)
            .add("Additional information (optional)", 3);

    public static final QuestionSet PUNISHMENT_QUESTIONS = new QuestionSet()
            .add("Are you Guilty?", 1)
            .add("Why should you be un{punishment}?", 3)
            .add("Additional Information", 3);

    public static final QuestionSet STAFF_APPLICATION = new QuestionSet()
            .add("How old are you? (Must be 15+)", 1)
            .add("Do you have any previous staff experience?", 3)
            .add("Why would you like to become a staff member at MobPvP?", 3)
            .add("What makes you stand out from other applicants?", 3)
            .add("Can any current staff members vouch for you?: (optional)", 2)
            .add("How active can you be?", 3)
            .add("What is your discord and telegram @?", 2)
            .add("Additional information (optional)", 3);

    public static final QuestionSet TRANSLATOR_APPLICATION = new QuestionSet()
            .add("What languages can you speak?", 3)
            .add("How fluently can you speak those languages?", 3)
            .add("How many hours a day can you be available to translate?", 3)
            .add("What is your discord and telegram @?", 2);

    public static final QuestionSet BUILDER_APPLICATION = new QuestionSet()
            .add("What is your timezone?", 1)
            .add("What is your discord and telegram @?", 2)
            .add("Previous work (portfolio)", 3)
            .add("Do you have any previous experience?", 3)
            .add("How many hours can you build for each week?", 3);

    public static final QuestionSet BUG_REPORT = new QuestionSet()
            .add("Provide details about this bug", 5)
            .add("How can you replicate this bug?", 3)
            .add("Additional information (optional)", 3);

    public static final QuestionSet USER_REPORT = new QuestionSet()
            .add("In game name of the {type}", 1)
            .add("Provide details about the situation", 5)
            .add("Additional information (optional)", 3);

    public static final QuestionSet PAYMENT_SUPPORT = new QuestionSet()
            .add("What is your transaction ID?", 1)
            .add("Provide details about the situation", 5)
            .add("Additional information (optional)", 3);

    public static final QuestionSet MEDIA_APPLICATION = new QuestionSet()
            .add("Are you applying for Media or Famous?", 1)
            .add("What are your discord and telegram @?", 2)
            .add("Provide a link to your platform", 1)
            .add("How many videos can you upload per month?", 1)
            .add("How many times can you stream per month?", 1)
            .add("Link two or more videos on MobPvP", 2)
            .add("Do you agree to follow the MobPvP rules?", 1);
}