package com.netease.cloud.translator.impl.context.handler;

import com.kxindot.goblin.Reflections;
import com.kxindot.goblin.logger.Logger;
import com.kxindot.goblin.logger.LoggerFactory;
import com.netease.cloud.nasl.ast.App;
import com.netease.cloud.nasl.source.SourceFile;
import com.netease.cloud.nasl.source.application.JavaApplication;
import com.netease.cloud.nasl.source.application.catalog.Catalog;
import com.netease.cloud.nasl.source.application.project.JavaCatalogs;
import com.netease.cloud.nasl.source.application.project.SpringBootProject;
import com.netease.cloud.nasl.source.template.SourceTemplateFile;
import com.netease.cloud.nasl.translator.context.NaslTranslateContext;
import com.netease.cloud.nasl.translator.context.NodeTranslateHandler;
import com.netease.cloud.translator.impl.exception.PluginTranslateException;

import java.lang.reflect.Field;


/**
 * @author: wujunfeng
 * @date: 2024/8/29 19:28
 * @description:
 */
public class AppHandler implements NodeTranslateHandler<App, NaslTranslateContext> {

    private static final Logger logger = LoggerFactory.getLogger(AppHandler.class);

    @Override
    public void preHandle(App node, NaslTranslateContext context) {
        mappingCustomPackage(context);
    }


    /**
     * 映射自定义包名
     * @param context
     */
    private void mappingCustomPackage(NaslTranslateContext context) {
        logger.info("开始处理映射包名");
        JavaApplication application = (JavaApplication) context.getApplication();
        // 更改controller
        application.setPackage(JavaCatalogs.CONTROLLER.getId(), "controller", application.getPackage(JavaCatalogs.PKG_BASE));
        application.setPackage(JavaCatalogs.ENTITY_CONTROLLER.getId(), "controller/entities", application.getPackage(JavaCatalogs.PKG_BASE));
        application.setPackage(JavaCatalogs.LOGIC_CONTROLLER.getId(), "controller/logics", application.getPackage(JavaCatalogs.PKG_BASE));
        application.setPackage(JavaCatalogs.SYSTEM_CONTROLLER.getId(), "controller/system", application.getPackage(JavaCatalogs.PKG_BASE));

        application.setPackage(JavaCatalogs.LOGIC_CONTROLLER_DTO.getId(), "domain/dto", application.getPackage(JavaCatalogs.PKG_BASE));
        // 通用类放到common下
        application.setPackage(JavaCatalogs.CONFIG.getId(), "common/config", application.getPackage(JavaCatalogs.PKG_BASE));
        application.setPackage(JavaCatalogs.CONNECTOR_CONFIG.getId(), "common/connector/config", application.getPackage(JavaCatalogs.PKG_BASE));
        application.setPackage(JavaCatalogs.CONNECTOR_APP.getId(), "common/connector/app", application.getPackage(JavaCatalogs.PKG_BASE));
        application.setPackage(JavaCatalogs.AUTH_USER_CONTEXT.getId(), "common/context", application.getPackage(JavaCatalogs.PKG_BASE));
        application.setPackage(JavaCatalogs.FUNCTIONAL.getId(), "common/functional", application.getPackage(JavaCatalogs.PKG_BASE));
        application.setPackage(JavaCatalogs.INTEGRATION.getId(), "common/integration", application.getPackage(JavaCatalogs.PKG_BASE));
        application.setPackage(JavaCatalogs.WEB_INTERCEPTOR.getId(), "common/interceptor", application.getPackage(JavaCatalogs.PKG_BASE));

    }

    @Override
    public void postHandle(App node, NaslTranslateContext context) {

    }

    /**
     * 翻译后处理无法通过包名映射修改的包名
     * @param context
     */
    private void handleCustomPackageAfterTranslate(NaslTranslateContext context) {
        SpringBootProject application = (SpringBootProject) context.getApplication();
        for (SourceFile sourceFile : application) {
            if (sourceFile.getRelativeDirectory() != null && sourceFile.getRelativeDirectory().startsWith("src/main/resources/mappings")) {
                if (sourceFile instanceof SourceTemplateFile) {
                    Catalog catalog = ((SourceTemplateFile<?>) sourceFile).getCatalog();
                    try {
                        // 通过反射将catalog.id中的mappings替换成sqlmap
                        // 通过反射将catalog.name中的mappings替换成sqlmap
                        // 通过反射将relativeDirectory中的mappings替换成sqlmap
                        Field idField = catalog.getClass().getDeclaredField("id");
                        String idValue = (String) Reflections.getValue(catalog, idField);
                        Reflections.setValue(catalog, idField, idValue.replaceFirst("mappings", "sqlmap"));

                        Field nameField = catalog.getClass().getDeclaredField("name");
                        String nameValue = (String) Reflections.getValue(catalog, idField);
                        Reflections.setValue(catalog, nameField, nameValue.replaceFirst("mappings", "sqlmap"));
                    } catch (Exception e) {
                        throw new PluginTranslateException("修改包名失败", e);
                    }
                }

                try {
                    Field relativeDirectoryFiled = SourceFile.class.getDeclaredField("relativeDirectory");
                    String relativeDirectoryName = (String) Reflections.getValue(sourceFile, relativeDirectoryFiled);
                    Reflections.setValue(sourceFile, relativeDirectoryFiled, relativeDirectoryName.replaceFirst("mappings", "sqlmap"));
                } catch (Exception e) {
                    throw new PluginTranslateException("修改包名失败", e);
                }

            }
        }

        if (application.getProperty(context.getEnv().value(), "mybatis.type-handlers-package") != null) {
            application.addProperty(context.getEnv().value(),"mybatis.type-handlers-package",
                    application.getCatalog(JavaCatalogs.MYBATIS_HANDLER).getName());
        }
        if (application.getProperty(context.getEnv().value(), "mybatis.configuration.default-enum-type-handler") != null) {
            application.addProperty(context.getEnv().value(),"mybatis.configuration.default-enum-type-handler",
                    application.getCatalog(JavaCatalogs.MYBATIS_HANDLER).getName() + ".AutoEnumTypeHandler");
        }


    }
}
