package com.mobpvp.site.util.password;

import com.mobpvp.site.util.password.result.PasswordResult;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PasswordValidation {

    public static final PasswordResult SUCCESS_RESULT
            = new PasswordResult(true, "Success");

    private final List<PasswordRule> rules = new ArrayList<>();

    public PasswordValidation(PasswordRule... passwordRules) {
        rules.addAll(Arrays.asList(passwordRules));
    }

    public PasswordResult validate(String input) {
        for (PasswordRule rule : rules) {
            PasswordResult validate = rule.validate(input);

            if (!validate.isValid())
                return validate;
        }

        return SUCCESS_RESULT;
    }

}