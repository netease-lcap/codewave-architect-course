# 服务端扩展

## 一、使用场景



## 二、概念原理

### 1、 依赖库与Jar的关系
#### 1.1 xxx

### 2、元数据的作用



## 三、案例展示

### 1、第三方Jar封装

Pinyin依赖库

### 2、自定义参数配置

​	Redis连接器

### 3、自定义Filter

​	安全校验

### 4、自定义Controller

​	大文件文件上传、Restful接口

### 5、AOP切面

​	数据库脱敏、接口日志

### 6、上下文调整

​	自定义应用配置

### 7、高阶函数

​	并行处理、运行时定时任务、调用低代码逻辑

### 8、连接器

​	Redis连接器

### 9、连接器(订阅发布模式)	

​	Redis连接器



## 四、服务端扩展的本质	











## 五、实操演示

### 1、 开发环境（JDK + Maven + Idea）

Codewave版本： 3.11

运行时环境：JDK： openjdk version "1.8.0_422"

构建工具： Maven: 3.9.9

开发工具： IDEA社区版 2024.2（仅当做编辑器使用，创建测试完全依赖于Maven）

版本控制： Git 2.39.3

源码位置：https://github.com/smarty-team/codewave_course/tree/main/java_lib

 

### 2、依赖库开发

#### 2.1、Java型逻辑（Java静态方法）

##### 2.1.1、创建项目（maven archetype方式）

利用Maven项目模版功能创建项目

```bash
mvn archetype:generate -DgroupId=com.example -DartifactId=helloLib -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

将相关依赖库与插件安装时本地仓库

添加执行脚本

install.sh

```bash
#!/bin/bash

if [ -d "jar" ]; then
    subfolders=$(find jar -mindepth 1 -maxdepth 1 -type d)
    for folder in $subfolders; do
        install_script="$folder/install.sh"
        if [ -f "$install_script" ]; then
            echo "Adding execute permission to $install_script..."
            chmod +x $install_script
            echo "Executing $install_script in $folder..."
            (cd "$folder" &&./install.sh)
        else
            echo "install.sh not found in $folder"
        fi
    done
else
    echo "The 'jar' folder does not exist."
fi
```



执行脚本安装依赖

```bash
chmod +x install.sh
./install.sh
```





添加依赖pom.xml

```xml
<dependencies>
    <!-- 添加 -->
    <dependency>
        <artifactId>nasl-metadata-collector</artifactId>
        <groupId>com.netease.lowcode</groupId>
        <version>0.10.1</version>
        <optional>true</optional>
    </dependency>
    <!-- 添加 -->
</dependencies>
<build>
    <plugins>
        <!-- 添加 -->
        <plugin>
            <groupId>com.netease.lowcode</groupId>
            <artifactId>nasl-metadata-maven-plugin</artifactId>
            <version>1.4.3</version>
            <configuration>
                <jarWithDependencies>false</jarWithDependencies>
            </configuration>
            <executions>
                <execution>
                    <goals>
                        <goal>archive</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
        <!-- 添加 --->
    </plugins>
</build>
```

##### 2.1.2、  创建项目（脚手架方式）

![img](/Users/josephxia/codewave/codewave-architect-course/docs/development/assets/wps1.jpg) 

创建依赖库初始工程：https://libraryinitializr-community1.app.codewave.163.com/init

 

##### 2.1.3、创建扩展逻辑

![img](file:////Users/josephxia/Library/Containers/com.kingsoft.wpsoffice.mac/Data/tmp/wps-josephxia/ksohtml//wps2.jpg) 



```java
// src/main/java/codewave/logic/MyLogic.java
package com.example;

import com.netease.lowcode.core.annotation.NaslLogic;

/**
 * Hello world!
 *
 */
public class App {

    /**
     * 示例逻辑：相加
     * 
     * @param a
     * @param b
     * @return
     */
    @NaslLogic
    public static Integer add(Integer a, Integer b) {
        return a + b;
    }
}

```





 

 

##### 2.1.4、单元测试

添加测试用例pom.xml

```xml
  <dependency>
      <groupId>org.testng</groupId>
      <artifactId>testng</artifactId>
      <version>RELEASE</version>
      <scope>test</scope>
  </dependency>
