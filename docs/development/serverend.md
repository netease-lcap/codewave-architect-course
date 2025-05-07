# 服务端扩展

## 一、使用场景

1.  用户需要调用第三方库pinyin4j实现汉字与拼音的转换
2. 用户需要调用redisTemplate(Spring模版)实现redis接入，连接参数要求可以在平台参数配置


## 二、概念原理



在 Java 项目里，为提升研发效率，常常会引入第三方依赖库。以汉字转拼音功能为例，只需引入一个拼音相关的第三方依赖库，就能轻松实现这一操作。
​            ![img](assets/93f9c8fcd042423bbba42f2b2c1a5920.png)   
CodeWave 编写的项目的服务会端编译成 Java 程序，所以也能实现通过第三方依赖库的实现逻辑扩展。区别在于需要添加元数据定义来精准描述 API 定义。

元数据的作用主要是为了描述API接口信息，比如方法名称、作用、参数类型等。低代码平台会根据元数据将API图形化的形式显示在编辑器中。


![image-20250506162035734](assets/image-20250506162035734.png)

在依赖库开发过程中，可以借助专用的Maven插件生成。

比如，若要引入 `Pinyin4j.jar` 这个依赖库，可按以下步骤操作。

1. 创建一个方法，该方法的作用是封装 `Pinyin4j.jar 中的 API；
2. 使用的注解、 JavaDoc 来标注接口信息，

3. 使用 Maven 进行编译，在编译过程中元数据插件会将注解和 JavaDoc 转换为元数据（ JSON形式 ）；

4. 将元数据与编译后的字节码文件打包成扩展依赖库，（zip 格式）。
5. 将依赖库上传至CodeWave资产中心；
6. 在需要时只需要引入应用就可以在【调用逻辑】中找到并调用了。



代码实例如下：

```java
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
}

```





​            ![img](assets/14d2ddd6191447cbaeed9a30c3d6455e.png)        



​            ![img](assets/d44368e5fe58422889256c8d3f36b45a.png)



## 三、案例展示



### 1、Java静态方法型（第三方Jar封装）

第三方的API封装是最常见的一种应用场景。也就是说将API封装为服务端逻辑。

由于服务端逻辑本身是一个无状态的静态函数，所以自定义的逻辑也应该编写成java静态方法。

需要加入@NaslLogic注解表示需要导出为扩展逻辑方法。

使用JavaDoc对方法作用与参数进行描述，这些描述会直接转化为元数据。

```java
public class PinyinConverter {

    /**
     * 将汉字转换为拼音（全拼，小写，不带声调）
     *
     * @param chineseCharacters 要转换的汉字字符串
     * @return 拼音字符串
     */
    @NaslLogic
    public static String toPinyin(String chineseCharacters) {
        // 代码实现
    }
}

```



完整代码示例： 

https://github.com/netease-lcap/codewave-architect-course/tree/main/example/java_lib/src/main/java/com/codewave/pinyin



### 2、Component组件型 - Redis库

在封装redis库的时候并不能适用java静态方法类型原因有两点：

1. 希望通过注入 redisTemplate 实现，静态方法无法实现依赖注入；
2. 希望实现自定义配置，平台中的自定义配置是通过spring配置类实现的，也无法在静态方法中读取。

所以就需要采用Component组件形式进行封装。

```java
@Component
public class RedisService {

    @Autowired
    @Lazy // 延迟加载 如果不使用此依赖库时可以不配置redis连接参数
    public RedisTemplate<String, String> redisTemplate;

    public RedisService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * 设置 Redis 中指定 key 的值为指定字符串
     *
     * @param key   Redis 中的键
     * @param value Redis 中的值
     */
    @NaslLogic
    public String getValue(String key) {
        return redisTemplate.opsForValue().get(key);
    }
}

```



在实例化RedisTemplate时会需要注入系统配置，可以通过如下方式定义，

```java
@Configuration
public class RedisConfig {

    /**
     * redis 地址
     */
    @NaslConfiguration(systemScope= true, alias="spring.redis.host",defaultValue = {
            @Environment(type = EnvironmentType.DEV, value = "127.0.0.1"),
            @Environment(type = EnvironmentType.ONLINE, value = "127.0.0.1")
    })
    public String redisHost;

    /**
     * redis 端口
     */
    @NaslConfiguration(systemScope= true, alias="spring.redis.port",defaultValue = {
            @Environment(type = EnvironmentType.DEV, value = "6379"),
            @Environment(type = EnvironmentType.ONLINE, value = "6379")
    })
    public String redisPort;

