package com.netease;

import com.kxindot.goblin.logger.Logger;
import com.kxindot.goblin.logger.LoggerFactory;
import com.netease.cloud.nasl.ast.Logic;
import com.netease.cloud.nasl.source.MultiSourceFile;
import com.netease.cloud.nasl.source.SourceFile;
import com.netease.cloud.nasl.source.lang.java.JavaClass;
import com.netease.cloud.nasl.source.lang.java.element.expression.JavaComment;
import com.netease.cloud.nasl.source.lang.java.element.statement.JavaAnnotations;
import com.netease.cloud.nasl.source.lang.java.element.statement.JavaMethod;
import com.netease.cloud.nasl.source.util.JavaBuilder;

import java.util.Optional;

import static com.kxindot.goblin.Objects.*;

/**
 * Java注释便捷工具。
 * 
 * @author ZhaoQingJiang
 */
public final class JavaCommentUtil {

    private static final Logger logger = LoggerFactory.getLogger(
        JavaCommentUtil.class);

    /**
     * 为{@link JavaClass}文件添加类注释。
     * 
     * @param file SourceFile
     * @param comment String
     */
    public static void commentClass(SourceFile file, String comment) {
        logger.info("comment class with comment: {}", comment);
        if (isBlank(comment) || isNull(file)) return;
        if (JavaClass.class.isInstance(file)) {
            JavaClass.class.cast(file).setComment(JavaBuilder.comment(true, comment));
        }
    }
    
    /**
     * 为{@link JavaClass}文件添加类注释。
     * 
     * @param files MultiSourceFile
     * @param comment String
     */
    public static void commentClass(MultiSourceFile files, String comment) {
        if (isBlank(comment) || isEmpty(files)) return;
        for (SourceFile file : files) {
            commentClass(file, comment);
        }
    }
    
    
    /**
     * private constructor
     */
    private JavaCommentUtil() {}

    /**
     * 给Java方法添加comment
     *
     * @param logic  Logic
     * @param method JavaMethod
     */
    public static void addControllerComment(Logic logic, JavaMethod method) {
        JavaComment comment = method.getComment();
        if (isNotNull(comment)) {
            return;
        }
        method.setComment(JavaBuilder.comment(true, logic.getDescription()));
    }
}
