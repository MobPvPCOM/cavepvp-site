package com.mobpvp.site.util.password.impl;

import com.mobpvp.site.util.password.PasswordRule;
import com.mobpvp.site.util.password.result.PasswordResult;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LowercaseRule implements PasswordRule {

    private final int minLowercase;

    @Override
    public PasswordResult validate(String password) {
        int lowercase = 0;
        
        for (char c : password.toCharArray()) {
            if (Character.isLowerCase(c))
                lowercase++;
        }

        boolean valid = lowercase >= minLowercase;
        return new PasswordResult(valid, "Password must contain at least " + minLowercase + " lowercase letter(s)");
    }

}