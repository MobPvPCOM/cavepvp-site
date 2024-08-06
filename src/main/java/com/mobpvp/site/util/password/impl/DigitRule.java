package com.mobpvp.site.util.password.impl;

import lombok.RequiredArgsConstructor;
import com.mobpvp.site.util.password.PasswordRule;
import com.mobpvp.site.util.password.result.PasswordResult;

import java.util.List;

@RequiredArgsConstructor
public class DigitRule implements PasswordRule {

    private static final List<Character> DIGITS
            = List.of('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');

    private final int minDigits;

    @Override
    public PasswordResult validate(String password) {
        int digits = 0;

        for (char c : password.toCharArray()) {
            if (DIGITS.contains(c))
                digits++;
        }

        boolean valid = digits >= minDigits;
        return new PasswordResult(valid, "Password must contain at least " + minDigits + " digit(s)");
    }

}