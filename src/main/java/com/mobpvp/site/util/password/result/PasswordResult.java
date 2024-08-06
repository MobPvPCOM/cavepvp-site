package com.mobpvp.site.util.password.result;

import lombok.Getter;

@Getter
public class PasswordResult {

    private final boolean valid;
    private final String message;

    public PasswordResult(boolean valid, String fallbackMessage) {
        this.valid = valid;
        this.message = valid ? "Success" : fallbackMessage;
    }

}