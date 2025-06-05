package com.netease.lowcode.auth.util;

import com.netease.lowcode.auth.LibraryAutoScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;


/**
 * @author system
 */
@Configuration
@ComponentScan(basePackageClasses = LibraryAutoScan.class)
public class SpringEnvironmentConfiguration {
}
