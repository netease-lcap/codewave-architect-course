package com.netease;

import com.kxindot.goblin.logger.Logger;
import com.kxindot.goblin.logger.LoggerFactory;
import com.netease.cloud.nasl.ast.BackendLogic;
import com.netease.cloud.nasl.ast.OverriddenLogic;
import com.netease.cloud.nasl.source.MultiSource;
import com.netease.cloud.nasl.source.MultiSourceFile;
import com.netease.cloud.nasl.source.Source;
import com.netease.cloud.nasl.source.SourceFile;
import com.netease.cloud.nasl.source.framework.spring.SpringController;
import com.netease.cloud.nasl.source.lang.java.JavaClass;
import com.netease.cloud.nasl.source.lang.java.element.statement.JavaMethod;
import com.netease.cloud.nasl.translator.lang.java.NaslBasicLogicJavaTranslator;

import java.util.List;

import static com.kxindot.goblin.Objects.newArrayList;

/**
 * BackendLogic、OverridenLogic节点翻译过程添加注释翻译。
 *
 * @author ZhaoQingJiang
 */
public class BaseLogicCommentJavaTranslator extends NaslBasicLogicJavaTranslator {

    private static final Logger logger = LoggerFactory.getLogger(
        BaseLogicCommentJavaTranslator.class);

    @Override
    public Source visitBackendLogic(BackendLogic node) {
        logger.info("Translating BackendLogic...");
        Source source = translateInternal(node, Source.class);
        List<JavaMethod> methods = newArrayList();
        collectControllerMethod(source, methods);
        for (JavaMethod method : methods) {
            JavaCommentUtil.addControllerComment(node, method);
        }
        return source;
    }

    @Override
    public Source visitOverriddenLogic(OverriddenLogic node) {
        logger.info("Translating OverriddenLogic...");
        MultiSourceFile files = translateInternal(node, MultiSourceFile.class);
        JavaCommentUtil.commentClass(files, node.getDescription());
        return files;
    }

    /**
     * 获取所有Spring Controller API方法
     */
    private void collectControllerMethod(Source source, List<JavaMethod> methods) {
        if (isController(source)) {
            methods.addAll(JavaClass.class.cast(source).getMethods());
        } else if (MultiSourceFile.class.isInstance(source)) {
            MultiSourceFile files = (MultiSourceFile) source;
            for (SourceFile file : files) {
                collectControllerMethod(file, methods);
            }
        } else if (MultiSource.class.isInstance(source)) {
            MultiSource sources = (MultiSource) source;
            for (Source src : sources) {
                collectControllerMethod(src, methods);
            }
        }
    }

    /**
     * 判断对象是否Spring Controller
     */
    private boolean isController(Source source) {
        if (source instanceof JavaClass) {
            JavaClass javaClass = (JavaClass) source;
            return javaClass instanceof SpringController || javaClass.getName().endsWith("Controller");
        }
        return false;
    }

}
