package com.netease.cloud.lowcode.owl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.netease.cloud.lowcode.owl.spi.rdb.exception.LcapRdbPluginException;
import java.io.IOException;
import java.io.InputStream;

public class TestUtils {
    private static ObjectMapper objectMapper = new ObjectMapper();

    public TestUtils() {
    }

    public static <T> T getObjectFromInputStream(InputStream inputStream, Class<T> clazz) {
        try {
            return inputStream == null ? null : objectMapper.readValue(inputStream, clazz);
        } catch (IOException var3) {
            throw new LcapRdbPluginException("解析json发生异常", var3);
        }
    }
}
