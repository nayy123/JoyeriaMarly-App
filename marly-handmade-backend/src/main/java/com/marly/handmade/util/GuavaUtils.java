package com.marly.handmade.util;

import com.google.common.base.Preconditions;

public final class GuavaUtils {

    private GuavaUtils() {
    }

    public static void requireNonNullRuntime(Object obj, String message) {
        try {
            Preconditions.checkNotNull(obj, message);
        } catch (NullPointerException e) {
            throw new RuntimeException(message, e);
        }
    }

    public static void checkArgumentRuntime(boolean condition, String message) {
        try {
            Preconditions.checkArgument(condition, message);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(message, e);
        }
    }
}
