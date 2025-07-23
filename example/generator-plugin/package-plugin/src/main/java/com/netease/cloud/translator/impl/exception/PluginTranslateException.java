package com.netease.cloud.translator.impl.exception;

/**
 * @author: wujunfeng
 * @date: 2024/8/27 20:16
 * @description:
 */
public class PluginTranslateException extends RuntimeException {
    public PluginTranslateException() {
    }

    public PluginTranslateException(String message) {
        super(message);
    }

    public PluginTranslateException(String message, Throwable cause) {
        super(message, cause);
    }

    public PluginTranslateException(Throwable cause) {
        super(cause);
    }

    public PluginTranslateException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
