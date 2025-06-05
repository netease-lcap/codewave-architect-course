package com.netease.lowcode.auth.wechat;

import com.netease.lowcode.core.EnvironmentType;
import com.netease.lowcode.core.annotation.Environment;
import com.netease.lowcode.core.annotation.NaslConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author system
 */
@Component
public class WechatConfig {
    /**
     * 微信开放平台应用Id
     */
    @Value("${clientId}")
    @NaslConfiguration
    public String clientId;
    /**
     * 微信开放平台应用秘钥secret
     */
    @Value("${clientSecret}")
    @NaslConfiguration
    public  String clientSecret;

    /**
     * JwtToken的signKey，默认读取应用内部的生成的秘钥key，如果无，取默认值56F0D8DB90241C6E
     * 类型为String
     */
    @Value("${auth.token.secret:56F0D8DB90241C6E}")
    public  String jwtSignKey;
    /**
     * 会话过期时间，单位为秒
     * 类型为Long
     */
    @Value("${sessionExpireSeconds}")
    @NaslConfiguration(defaultValue = {@Environment(type = EnvironmentType.DEV,value = "86400"),@Environment(type = EnvironmentType.ONLINE,value = "86400")})
    public  Long sessionExpireSeconds;

    /**
     * 登录成功，默认跳转页面
     */
    @Value("${successRedirectPage}")
    @NaslConfiguration(defaultValue = {@Environment(type = EnvironmentType.DEV,value = "dashboard"),@Environment(type = EnvironmentType.ONLINE,value = "dashboard")})
    public  String successRedirectPage;
}
