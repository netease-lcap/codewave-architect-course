package com.netease;

import freemarker.template.*;
import org.junit.Test;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

public class BoeFreeMarkerExample {
    @Test
    public void test1() throws TemplateException, IOException {
        String className = "FilterBoeUtil";
        Configuration configuration = new Configuration(Configuration.VERSION_2_3_30);
        //获取模板文件路径
        String srcFilePath = BoeFreeMarkerExample.class.getClassLoader().getResource("templates/v3_13/src/main/java/com/netease/cloud/archetype/util").getFile();
        String decodedUrl = URLDecoder.decode(srcFilePath, "UTF-8");
        File srcFile = new File(decodedUrl);

        configuration.setDirectoryForTemplateLoading(srcFile);
        configuration.setDefaultEncoding("utf-8");
        //获取模板文件
        Template template = configuration.getTemplate(className + ".ftl");
        // 创建数据模型
        Map<String, Object> map = new HashMap<>();
        map.put("packageName", "com.abc");

        // 创建Writer对象，输出到target/classes/templates目录下
        Writer out = new FileWriter(new File(decodedUrl + "/" + className + ".java"));

        // 输出
        template.process(map, out);

        //关闭Writer对象
        out.close();
    }
}
