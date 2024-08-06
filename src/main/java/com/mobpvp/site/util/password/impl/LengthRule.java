package com.mobpvp.site.util.password.impl;

import com.mobpvp.site.util.password.PasswordRule;
import com.mobpvp.site.util.password.result.PasswordResult;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LengthRule implements PasswordRule {

    private final int minLength;
    private final int maxLength;

    @Override
    public PasswordResult validate(String password) {
        int length = password.length();
        boolean valid = length <= maxLength && length >= minLength;

        return new PasswordResult(valid, "Password must be between "
                + minLength + " and " + maxLength + " characters long");
    }

}