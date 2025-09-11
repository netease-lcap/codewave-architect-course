package com.netease;

import com.netease.cloud.nasl.extension.SpringProjectExtension;
import com.netease.cloud.nasl.source.application.project.build.dependency.Dependency;

import java.util.List;

import static java.util.Arrays.asList;

public class CustomSpringProject implements SpringProjectExtension {

    @Override
    public List<Dependency> getDependencies() {
        // 添加依赖，如果已经存在则会被覆盖
        Dependency poi = new Dependency("io.micrometer", "micrometer-registry-prometheus", "1.9.13");
        Dependency mybatisSpring = new Dependency("org.apache.skywalking", "apm-toolkit-logback-1.x", "8.16.0");
        return asList(poi, mybatisSpring);
    }
}
