package com.netease.lib.translator.impl;

import com.netease.cloud.nasl.ast.App;
import com.netease.cloud.nasl.ast.IntegerType;
import com.netease.cloud.nasl.source.application.project.JavaCatalogs;
import com.netease.cloud.nasl.source.lang.java.element.JavaType;
import com.netease.cloud.nasl.source.template.JavaSimpleTemplateFile;
import com.netease.cloud.nasl.source.template.SourceTemplate;
import com.netease.cloud.nasl.translator.context.NaslTranslateContext;
import com.netease.cloud.nasl.translator.context.NodeTranslateHandler;
import com.netease.cloud.nasl.translator.lang.java.NaslBasicTypeJavaTranslator;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;


public class TypeJavaTranslatorPlugin extends NaslBasicTypeJavaTranslator {
    private static final Logger log = LoggerFactory.getLogger(TypeJavaTranslatorPlugin.class);

    @Override
    public JavaType visitIntegerType(IntegerType node) {
        return JavaType.LONG;
    }

    @Override
    public NodeTranslateHandler<?, ?>[] setNodeTranslateHandlers() {
        return new NodeTranslateHandler<?, ?>[]{new AppHandler()};
    }

    class AppHandler implements NodeTranslateHandler<App, NaslTranslateContext> {
        @Override
        public void preHandle(App node, NaslTranslateContext context) {
        }

        @Override
        public void postHandle(App node, NaslTranslateContext context) {
            // 修改模板文件
            List<SourceTemplate> sourceTemplates = new ArrayList<>();
            //获取IDE-应用配置-自定义参数配置，对应application.yml文件，需要带上前缀custom
            String property = (String) getApplication().getSpringProperties(context.getEnv().value()).getProperty("custom.myPrefix");
            log.info("myPrefix:{}", property);
            if (!StringUtils.isBlank(property)) {
                sourceTemplates.add(new JavaSimpleTemplateFile("FileUploadController", JavaCatalogs.CONTROLLER, context));
                for (SourceTemplate sourceTemplate : sourceTemplates) {
                    JavaSimpleTemplateFile simpleTemplateFile = new JavaSimpleTemplateFile(sourceTemplate, context);
                    simpleTemplateFile.put("myPrefix", property);
                    context.getApplication().addSourceFile(simpleTemplateFile);
                }
            }
        }
    }
}

