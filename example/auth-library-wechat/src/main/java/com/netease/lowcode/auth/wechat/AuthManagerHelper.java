package com.netease.lowcode.auth.wechat;

import com.auth0.jwt.interfaces.Claim;
import com.netease.lowcode.auth.util.JwtUtil;
import com.netease.lowcode.auth.util.OkHttpTemplate;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;

/**
 * @author system
 */
public class AuthManagerHelper {

    public static String SECRET = "56F0D8DB90241C6E";
    /**
     * 登录凭证cookie名称
     */
    public static final String AUTH_TOKEN_NAME = "authorization";
    /**
     * jwt的key->userId
     */
    public static final String JWT_KEY_USERID = "UserId";
    /**
     * jwt的key->userName
     */
    public static final String JWT_KEY_USERNAME = "UserName";

    /**
     * jwt的AuthType
     */
    public static final String JWT_KEY_AUTH_TYPE = "AuthType";
    /**
     * jwt的extraInfo
     */
    public static final String JWT_KEY_EXTRA_INFO = "ExtraInfo";
    private static OkHttpTemplate okHttpTemplate;

    private static OkHttpTemplate buildOkHttpTemplate() {
        return new OkHttpTemplate();
    }

    public static OkHttpTemplate getOkHttpTemplateInstance() {
        if (Objects.isNull(okHttpTemplate)) {
            synchronized (AuthManagerHelper.class) {
                if (Objects.isNull(okHttpTemplate)) {
                    okHttpTemplate = buildOkHttpTemplate();
                }
            }
        }
        return okHttpTemplate;
    }

    public static boolean containsSessionKey(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (ArrayUtils.isNotEmpty(cookies)) {
            for (int i = 0; i < cookies.length; i++) {
                if (cookies[i].getName().equals(AUTH_TOKEN_NAME)) {
                    Map<String, Claim> claimMap = new JwtUtil(SECRET).decryptToken(cookies[i].getValue());
                    if (MapUtils.isNotEmpty(claimMap) && claimMap.containsKey(JWT_KEY_AUTH_TYPE) && WechatConfigAuthService.SOURCE.equals(claimMap.get(JWT_KEY_AUTH_TYPE).asString())) {
                        return true;
                    }
                }
            }
        }
        return false;
    }



    public static Map<String, String> getSession() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        return getSession(request);
    }

    public static void clearSession() {
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        Cookie[] cookies = request.getCookies();
        if (ArrayUtils.isNotEmpty(cookies)) {
            for (int i = 0; i < cookies.length; i++) {
                if (cookies[i].getName().equals(AUTH_TOKEN_NAME)) {
                    cookies[i].setMaxAge(0);
                    cookies[i].setPath("/");
                    response.addCookie(cookies[i]);
                }
            }
        }
    }

    public static void registerSession(String userId, String userName, String authType, String extraInfo, Long expireTime) {
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();
        HashMap<String, String> map = new HashMap<>(4);
        map.put(JWT_KEY_USERID, userId);
        map.put(JWT_KEY_USERNAME, userName);
        map.put(JWT_KEY_AUTH_TYPE, authType);
        map.put(JWT_KEY_EXTRA_INFO, extraInfo);
        Cookie cookie = new Cookie(AUTH_TOKEN_NAME, new JwtUtil(SECRET).createToken(map, expireTime));
        cookie.setPath("/");
        cookie.setMaxAge(Math.toIntExact(86400));
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        response.addCookie(cookie);
    }

    public static Map<String, String> getSession(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        for (int i = 0; i < cookies.length; i++) {
            if (cookies[i].getName().equals(AUTH_TOKEN_NAME)) {
                Map<String, Claim> claimMap = new JwtUtil(SECRET).decryptToken(cookies[i].getValue());
                Map<String, String> jwtTokenMap = new HashMap(claimMap.size());
                Iterator<String> keys = claimMap.keySet().iterator();
                while (keys.hasNext()) {
                    String key = keys.next();
                    jwtTokenMap.put(key, claimMap.get(key).asString());
                }
                return jwtTokenMap;
            }
        }
        return null;
    }
}