    /**
     * redis 密码
     */
    @NaslConfiguration(systemScope= true, alias="spring.redis.password",defaultValue = {
            @Environment(type = EnvironmentType.DEV, value = ""),
            @Environment(type = EnvironmentType.ONLINE, value = "")
    })
    public String password;
}
```



完整代码示例：

> https://github.com/netease-lcap/codewave-architect-course/tree/main/example/java_lib/src/main/java/com/codewave/redis



### 3、Filter组件型 

​	安全校验

### 4、Controller组件型

​	大文件文件上传、Restful接口

### 5、AOP切面型

​	数据库脱敏、接口日志

### 6、上下文调整

​	自定义应用配置

### 7、高阶函数

​	并行处理、运行时定时任务、调用低代码逻辑



### 8、 逻辑复写型







## 四、服务端扩展的本质	











## 五、实操演示

### 1、 开发环境（JDK1.8 + Maven + Idea）

Codewave版本： 3.11

运行时环境：JDK： openjdk version "1.8.0_422"

构建工具： Maven: 3.9.9

开发工具： IDEA社区版 2024.2（仅当做编辑器使用，创建测试完全依赖于Maven）

版本控制： Git 2.39.3

源码位置：https://github.com/netease-lcap/codewave-architect-course/tree/main/example/java_lib

 

### 2、利用脚手架创建项目 

扩展依赖的项目是一个基于Maven构建的Java项目。和一般Java项目的区别是需要添加相应的依赖和生成元数据的Maven插件。

创建项目推荐使用脚手架模式创建。

脚手架地址：https://libraryinitializr-community1.app.codewave.163.com/init



![img](assets/wps1.jpg) 

项目中可以选择Dependencies模块：

- basic： 只支持创建静态Java型扩展逻辑
- Spring环境： 支持创建Spring组件逻辑

如果一开始没有想好，为了扩展方便。推荐选择Spring环境。

其余 artifact、group、version等参数就是Maven中pom文件中的包信息的参数，这里不过多啊赘述



 

### 3、创建Java静态方法型逻辑（Helloworld）

![img](assets/wps2.jpg) 

在 src/main/java/codewave/logic/MyLogic.java 中创建Class编写静态方法add

```java
// 
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

###  4、单元测试

扩展逻辑可以在Maven环境中像普通java方法一样进行单元测试。

在pom.xml中添加测试库

```xml
  <dependency>
      <groupId>org.testng</groupId>
      <artifactId>testng</artifactId>
      <version>RELEASE</version>
      <scope>test</scope>
  </dependency>
```

在 src/test/java/codewave/logic 中创建 MyLogicTest.java 测试类

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

使用maven命令进行测试

```bash
mvn clean test
```

 

### 5、依赖库打包 

使用 maven 命令部署

 ```bash
 mvn clean package
 ```

![Xnip2025-05-06_18-44-32](assets/Xnip2025-05-06_18-44-32.jpg)



### 6、创建结构体

如果参数或返回值类型不是基本类型需要定义结构体。

方式是使用 @NaslStructure 注解。

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

在MyLogicTest.java中编写测试用例


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

### 7、创建自定义异常

如果需要自定义异常时候可以创建异常类，异常类需要继承 RuntimeException 基

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
// @NaslLogic(enhance = false)
public static String throwMyException(Integer value)
        throws MyException {
    if (value < 0) {
        throw new MyException("");
    }
    return "";
}
```

在MyLogicTest.java中编写测试用例
```java
@Test
public void testThrowMyException() {
    try {
        MyLogic.throwMyException(-1);
    } catch (MyException e) {
        // 捕获到异常Error
        return;
    }
    // 如果没有捕获到异常，则测试失败
    throw new AssertionError("testThrowMyException  Error");

}
```



### 8、添加系统日志

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





### 9、Java静态方法型案例（Pinyin转换器）



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



 

 

### 10、创建Component组件型逻辑

如果需要使用Spring的IOC机制注入bean或者配置，可以创建Component类型的扩展逻辑。

比如下面例子希望注入 myHost 和 spring.mongo.host 参数。

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
  
  
    /**
     * 获取MyHost
     * @return
     */
    @NaslLogic
    public String getMyHost() {
        return myHost;
    }

    /**
     * 获取MyRedisHost
     * @return
     */
    @NaslLogic
    public String getMongoHost() {
        return mongoHost;
    }
  
}

```



创建测试用例

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





### 11、创建自定义配置

使用 @NaslConfiguration 可以实现自定义参数，在应用加载依赖库后可以在应用配置中进行配置。


```java

package com.codewave.spring;

import com.netease.lowcode.core.annotation.Environment;
import org.springframework.context.annotation.Configuration;

import com.netease.lowcode.core.annotation.NaslConfiguration;
import com.netease.lowcode.core.EnvironmentType;

@Configuration
public class MyConfig {

    /**
     * 我的主机Host(自定义参数)
     */
    @NaslConfiguration(defaultValue = @Environment(type = EnvironmentType.DEV, value = "我的主机"))
    public String myHost;
}

```


![image-20250506194336639](assets/image-20250506194336639.png)

如果想将自定义参数映射为系统参数可以使用 alias 属性实现。

```java

package com.codewave.spring;

import com.netease.lowcode.core.annotation.Environment;
import org.springframework.context.annotation.Configuration;

import com.netease.lowcode.core.annotation.NaslConfiguration;
import com.netease.lowcode.core.EnvironmentType;

@Configuration
public class MyConfig {

    /**
     * MongoDB地址
     */
    @NaslConfiguration(systemScope = true, alias = "spring.mongo.host")
    public String mongoHost;

}

```


![Xnip2025-05-06_19-39-32](assets/WX20250506-194129.png)





 

### 12、Component组件型逻辑案例（Redis库）

![Xnip2025-05-06_19-39-32](assets/Xnip2025-05-06_19-39-32-6531762.jpg)


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

 

 

 