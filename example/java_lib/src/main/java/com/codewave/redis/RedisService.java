package com.codewave.redis;

import com.netease.lowcode.core.annotation.NaslLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import com.codewave.redis.RedisService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
public class RedisService {

    @Autowired
    @Lazy // 延迟加载 如果不使用此依赖库时可以不配置redis连接参数
    public RedisTemplate<String, String> redisTemplate;

    public RedisService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * 设置 Redis 中指定 key 的值为指定字符串
     *
     * @param key   Redis 中的键
     * @param value Redis 中的值
     */
    @NaslLogic
    public String getValue(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    @NaslLogic
    public Boolean setValue(String key, String value) {
        this.redisTemplate
                .opsForValue()
                .set(key, value);
        return true;
    }

}
