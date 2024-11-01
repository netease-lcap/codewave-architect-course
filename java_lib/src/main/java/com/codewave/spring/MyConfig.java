package com.codewave.spring;

import org.springframework.context.annotation.Configuration;

import com.netease.lowcode.core.annotation.NaslConfiguration;

@Configuration
public class MyConfig {
    @NaslConfiguration
    public String host;

    @NaslConfiguration(systemScope = true, alias = "spring.redis.host")
    public String redisHost;

}
