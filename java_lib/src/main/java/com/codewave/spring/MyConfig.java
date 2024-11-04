package com.codewave.spring;

import com.netease.lowcode.core.annotation.Environment;
import org.springframework.context.annotation.Configuration;

import com.netease.lowcode.core.annotation.NaslConfiguration;
import com.netease.lowcode.core.EnvironmentType;

@Configuration
public class MyConfig {

    /**
     * 我的主机Host
     */
    @NaslConfiguration(defaultValue = @Environment(type = EnvironmentType.DEV, value = "我的主机"))
    public String myHost;

    @NaslConfiguration(defaultValue = {
            @Environment(type = EnvironmentType.DEV, value = "appSecret"),
            @Environment(type = EnvironmentType.ONLINE, value = "appSecret")
    })
    public String appSecret;
    /**
     * MongoDB地址
     */
    @NaslConfiguration(systemScope = true, alias = "spring.mongo.host")
    public String mongoHost;

}
