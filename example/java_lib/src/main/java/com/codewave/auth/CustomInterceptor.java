package com.codewave.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CustomInterceptor implements HandlerInterceptor {
    private static final Logger log = LoggerFactory.getLogger(CustomInterceptor.class);

    /**
     * 请求处理前执行（读取Cookie）
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("===== 进入拦截器 preHandle 方法 =====");

        // 1. 读取所有Cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                log.info("Cookie名称: {}, Cookie值: {}", cookie.getName(), cookie.getValue());
            }
        } else {
            log.info("请求中没有Cookie");
        }

        // 2. 可以通过return false拦截请求（这里返回true允许请求继续）
        return true;
    }

    /**
     * 请求处理后、视图渲染前执行（修改Response）
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           org.springframework.web.servlet.ModelAndView modelAndView) throws Exception {
        log.info("===== 进入拦截器 postHandle 方法 =====");

        // 1. 向Response添加自定义响应头
        response.addHeader("X-Custom-Header", "interceptor-modified");

        // 2. 向Response添加Cookie（可选）
        Cookie responseCookie = new Cookie("interceptor_cookie", "hello_from_interceptor");
        responseCookie.setPath("/");
        responseCookie.setMaxAge(3600); // 有效期1小时
        response.addCookie(responseCookie);

    }

    /**
     * 整个请求完成后执行（资源清理等）
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        log.info("===== 进入拦截器 afterCompletion 方法 =====");
        if (ex != null) {
            log.error("请求处理过程中发生异常: {}", ex.getMessage());
        }
    }
}