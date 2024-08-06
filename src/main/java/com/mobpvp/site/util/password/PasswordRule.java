package com.mobpvp.site.util.password;

import com.mobpvp.site.util.password.result.PasswordResult;

public interface PasswordRule {

    PasswordResult validate(String password);

}