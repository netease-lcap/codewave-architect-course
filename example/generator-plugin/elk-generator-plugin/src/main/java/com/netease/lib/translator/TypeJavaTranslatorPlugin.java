package com.netease.lib.translator;

import com.netease.cloud.nasl.ast.App;
import com.netease.cloud.nasl.ast.IntegerType;
import com.netease.cloud.nasl.source.RawFile;
import com.netease.cloud.nasl.source.application.project.JavaCatalogs;
import com.netease.cloud.nasl.source.lang.java.element.JavaType;
import com.netease.cloud.nasl.source.template.JavaSimpleTemplateFile;
import com.netease.cloud.nasl.source.template.SimpleTemplateFile;
import com.netease.cloud.nasl.translator.context.NaslTranslateContext;
import com.netease.cloud.nasl.translator.context.NodeTranslateHandler;
import com.netease.cloud.nasl.translator.lang.java.NaslBasicTypeJavaTranslator;

public class TypeJavaTranslatorPlugin extends NaslBasicTypeJavaTranslator {

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
            // 修改dockerfile
            RawFile dockerfile = context.getApplication().getSourceFile("Dockerfile", RawFile.class);
            dockerfile.setContent(dockerfile.getSourceCode().replaceAll("(?s).*", "FROM openjdk:8-jdk\n" +
                    "\n" +
                    "# 下载Filebeat\n" +
                    "COPY ./filebeat-8.5.2-linux-x86_64.tar.gz /tmp/filebeat.tar.gz\n" +
                    "COPY ./apache-skywalking-java-agent-8.16.0.tgz /tmp/apache-skywalking.tar.gz\n" +
                    "\n" +
                    "# 创建/app目录\n" +
                    "RUN mkdir /app\n" +
                    "RUN mkdir -p /config/filebeat\n" +
                    "RUN mkdir /sh\n" +
                    "\n" +
                    "\n" +
                    "# 设置时区为上海时区\n" +
                    "RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo \"Asia/Shanghai\" > /etc/timezone\n" +
                    "\n" +
                    "# 解压Filebeat到/app/filebeat\n" +
                    "RUN tar xzvf /tmp/filebeat.tar.gz -C /app/ \\\n" +
                    "    && rm /tmp/filebeat.tar.gz \\\n" +
                    "    && mv /app/filebeat-8.5.2-linux-x86_64 /app/filebeat\n" +
                    "\n" +
                    "# 解压skywalking-agent到/app/skywalking-agent\n" +
                    "RUN tar xzvf /tmp/apache-skywalking.tar.gz -C /app/ \\\n" +
                    "    && rm /tmp/apache-skywalking.tar.gz\n" +
                    "\n" +
                    "# 将当前目录下的jar文件、启动脚本、和Filebeat配置复制到容器\n" +
                    "COPY ./snp-xxxx-application-1.0.0.jar /app/\n" +
                    "COPY ./filebeat.yml /config/filebeat/\n" +
                    "COPY ./exec.sh /sh/\n" +
                    "\n" +
                    "# 设置工作目录\n" +
                    "WORKDIR /app\n" +
                    "\n" +
                    "# 设置启动脚本权限\n" +
                    "RUN chmod +x /sh/exec.sh\n" +
                    "\n" +
                    "# 暴露端口\n" +
                    "EXPOSE 9090\n" +
                    "\n" +
                    "# 指定容器启动时执行的命令\n" +
                    "CMD [\"/sh/exec.sh\"]"));
            //修改启动脚本
            RawFile exec = context.getApplication().getSourceFile("exec.sh", RawFile.class);
            exec.setContent(exec.getSourceCode().replaceAll("(?s).*", "#!/bin/bash\n" +
                    "\n" +
                    "# 启动Filebeat\n" +
                    "echo \"Starting Filebeat...\"\n" +
                    "/app/filebeat/filebeat -c /config/filebeat/filebeat.yml -e &\n" +
                    "\n" +
                    "sleep 5\n" +
                    "\n" +
                    "# 启动Java应用\n" +
                    "echo \"Starting Java application...\"\n" +
                    "exec java -javaagent:/app/skywalking-agent/skywalking-agent.jar -Dskywalking.agent.service_name=snp-eqs-emds -Dskywalking.agent.instance_name=snp-eqs-emds -Dskywalking.collector.backend_service=127.0.0.1:11800 -jar /app/snp-emds-application-1.0.0.jar"));
            //添加logback.xml
            context.getApplication().addSourceFile(new SimpleTemplateFile("logback.xml",
                    getContext().getTemplate("logback", JavaCatalogs.SRC_MAIN_RESOURCES), getContext()));
            //添加bootstrap.yaml
            context.getApplication().addSourceFile(new SimpleTemplateFile("bootstrap.yaml",
                    getContext().getTemplate("bootstrap", JavaCatalogs.SRC_MAIN_RESOURCES), getContext()));
            context.getApplication().addSourceFile(new JavaSimpleTemplateFile("DiscoveryConfig", JavaCatalogs.CONFIG, context));
        }
    }
}