```



```java
package com.codewave.logic;

import org.testng.annotations.Test;

import static org.testng.Assert.*;

public class MyLogicTest {

    @Test
    public void testAdd() {
        assert  MyLogic.add(1,2) == 3;
     }
}
```



##### 2.1.5、执行测试

```bash
mvn clean test
```

 

##### 2.1.7、打包

 ```bash
 mvn clean package
 ```



##### 2.1.8、 提交至私有仓库（规划中）

配置pom.xml

```xml
   <project>
    ...
     <distributionManagement>
       <repository>
         <id>private - repo - releases</id>
         <name>Private Repository - Releases</name>
         <url>http://your - private - repo - url/repository/maven - releases/</url>
       </repository>
       <snapshotRepository>
         <id>private - repo - snapshots</id>
         <name>Private Repository - Snapshots</name>
         <url>http://your - private - repo - url/repository/maven - snapshots/</url>
       </snapshotRepository>
     </distributionManagement>
    ...
   </project>
```



```bash
mvn deploy
```





 

##### 2.1.9、创建结构体

com.codewave.logic.MyStructure.java

```java
package com.codewave.logic;

import com.netease.lowcode.core.annotation.NaslStructure;

@NaslStructure
public class MyStructure {

    /**
     * 数字参数
     */
    public Integer num;

    /**
     * 结果参数
     */
    public String name;
}
```



在MyLogic.java中添加

```java
@NaslLogic
public static MyStructure getStructure(MyStructure myStructure) {
    return myStructure;
}
```

在MyLogicTest.java中添加


```java
@Test
public void testGetStructure() {
    MyStructure myStructure = new MyStructure();
    myStructure.name = "myName";
    myStructure.num = 666;
    MyStructure result = MyLogic.getStructure(myStructure);
    assert result.name == "myName";
    assert result.num == 666;
}
```

##### 2.1.10、创建自定义异常

创建MyException.java
```java

package com.codewave.logic;

public class MyException extends RuntimeException {

    public MyException(String message) {
        super(message);
    }
}

```


在MyLogic.java中
```java

@NaslLogic
public static MyStructure getStructure(MyStructure myStructure) {
    return myStructure;
}
```

在MyLogicTest.java中
```java
@Test
public void testGetStructure() {
    MyStructure myStructure = new MyStructure();
    myStructure.name = "myName";
    myStructure.num = 666;
    MyStructure result = MyLogic.getStructure(myStructure);
    assert result.name == "myName";
    assert result.num == 666;
}
```



##### 2.1.11、添加系统日志

pom.xml

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <scope>provided</scope>
     <version>1.7.30</version>
</dependency>
```



logic.java

```java
private static final Logger log = LoggerFactory.getLogger("LCAP_EXTENSION_LOGGER");
```





 

#### 2.2、Java型逻辑案例（Pinyin转换器）

pom.xml

```xml
<dependency>
  <groupId>com.belerweb</groupId>
  <artifactId>pinyin4j</artifactId>
  <version>2.5.1</version>
</dependency>
```





PinyinConverter.java

