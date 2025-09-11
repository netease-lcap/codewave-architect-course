package com.netease.cloud.translator.impl;


import com.netease.cloud.nasl.ast.App;
import com.netease.cloud.nasl.source.application.Application;
import com.netease.cloud.nasl.translator.context.NodeTranslateHandler;
import com.netease.cloud.nasl.translator.lang.java.NaslAppJavaTranslator;
import com.netease.cloud.translator.impl.context.handler.AppHandler;

/**
 * @author: wujunfeng
 * @date: 2024/8/29 15:41
 * @description:
 */
public class AppJavaTranslatorPlugin extends NaslAppJavaTranslator {

    @Override
    public Application visitApp(App node) {
        return translateInternal(node, Application.class);
    }

    @Override
    public NodeTranslateHandler<?, ?>[] setNodeTranslateHandlers() {
        return new NodeTranslateHandler<?, ?>[] {new AppHandler()};
    }
    
}
