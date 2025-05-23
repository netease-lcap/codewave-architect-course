package com.netease;

import freemarker.template.*;
import org.junit.Test;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FreeMarkerExample {
    @Test
    public void test1() throws TemplateException, IOException {
        String className = "FileUploadController";
        Configuration configuration = new Configuration(Configuration.VERSION_2_3_30);
        //获取模板文件路径
        String srcFilePath = FreeMarkerExample.class.getClassLoader().getResource("templates/v3_10/src/main/java/com/netease/cloud/archetype/web/controller").getFile();
        String decodedUrl = URLDecoder.decode(srcFilePath, "UTF-8");
        File srcFile = new File(decodedUrl);

        configuration.setDirectoryForTemplateLoading(srcFile);
        configuration.setDefaultEncoding("utf-8");
        //获取模板文件
        Template template = configuration.getTemplate(className + ".ftl");
        // 创建数据模型
        Map<String, Object> map = new HashMap<>();
        map.put("packageName", "com.abc");
        map.put("myPrefix", "abc");
        map.put("getPackage", new TemplateMethodModelEx() {
            @Override
            public Object exec(List list) throws TemplateModelException {
                // 在这里编写获取包名的逻辑，例如：
                String packageName = list.get(0).toString();
                if (packageName.equals("com.netease.cloud.archetype")) {
                    // 执行相应的逻辑...
                    return "com.abc"; // 返回实际的包名
                }
                return "";
            }
        });

        // 创建Writer对象，输出到target/classes/templates目录下
        Writer out = new FileWriter(new File(decodedUrl + "/" + className + ".java"));

        // 输出
        template.process(map, out);

        //关闭Writer对象
        out.close();
    }
}
