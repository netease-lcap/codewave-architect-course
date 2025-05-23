package com.netease.lib.translator;

import com.netease.cloud.nasl.extension.SpringProjectExtension;
import com.netease.cloud.nasl.source.application.project.build.dependency.Dependency;
import com.netease.cloud.nasl.source.application.project.build.dependency.DependencyScope;
import com.netease.cloud.nasl.source.application.project.build.dependency.ExclusionDependency;
import com.netease.cloud.nasl.source.framework.spring.SpringBootVersion;

import java.util.*;

/**
 * 修复组件漏洞
 */
public class CustomSpringProject implements SpringProjectExtension {

    @Override
    public List<Dependency> getDependencies() {
        List<Dependency> list = new ArrayList<>();
        //必须要有版本号，否则不会翻译
        list.add(addDependency("com.google.guava", "guava", "32.0.0-jre"));
        list.add(addDependency("org.yaml", "snakeyaml", "2.0"));
        list.add(addDependency("com.h2database", "h2", "2.2.220"));
        list.add(addDependency("org.json", "json", "20231013"));
        list.add(addDependencyWithExclusions("org.apache.poi", "poi-ooxml", "4.1.2", new String[]{"org.apache.commons", "commons-compress"}));
        list.add(addDependencyWithExclusions("org.springframework.boot", "spring-boot-loader-tools", "${spring-boot.version}", new String[]{"org.apache.commons", "commons-compress"}));
        list.add(addDependency("org.apache.commons", "commons-compress", "1.26.0"));
        list.add(addDependencyWithExclusions("org.springframework.boot", "spring-boot-starter-mail", "${spring-boot.version}", new String[]{"org.springframework", "spring-expression"}));

        list.add(addDependency("org.mybatis", "mybatis", "3.5.6"));
        list.add(addDependency("commons-io", "commons-io", "2.14.0"));

        list.add(addDependencyWithExclusions("org.springframework.boot", "spring-boot-starter-web", "${spring-boot.version}", new String[]{"org.springframework", "spring-web"}));
        list.add(addDependency("org.springframework", "spring-web", "5.3.39"));

        list.add(addDependencyWithExclusions("com.amazonaws", "aws-java-sdk-core", "1.12.440", new String[]{"com.fasterxml.jackson.core", "jackson-databind"}
                , new String[]{"com.fasterxml.jackson.dataformat", "jackson-dataformat-cbor"}, new String[]{"org.apache.httpcomponents", "httpclient"}, new String[]{"software.amazon.ion", "ion-java"}));

        list.add(addDependencyWithExclusions("com.netease.cloud", "nos-sdk-java-publiccloud", "1.3.1", new String[]{"log4j", "log4j"}
                , new String[]{"org.bouncycastle", "bcprov-jdk15on"}, new String[]{"commons-codec", "commons-codec"}));
        list.add(addDependency("io.micrometer", "micrometer-registry-prometheus", "1.9.13"));
        list.add(addDependencyWithExclusions("org.liquibase", "liquibase-core", "4.17.2", new String[]{"ch.qos.logback", "logback-classic"}
                , new String[]{"org.yaml", "snakeyaml"}));
        list.add(addDependencyWithExclusions("org.mybatis.spring.boot", "mybatis-spring-boot-starter", "1.3.2", new String[]{"org.springframework.boot", "spring-boot-starter-logging"}
                , new String[]{"org.yaml", "snakeyaml"}));
//        list.add(addDependencyWithExclusions("mysql", "mysql-connector-java", "8.0.28", new String[]{"com.google.protobuf", "protobuf-java"}));
        list.add(addDependency("com.googlecode.aviator", "aviator", "5.2.0"));
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
    public String getSpringBootVersion(SpringBootVersion version) {
        return "2.7.18";
    }

    @Override
    public Map<String, String> getSpringProperties(SpringPropertySearcher searcher) {
        //因spring-boot升级至2.7.x，兼容配置文件语法
        HashMap<String, String> map = new HashMap<>();
        map.put("spring.config.use-legacy-processing", "true");
        //允许循环依赖
        map.put("spring.main.allow-circular-references", "true");
        return map;
    }
}