```java 

package com.codewave.pinyin;

import com.netease.lowcode.core.annotation.NaslLogic;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;


public class PinyinConverter {

    /**
     * 将汉字转换为拼音（全拼，小写，不带声调）
     *
     * @param chineseCharacters 要转换的汉字字符串
     * @return 拼音字符串
     */
    @NaslLogic
    public static String toPinyin(String chineseCharacters) {
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);

        StringBuilder pinyin = new StringBuilder();
        char[] charArray = chineseCharacters.toCharArray();
        for (char c : charArray) {
            try {
                if (Character.toString(c).matches("[\\u4e00-\\u9fff]")) {
                    String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(c, format);
                    if (pinyinArray!= null && pinyinArray.length > 0) {
                        pinyin.append(pinyinArray[0]);
                    }
                } else {
                    pinyin.append(c);
                }
            } catch (BadHanyuPinyinOutputFormatCombination e) {
                e.printStackTrace();
            }
        }
        return pinyin.toString();
    }

    /**
     * 将汉字转换为拼音首字母（大写）
     *
     * @param chineseCharacters 要转换的汉字字符串
     * @return 拼音首字母字符串
     */
    @NaslLogic
    public static String toFirstLetterPinyin(String chineseCharacters) {
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setCaseType(HanyuPinyinCaseType.UPPERCASE);
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);

        StringBuilder firstLetterPinyin = new StringBuilder();
        char[] charArray = chineseCharacters.toCharArray();
        for (char c : charArray) {
            try {
                if (Character.toString(c).matches("[\\u4e00-\\u9fff]")) {
                    String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(c, format);
                    if (pinyinArray!= null && pinyinArray.length > 0) {
                        firstLetterPinyin.append(pinyinArray[0].charAt(0));
                    }
                } else {
                    firstLetterPinyin.append(c);
                }
            } catch (BadHanyuPinyinOutputFormatCombination e) {
                e.printStackTrace();
            }
        }
        return firstLetterPinyin.toString();
    }
}
```



 

 

#### 2.3、SpringBean型逻辑

##### 4.1、升级为Spring项目

更改将项目的父项目改为

在 pom.xml 中

```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.9.RELEASE</version><!--与当前制品应用默认版本统一-->
    </parent>

     <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
       <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        
      </dependencies>
```







##### 4.2、创建Componet型逻辑

在 src/main/java/com/codewave/spring 中创建MyComponet.java

```java
package com.codewave.spring;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.netease.lowcode.core.annotation.NaslLogic;

/**
 * Hello world!
 *
 */
@Component
public class MyComponent {

    @Value("${myHost}")
    private String myHost;


    @Value("${spring.mongo.host}")
    private  String mongoHost;

    /**
     * 示例逻辑：相加
     * 
     * @param a
     * @param b
     * @return
     */
    @NaslLogic
    public Integer add2(Integer a, Integer b) {
        return a + b;
    }
}

```





测试用例

在 test/main/java/com/codewave/spring 中创建MyComponetTest.java

```java
package com.codewave.spring;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import ch.qos.logback.classic.LoggerContext;

import java.util.Objects;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = MyComponent.class)
@TestPropertySource(properties = { "extensions.helloLib.custom.myHost = 123.0.0.1" })
@TestPropertySource(properties = { "spring.mongo.host = 456.0.0.1" })
public class MyComponetTest {

    @Autowired
    private MyComponent myComponent;

    @BeforeAll
    public static void setup() {
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        loggerContext.getLogger("ROOT").setLevel(ch.qos.logback.classic.Level.OFF);
    }

    @Test
    public void testAdd() {
        int result = myComponent.add2(5, 3);
        assert result == 8;
    }

    @Test
    public void testGetMyConfig() {
        String myHost = myComponent.getMyHost();
        // assert Objects.equals(myHost, "123.0.0.1");

        String redisHost = myComponent.getMongoHost();
        assert Objects.equals(redisHost, "456.0.0.1");
    }
}

```





 

#### 2.4、自定义配置

```java

package com.codewave.spring;

import com.netease.lowcode.core.annotation.Environment;
import org.springframework.context.annotation.Configuration;

import com.netease.lowcode.core.annotation.NaslConfiguration;
import com.netease.lowcode.core.EnvironmentType;

@Configuration
public class MyConfig {

    /**
     * 我的主机Host
     */
    @NaslConfiguration(defaultValue = @Environment(type = EnvironmentType.DEV, value = "我的主机"))
    public String myHost;

    /**
     * MongoDB地址
     */
    @NaslConfiguration(systemScope = true, alias = "spring.mongo.host")
    public String mongoHost;

}

```





 

#### 2.4、SpringBean型逻辑案例（Redis库）

pom.xml

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>4.10.0</version>
    <scope>test</scope>
</dependency>
```





测试库

```
  host: 'redis-14018.c92.us-east-1-3.ec2.redns.redis-cloud.com',
  port: 14018,
  // username: 'default',
  // database: "Free-db",
  password: 'x15aid7gDK8HqtM4ipKn13oFzTOJTQE7'
```



 

### 3、连接器开发

 

 

 