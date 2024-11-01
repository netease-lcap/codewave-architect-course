package com.codewave.spring;

import com.netease.lowcode.core.annotation.Environment;
import org.springframework.context.annotation.Configuration;

import com.netease.lowcode.core.annotation.NaslConfiguration;
import com.netease.lowcode.core.EnvironmentType;

import org.springframework.beans.factory.annotation.Value;

@Configuration
public class MyConfig {

    @NaslConfiguration(defaultValue = @Environment(type = EnvironmentType.DEV, value = "我的主机"))
    public String myHost;

    @NaslConfiguration(systemScope = true, alias = "spring.redis.host")
    public String redisHost;

}
