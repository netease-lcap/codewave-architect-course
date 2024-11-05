package com.codewave.spring;

import com.codewave.redis.RedisConfig;
import com.codewave.redis.RedisService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import ch.qos.logback.classic.LoggerContext;

import java.util.Objects;

@ExtendWith(SpringExtension.class)
//@SpringBootTest(classes = RedisConfig.class)
@TestPropertySource(properties = {
        "spring.redis.host = redis-14018.c92.us-east-1-3.ec2.redns.redis-cloud.com",
        "spring.redis.port = 6379",
        "spring.redis.database = 1",
        "spring.redis.password = x15aid7gDK8HqtM4ipKn13oFzTOJTQE"
})
public class RedisServiceETest {

    @Autowired
    private RedisService RedisService;

    @BeforeAll
    public static void setup() {
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        loggerContext.getLogger("ROOT").setLevel(ch.qos.logback.classic.Level.OFF);
    }

    @Test
    public void testAdd() {
//        int result = myComponent.add2(5, 3);
//        assert result == 8;
    }
}
