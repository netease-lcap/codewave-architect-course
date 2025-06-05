package com.netease.lowcode.auth.wechat;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netease.lowcode.auth.wechat.structure.Result;
import com.netease.lowcode.auth.wechat.structure.UserInfo;
import com.netease.lowcode.core.annotation.NaslLogic;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

/**
 * Wechat认证管理类
 *
 * @author system
 */
@RestController
public class WechatConfigAuthService {
    private static Logger logger = LoggerFactory.getLogger(WechatConfigAuthService.class);
    public static final String SOURCE = "Wechat";
    public static final String CALLBACK_PATH = "/rest/auth/wechatCallback";
    public static String accessTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token";
    public static String userInfoUrl = "https://api.weixin.qq.com/sns/userinfo";
    public static String connectUrl = "https://open.weixin.qq.com/connect/qrconnect?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_login&state=wechat";
    private static ObjectMapper objectMapper = new ObjectMapper();
    private static List<Function<UserInfo, UserInfo>> userAddLogicList;
    private static WechatConfig wechatConfig;

    @RequestMapping(CALLBACK_PATH)
    @ResponseBody
    public void wechatLoginCallback(@RequestParam("code") String code, HttpServletResponse response, HttpServletRequest request) throws IOException {
        String redirectUri = request.getScheme() + "://" + request.getServerName();
        Result result = wechatLoginCallback(code, redirectUri);
        if (result.code.equals(Result.SUCCESS)) {
            response.sendRedirect("/" + wechatConfig.successRedirectPage);
        }
    }

    public static Result wechatLoginCallback(String code, String redirectUri) throws IOException {
        String appId = wechatConfig.clientId;
        if (StringUtils.isEmpty(appId)) {
            logger.error("client id为空，请检查配置");
            return Result.ofFail("client id为空，请检查配置");
        }
        String appSecret = wechatConfig.clientSecret;
        if (StringUtils.isEmpty(appSecret)) {
            logger.error("client secret为空，请检查配置");
            return Result.ofFail("client secret为空，请检查配置");
        }
        HashMap<String, String> accessTokenHeaders = new HashMap<>();
        accessTokenHeaders.put("Content-type", "application/x-www-form-urlencoded");
        HashMap<String, String> accessTokenParams = new HashMap<>();
        accessTokenParams.put("appid", appId);
        accessTokenParams.put("secret", appSecret);
        accessTokenParams.put("code", code);
        accessTokenParams.put("redirect_uri", redirectUri);
        accessTokenParams.put("grant_type", "authorization_code");
        String result = AuthManagerHelper.getOkHttpTemplateInstance().doPost(accessTokenUrl, accessTokenParams, accessTokenHeaders);
        logger.info("accessToken result={}", result);
        if (StringUtils.isEmpty(result)) {
            logger.error("获取AccessToken失败");
            return Result.ofFail("获取AccessToken失败");
        }
        JsonNode jsonObject = objectMapper.readTree(result);
        String accessToken = jsonObject.get("access_token").asText();
        String openId = jsonObject.get("openid").asText();
        HashMap<String, String> accessUserParams = new HashMap<>();
        accessUserParams.put("access_token", accessToken);
        accessUserParams.put("openid", openId);
        accessUserParams.put("lang", "en");
        HashMap<String, String> accessUserHeaders = new HashMap<>();
        result = AuthManagerHelper.getOkHttpTemplateInstance().doGet(userInfoUrl, accessUserParams, accessUserHeaders);
        logger.info("userInfo result={}", result);

        if (StringUtils.isEmpty(result)) {
            logger.error("获取UserInfo失败");
            return Result.ofFail("获取UserInfo失败");
        }
        jsonObject = objectMapper.readTree(result);
        UserInfo userInfo = new UserInfo();
        userInfo.source = SOURCE;
        userInfo.userId = getJsonNodeKeyValue(jsonObject, "openid");
        userInfo.userName = getJsonNodeKeyValue(jsonObject, "openid");
        userInfo.openid = getJsonNodeKeyValue(jsonObject, "openid");
        userInfo.nickname = getJsonNodeKeyValue(jsonObject, "nickname");
        userInfo.sex = Integer.parseInt(getJsonNodeKeyValue(jsonObject, "sex"));
        userInfo.province = getJsonNodeKeyValue(jsonObject, "province");
        userInfo.city = getJsonNodeKeyValue(jsonObject, "city");
        userInfo.country = getJsonNodeKeyValue(jsonObject, "country");
        userInfo.headimgurl = getJsonNodeKeyValue(jsonObject, "headimgurl");
        if (CollectionUtils.isNotEmpty(userAddLogicList)) {
            userAddLogicList.get(0).apply(userInfo);
        }
        AuthManagerHelper.registerSession(userInfo.userId,
                userInfo.userName,
                userInfo.source,
                objectMapper.writeValueAsString(userInfo),
                wechatConfig.sessionExpireSeconds);
        return Result.ofSuccess();
    }

    /**
     * 获取用户信息
     * 如果会话过期或不合法，可能会null
     * @return
     * @throws IOException
     */
    @NaslLogic
    public static UserInfo getUserInfo() throws IOException {
        Map<String, String> sessionMap = AuthManagerHelper.getSession();
        if (MapUtils.isNotEmpty(sessionMap)) {
            String extraInfo = sessionMap.get(AuthManagerHelper.JWT_KEY_EXTRA_INFO);
            try {
                UserInfo userInfo = objectMapper.readValue(extraInfo, UserInfo.class);
                return userInfo;
            } catch (Exception e) {
                logger.error("Wehcat UserInfo Parse Error,Check token isValid , ExtraInfo={}" + extraInfo);
            }
        }
        return null;
    }

    /**
     * 登出
     */
    @NaslLogic
    public static Boolean logout() {
        AuthManagerHelper.clearSession();
        return true;
    }


    /**
     * 微信登录,需要管理用户
     *
     * @return
     * @throws IOException
     */
    @NaslLogic
    public static String login(Function<UserInfo, UserInfo> userAddLogic) throws IOException {
        return getAuthPageUrl();
    }

    public static String getAuthPageUrl() throws IOException {
        String clientId = wechatConfig.clientId;
        if (StringUtils.isEmpty(clientId)) {
            logger.error("wechatClientId为空，请检查配置");
        }
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String redirectUri = request.getScheme() + "://" + request.getServerName() + CALLBACK_PATH;
        return String.format(connectUrl, clientId, redirectUri);
    }

    @Autowired(required = false)
    public void setUserAddLogic(List<Function<UserInfo, UserInfo>> userAddLogic) {
        if (CollectionUtils.isNotEmpty(userAddLogic) && userAddLogic.size() > 1) {
            throw new RuntimeException("userAddLogicList more than one instance");
        }
        userAddLogicList = userAddLogic;
    }

    @Autowired
    public void setConfig(WechatConfig config) {
        AuthManagerHelper.SECRET = config.jwtSignKey;
        wechatConfig = config;
    }


    /**
     * @param jsonNode
     * @param key
     * @return
     */
    public static String getJsonNodeKeyValue(JsonNode jsonNode, String key) {
        if (jsonNode.has(key) && StringUtils.isNotEmpty(jsonNode.get(key).asText())) {
            return jsonNode.get(key).asText();
        }
        return null;
    }
}

