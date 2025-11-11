package com.marly.handmade.util;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;


public final class ApacheCommonsUtils {

    private ApacheCommonsUtils() {}

    public static void requireNonNullRuntime(Object obj, String message) {
        try {
            Validate.notNull(obj, message);
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new RuntimeException(message, e);
        }
    }

    public static void checkArgumentRuntime(boolean condition, String message) {
        try {
            Validate.isTrue(condition, message);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(message, e);
        }
    }

    public static boolean isBlank(String str) {
        return StringUtils.isBlank(str);
    }

    public static String defaultIfBlank(String str, String defaultStr) {
        return StringUtils.defaultIfBlank(str, defaultStr);
    }
}
