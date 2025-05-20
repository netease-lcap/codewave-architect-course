package com.netease.lib.translator;

import com.netease.cloud.nasl.extension.SpringProjectExtension;
import com.netease.cloud.nasl.source.application.project.build.dependency.Dependency;
import com.netease.cloud.nasl.source.application.project.build.dependency.DependencyScope;
import com.netease.cloud.nasl.source.application.project.build.dependency.ExclusionDependency;
import com.netease.cloud.nasl.source.framework.spring.SpringBootVersion;

import java.util.*;

/**
 *
 */
public class CustomSpringProject implements SpringProjectExtension {

    @Override
    public List<Dependency> getDependencies() {
        List<Dependency> list = new ArrayList<>();
        //必须要有版本号，否则不会翻译
        //集成Consul
        list.add(addDependency("org.springframework.cloud", "spring-cloud-starter-consul-discovery", "2.2.8.RELEASE"));
        list.add(addDependency("org.springframework.cloud", "spring-cloud-starter-consul-config", "3.1.2"));
        list.add(addDependency("org.springframework.cloud", "spring-cloud-starter-bootstrap", "3.1.5"));
        list.add(addDependency("org.springframework.cloud", "spring-cloud-starter-openfeign", "3.1.5"));
        list.add(addDependency("org.springframework.cloud", "spring-cloud-starter-loadbalancer", "3.1.5"));
        //集成elk
        list.add(addDependency("org.apache.skywalking", "apm-toolkit-logback-1.x", "8.16.0"));
        return list;
    }

    /**
     * 添加依赖，如已有相同依赖也可以更新版本号
     */
    private Dependency addDependency(String groupId, String artifactId, String version) {
        return new Dependency(groupId, artifactId, version);
    }

    /**
     * 删除依赖
     */
    private Dependency removeDependency(String groupId, String artifactId, String version) {
        //todo 目前翻译器插件还不支持直接删除依赖，先暂时改成test作用域，后续再优化
        Dependency dependency = new Dependency(groupId, artifactId, version);
        dependency.setScope(DependencyScope.TEST);
        return dependency;
    }

    /**
     * 修改依赖exclusions
     */
    public Dependency addDependencyWithExclusions(String groupId, String artifactId, String version, String[]... exclusions) {
        Dependency dependency = new Dependency(groupId, artifactId, version);
        Set<ExclusionDependency> exclusionSet = new HashSet<>();
        for (String[] exclusionArray : exclusions) {
            if (exclusionArray.length == 2) {
                ExclusionDependency exclusion = new ExclusionDependency(exclusionArray[0], exclusionArray[1]);
                exclusionSet.add(exclusion);
            }
        }
        dependency.setExclusions(exclusionSet);
        return dependency;
    }


    @Override
    public Map<String, String> getSpringProperties(SpringPropertySearcher searcher) {
        //指定日志配置文件为logback.xml
        HashMap<String, String> map = new HashMap<>();
        map.put("log.config", "classpath:logback.xml");
        return map;
    }
}
