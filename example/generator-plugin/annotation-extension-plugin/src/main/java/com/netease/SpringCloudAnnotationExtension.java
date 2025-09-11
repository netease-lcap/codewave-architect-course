package com.netease;

import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.netease.cloud.nasl.extension.AbstractSourceFileFormatExtension;
import com.netease.cloud.nasl.source.SourceFile;

import java.nio.file.Path;

/**
 * 制品项目启动类添加SpringCloud注解。
 * 
 * @author zhangpenglan
 */
public class SpringCloudAnnotationExtension extends AbstractSourceFileFormatExtension<SourceFile> {

    private static final String ANNOTATION_NAME = "EnableDiscoveryClient";
    private static final String ANNOTATION_FULL_NAME = "org.springframework.cloud.client.discovery.EnableDiscoveryClient";
    private static final String APPLICATION = "Application";

    /**
     * 使用JavaParser解析Java源码并添加类注解。
     */
    @Override
    public String format(String code) {
        logger.info("翻译器插件: Application启动类添加注解开始...");
        CompilationUnit unit = StaticJavaParser.parse(code);
        unit.addImport(ANNOTATION_FULL_NAME);
        ClassOrInterfaceDeclaration applicationClass = unit.getClassByName(APPLICATION).get();
        applicationClass.addAnnotation(ANNOTATION_NAME);
        code = unit.toString();
        logger.info("翻译器插件: Application启动类添加注解结束");
        return code;
    }
    
    @Override
    protected Class<SourceFile> type() {
        return SourceFile.class;
    }

    @Override
    protected boolean doAccept(SourceFile file) {
        return APPLICATION.equals(file.getName());
    }
    
    /**
     * 不做操作。
     */
    @Override
    public void format(Path file) {
        
    }

}
