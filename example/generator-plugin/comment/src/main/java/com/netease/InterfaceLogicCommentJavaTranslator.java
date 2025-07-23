package com.netease;

import com.netease.cloud.nasl.ast.AuthLogic;
import com.netease.cloud.nasl.ast.AuthLogicForCallInterface;
import com.netease.cloud.nasl.source.MultiSourceFile;
import com.netease.cloud.nasl.source.Source;
import com.netease.cloud.nasl.translator.lang.java.NaslInterfaceJavaTranslator;

/**
 * AuthLogic、AuthLogicForCallInterface节点翻译过程添加注释翻译。
 * 
 * @author ZhaoQingJiang
 */
public class InterfaceLogicCommentJavaTranslator extends NaslInterfaceJavaTranslator {

    @Override
    public Source visitAuthLogic(AuthLogic node) {
        MultiSourceFile files = translateInternal(node, MultiSourceFile.class);
        JavaCommentUtil.commentClass(files, node.getDescription());
        return files;
    }
    
    @Override
    public Source visitAuthLogicForCallInterface(AuthLogicForCallInterface node) {
        MultiSourceFile files = translateInternal(node, MultiSourceFile.class);
        JavaCommentUtil.commentClass(files, node.getDescription());
        return files;
    }
    
}
