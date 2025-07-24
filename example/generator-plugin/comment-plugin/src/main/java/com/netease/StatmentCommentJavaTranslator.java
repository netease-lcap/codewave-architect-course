package com.netease;

import com.netease.cloud.nasl.ast.Comment;
import com.netease.cloud.nasl.source.lang.java.element.statement.JavaStatement;
import com.netease.cloud.nasl.source.util.JavaBuilder;
import com.netease.cloud.nasl.translator.lang.java.NaslBasicStatementJavaTranslator;

import static com.kxindot.goblin.Objects.isNull;

/**
 * 翻译NASL注释节点。
 * 
 * @author ZhaoQingJiang
 */
public class StatmentCommentJavaTranslator extends NaslBasicStatementJavaTranslator {

    @Override
    public JavaStatement visitComment(Comment node) {
        String comment = isNull(node.getValue()) ? "" : node.getValue();
        return JavaBuilder.comment(comment);
    }
    
}
