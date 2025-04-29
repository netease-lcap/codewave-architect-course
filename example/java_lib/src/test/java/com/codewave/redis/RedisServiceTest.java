package com.codewave.redis;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import ch.qos.logback.classic.LoggerContext;

// @ExtendWith(SpringExtension.class)
// @ContextConfiguration(classes = RedisService.class)
public class RedisServiceTest {

    @BeforeAll
    public static void setup() {
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        loggerContext.getLogger("ROOT").setLevel(ch.qos.logback.classic.Level.OFF);
    }

    @Mock
    private RedisTemplate<String, String> redisTemplateMock;

    @Mock
    private ValueOperations<String, String> opsForValueMock;

    // @Autowired
    public RedisService redisService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        when(redisTemplateMock.opsForValue()).thenReturn(opsForValueMock);

        redisService = new RedisService(redisTemplateMock);
    }

    @Test
    public void testSetValue() {

        String key = "testKey";
        String value = "testValue";

        // 模拟 void 返回的 set 方法
        doNothing().when(opsForValueMock).set(key, value);
        redisService.setValue(key, value);
        // 验证 set 方法被调用
        verify(opsForValueMock, times(1)).set(key, value);
    }

    @Test
    public void testGetValue() {
        String key = "testKey";
        String value = "testValue";

        // 模拟 getValue 的返回值
        when(opsForValueMock.get(key)).thenReturn(value);

        String retrievedValue = redisTemplateMock.opsForValue().get(key);

        // 验证 getValue 的结果
        assertEquals(value, retrievedValue);
        verify(opsForValueMock, times(1)).get(key);
    }

}
