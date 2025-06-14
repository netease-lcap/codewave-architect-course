package com.codewave;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * 加入spring环境配置（在spring.factories中指定）
 */
@Configuration
//@ComponentScan(basePackageClasses = LibraryAutoScan.class)
@ComponentScan(basePackages = "com.codewave")
public class HelloLibBasicSpringEnvironmentConfiguration {
}
