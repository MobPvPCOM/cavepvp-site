package com.mobpvp.site.util;

import java.util.concurrent.ThreadLocalRandom;

public class StringUtil {

    private static final char[] CHARS = "abcdefghijklmnopqrstuvw0123456789".toCharArray();

    public static String generateId(int length) {
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < length; i++)
            code.append(CHARS[ThreadLocalRandom.current().nextInt(CHARS.length)]);

        return code.toString();
    }

}
