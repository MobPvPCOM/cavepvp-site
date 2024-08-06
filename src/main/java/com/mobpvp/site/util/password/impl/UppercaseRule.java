package com.mobpvp.site.util.password.impl;

import lombok.RequiredArgsConstructor;
import com.mobpvp.site.util.password.PasswordRule;
import com.mobpvp.site.util.password.result.PasswordResult;

@RequiredArgsConstructor
public class UppercaseRule implements PasswordRule {

    private final int minUppercase;

    @Override
    public PasswordResult validate(String password) {
        int uppercase = 0;

        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c))
                uppercase++;
        }

        boolean valid = uppercase >= minUppercase;
        return new PasswordResult(valid, "Password must contain at least " + minUppercase + " uppercase letter(s)");
    }

}