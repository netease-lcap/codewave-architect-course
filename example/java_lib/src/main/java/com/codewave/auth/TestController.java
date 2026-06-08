package com.codewave.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class TestController {

    /**
     * 测试接口：返回简单响应
     */
    @GetMapping("/auth")
    public String test(HttpServletRequest request, HttpServletResponse response) {
        // 可以在控制器中添加Cookie（供拦截器读取）
        // javax.servlet.http.Cookie cookie = new Cookie("test_cookie", "hello");
        // response.addCookie(cookie);

        return "Hello, Interceptor!";
    }
}