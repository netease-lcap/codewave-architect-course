package com.netease.lowcode.auth.wechat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.netease.lowcode.auth.api.auth.LCAPAuthService;
import com.netease.lowcode.auth.wechat.structure.UserInfo;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @author system
 * wechat接入LCAPAuthService的扩展点
 */
public class WechatConfigLCAPAuthService implements LCAPAuthService {
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Map<String, String> getSession(HttpServletRequest request) throws IOException {
        Map<String, String> sessionMap = AuthManagerHelper.getSession(request);
        if (MapUtils.isNotEmpty(sessionMap)) {
            String extraInfo = sessionMap.get(AuthManagerHelper.JWT_KEY_EXTRA_INFO);
            if (StringUtils.isNotBlank(extraInfo)) {
                UserInfo userInfo = objectMapper.readValue(extraInfo, UserInfo.class);
                sessionMap.put(SESSION_USERID_STR, userInfo.userId);
                sessionMap.put(SESSION_USERNAME_STR, userInfo.userName);
                sessionMap.put(SESSION_NICKNAME_STR, userInfo.nickname);
                sessionMap.put(SESSION_SOURCE_STR, userInfo.source);
                sessionMap.put(SESSION_EXTRA_STR, extraInfo);
            }
        }
        return sessionMap;
    }

    @Override
    public boolean match(HttpServletRequest request) {
        return AuthManagerHelper.containsSessionKey(request);
    }

    @Override
    public boolean isRemoteUser() {
        return false;
    }

    @Override
    public void clearSession(HttpServletRequest request, HttpServletResponse response) {
        AuthManagerHelper.clearSession();
    }

    @Override
    public String type() {
        return WechatConfigAuthService.SOURCE;
    }
}
