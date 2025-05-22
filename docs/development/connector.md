# 连接器开发

## 一、概念原理
CodeWave平台的连接器是一种用于连接第三方服务、系统或数据源的工具。通过CodeWave平台的连接器，开发者可以在轻松地访问其他系统中的数据和功能，从而实现不同系统之间的数据交换和应用集成。

### 连接器分类
- 内置的系统连接器
  - 文件存储连接器
  - Apollo配置中心连接器
- 自定义连接器

  - 低码方式
    - 第三方API接入
    - 第三方回调（触发器）
    - SSE协议支持（AI对话流式输出）
  - 高码方式
    - 第三方Java依赖库对接
    - 订阅发布（例： MQ消息订阅）



## 二、使用场景
实现Http协议通讯方式的连接器可以使用高码方式展开。但如果使用其他类型的通讯协议比如mqtt、socket或者是直接通过调用第三方依赖库实现。这种情况适合采用高码方式开发连接器。

### 案例1：连接器

​	Redis连接器

### 案例2：连接器(订阅发布模式)	
​	RabbitMQ连接器


## 三、实操演练

### 开发环境准备

Codewave版本： 3.11

运行时环境：JDK： openjdk version "1.8.0_422"

构建工具： Maven: 3.9.9

开发工具： IDEA社区版 2024.2（仅当做编辑器使用，创建测试完全依赖于Maven）

版本控制： Git 2.39.3

源码位置：https://github.com/netease-lcap/codewave-architect-course/tree/main/example/connector

#### 创建项目

扩展依赖的项目是一个基于Maven构建的Java项目。和一般Java项目的区别是需要添加相应的依赖和生成元数据的Maven插件。

创建项目推荐使用脚手架模式创建。

脚手架地址：https://libraryinitializr-community1.app.codewave.163.com/init

![img](assets/wps1.jpg)

项目中可以选择Dependencies模块需要选择Spring环境： 支持创建Spring组件逻辑

如果一开始没有想好，为了扩展方便。推荐选择Spring环境。




#### 安装依赖库与插件

在下载的项目中 /jar 文件夹中包含一个插件和一个依赖库。

需要运行各种文件夹中的 install.sh 文件安装至本地仓库。

![image-20250507204625664](assets/image-20250507204625664.png)

也可以在根目录下安装一个install.sh脚本快速执行

```sh
#!/bin/bash

# 检查jar文件夹是否存在
if [ -d "jar" ]; then
    # 获取jar文件夹下的一层子文件夹列表
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



安装后可以运行

```bash
mvn clean package
```

确保环境搭建无误。




###  基础知识(Connector)

####  定义连接器

自定义一个类，在类上添加@NaslConnector注解，指定connectorKind，使用字母、数字或下划线组成，且以字母开头，kafka、redis、app已被官方使用，作为连接器的唯一标识。

连接器实现是多例的，建议都使用非静态方法、非静态成员变量（使用静态方法和成员变量打包也不会报错）

```java
package com.codewave.connector;
import com.netease.lowcode.core.annotation.NaslConnector;
import java.util.function.Function;

@NaslConnector(connectorKind = "myConnector")
public class MyConnector {

}

```



#### 定义创建逻辑(Creator)

自定义方法，添加`@NaslConnector.Creator`注解。

1. 入参只支持Boolean、Integer、Long、Double、String、LocalDate、LocalTime、ZonedDateTime、BigDecimal、List、Map。
2. 不支持自定义抛出异常（目前使用脚手架没有把抛出的异常信息打包到nasl），抛出异常使用RuntimeException。
3. 返回对象必须为当前类的实例对象，不建议使用单例模式，因为可以配置多个同一类型连接器。
4. 该方法需要能在main方法中进行调用，不依靠spring的自动注入。

```java
package com.codewave.connector;
import com.netease.lowcode.core.annotation.NaslConnector;
import java.util.function.Function;

@NaslConnector(connectorKind = "myConnector")
public class MyConnector {
  	private String appKey;
  	
  	// Add ....
    @NaslConnector.Creator
    public MyConnector initBean(String appKey) {
        MyConnector myConnector = new MyConnector();
        myConnector.appKey = appKey;
        return myConnector;
    }
}

```



#### 定义连通性测试(Tester)

自定义方法，添加`@NaslConnector.Tester`注解。

1. 入参的类型、顺序必须和@NaslConnector.Creator定义的方法一样，不一致会在连通性测试的时候报反射异常错误。
2. 不支持自定义抛出异常（目前使用脚手架没有把抛出的异常信息打包到nasl），抛出异常使用RuntimeException。
3. 返回对象必须为Boolean。



```java
package com.codewave.connector;
import com.netease.lowcode.core.annotation.NaslConnector;
import java.util.function.Function;

@NaslConnector(connectorKind = "myConnector")
public class MyConnector {
    private String appKey;
		
  	// Add ....
    @NaslConnector.Tester
    public Boolean test(String appKey) {
        if (null != appKey && appKey.equals("myAppKey")) {
            return true;
        }
        return false;
    }
}

```



#### 定义逻辑(Logic)

自定义一个类，在类上添加@NaslConnector注解，指定connectorKind，使用字母、数字或下划线组成，且以字母开头，kafka、redis、app已被官方使用，作为连接器的唯一标识。

连接器实现是多例的，建议都使用非静态方法、非静态成员变量（使用静态方法和成员变量打包也不会报错）。

```java


package com.codewave.connector;
import com.netease.lowcode.core.annotation.NaslConnector;
import java.util.function.Function;

@NaslConnector(connectorKind = "myConnector")
public class MyConnector {
  	// Add ....
    @NaslConnector.Logic
    public Integer add(Integer a, Integer b) {
        return a + b;
    }
}

```



#### 本地自测

```java
package com.codewave.connector;

import com.netease.lowcode.core.annotation.NaslConnector;

import java.util.function.Function;

@NaslConnector(connectorKind = "myConnector")
public class MyConnector {
  
  	// Add ....
    public static void main(String[] args) {
        MyConnector myConnector = new MyConnector().initBean("appKey");
        myConnector.test("appKey");
        Integer add = myConnector.add(1, 1);
}

```



#### 连接器发布

```bash
maven clean package
```



#### 订阅发布模式(Trigger触发器)

```java
package com.codewave.connector;

import com.netease.lowcode.core.annotation.NaslConnector;

import java.util.function.Function;

@NaslConnector(connectorKind = "myConnector")
public class MyConnector {
  
    public EventBus eventBus;

    @NaslConnector.Creator
    public MyConnector initBean(String appKey) {
        MyConnector myConnector = new MyConnector();
        myConnector.appKey = appKey;

        // 初始化事件总线
        myConnector.eventBus = new EventBus();

        return myConnector;
    }
  
    @NaslConnector.Trigger
    public void subscribe(String topic, Function<String, String> handle) {

        eventBus.subscribe(topic, handle);
    }
  
    public static class EventBus {
        private final Map<String, Queue<Function<String, String>>> subscribers = new ConcurrentHashMap<>();

        // 订阅事件，接收一个Function作为处理器
        public void subscribe(String eventType, Function<String, String> handler) {
            subscribers.computeIfAbsent(eventType, k -> new ConcurrentLinkedQueue<>())
                    .add(handler);
        }

        // 发布事件
        public void publish(String eventType, String message) {
            Queue<Function<String, String>> handlers = subscribers.get(eventType);
            if (handlers != null) {
                // 创建副本避免并发修改问题
                List<Function<String, String>> copy = new ArrayList<>(handlers);
                copy.forEach(handler -> {
                    try {
                        String result = handler.apply(message);
                        System.out.printf("事件 [%s] 处理结果: %s%n", eventType, result);
                    } catch (Exception e) {
                        System.err.printf("处理事件 [%s] 时出错: %s%n", eventType, e.getMessage());
                    }
                });
            }
        }
    }

    public static void main(String[] args) {
        MyConnector myConnector = new MyConnector().initBean("appKey");
        myConnector.test("appKey");
        Integer add = myConnector.add(1, 1);
        System.out.println("add result :" + add);

        // 订阅事件并处理消息
        myConnector.subscribe("news", message -> {
            System.out.println("收到新闻: " + message);
            return "消息已记录";
        });

        // 发布事件
        myConnector.eventBus.publish("news", "Java 21发布了");

    }
  
}

```





### 开发案例

#### 案例1：Redis连接器

- 实现setValue、getValue逻辑
- 利用Trigger实现消息订阅发布功能

```java

package com.codewave.connector;
import com.netease.lowcode.core.annotation.NaslConnector;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.function.Function;

/**
 * Redis 连接器，可连接第三方Redis服务并执行操作
 */
@NaslConnector(connectorKind = "redis_connector")
public class RedisConnector {

    private static final Logger logger = LoggerFactory.getLogger(RedisConnector.class);

    // RedisTemplate
    private RedisTemplate<String, String> redisTemplate;

    /**
     * 初始化 Redis 连接
     *
     * @param host     redis地址
     * @param port     redis端口
     * @param password redis密码
     * @param database redis数据库
     * @return
     */
    @NaslConnector.Creator
    public RedisConnector initRedisTemplate(String host, Integer port, String password, Integer database) {
        // 初始化 RedisConnector
        RedisConnector redisTool = new RedisConnector();
        // 初始化 RedisStandaloneConfiguration
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setPort(port);
        redisStandaloneConfiguration.setDatabase(database);
        redisStandaloneConfiguration.setHostName(host);
        redisStandaloneConfiguration.setPassword(password);

        // 初始化 LettuceConnectionFactory 作用：创建 Redis 连接
        LettuceConnectionFactory redisConnectionFactory = new LettuceConnectionFactory(redisStandaloneConfiguration);
        redisConnectionFactory.afterPropertiesSet();

        // 初始化 RedisTemplate 作用：设置序列化器
        RedisTemplate<String, String> _redisTemplate = new RedisTemplate<>();
        _redisTemplate.setConnectionFactory(redisConnectionFactory);
        _redisTemplate.setKeySerializer(new StringRedisSerializer());
        _redisTemplate.setValueSerializer(new StringRedisSerializer());
        _redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        _redisTemplate.setHashValueSerializer(new StringRedisSerializer());
        _redisTemplate.afterPropertiesSet();
        redisTemplate = _redisTemplate;
        redisTool.redisTemplate = _redisTemplate;
        return redisTool;
    }

    /**
     * 测试链接是否可用，如果可用，则返回 true，否则返回 false
     *
     * @param host     redis地址
     * @param port     redis端口
     * @param password redis密码
     * @param database redis数据库
     * @return
     */
    @NaslConnector.Tester
    public Boolean testConnection(String host, Integer port, String password, Integer database) {
        // 初始化 RedisURI
        RedisURI redisURI = RedisURI.Builder.redis(host, port).withPassword(password).withDatabase(database).withTimeout(Duration.of(3, ChronoUnit.SECONDS)).build();
        // 初始化 RedisClient
        RedisClient client = RedisClient.create(redisURI);
        try (StatefulRedisConnection<String, String> connect = client.connect()) {
            // 测试链接是否可用
            String pong = connect.sync().ping();
            logger.info("测试链接是否可用：{}", pong);
            return "PONG".equals(pong);
        } catch (Exception e) {
            return false;
        } finally {
            // 连通性测试后关闭连接
            client.shutdown();
        }
    }

    /**
     * 关闭redis连接
     */
    public void close() throws Exception {
        if (redisTemplate != null) {
            // 获取连接工厂
            RedisConnectionFactory connectionFactory = redisTemplate.getConnectionFactory();
            if (connectionFactory != null) {
                // 关闭连接
                connectionFactory.getConnection().close();
                if (connectionFactory instanceof DisposableBean) {
                    try {
                        // 关闭连接工厂， 连接工厂也需要关闭，要不然连接池不会回收
                        ((DisposableBean) connectionFactory).destroy();
                    } catch (Exception closeException) {
                        throw closeException;
                    }
                }
            }
        }
    }

    /**
     * 指定 key 的值为指定字符串
     *
     * @param key
     * @param value
     * @return
     */
    @NaslConnector.Logic
    public String setValue(final String key, final String value) {
        redisTemplate.opsForValue().set(key, value);
        return value;
    }

    /**
     * 删除指定的key
     *
     * @param key
     */
    @NaslConnector.Logic
    public Boolean deleteKey(final String key) {
        redisTemplate.delete(key);
        return true;
    }

    /**
     * 获取指定key的值
     *
     * @param key
     * @return
     */
    @NaslConnector.Logic
    public String getValue(final String key) {
        return redisTemplate.opsForValue().get(key);
    }

    /**
     * 发布消息
     *
     * @param channel
     * @param msg
     */
    @NaslConnector.Logic
    public String publish(String channel, String msg) {
        logger.info("向通道发布消息 {}: {}", channel, msg);
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(redisTemplate.getConnectionFactory());
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new StringRedisSerializer());
        template.afterPropertiesSet();
        template.convertAndSend(channel, msg);
        return  "";
    }

    /**
     * 订阅消息
     *
     * @param channel    订阅的频道
     * @param handleMsg  消息处理函数
     */
    @NaslConnector.Trigger
    public String subscribe(String channel, Function<String, String> handleMsg) {
        logger.info("订阅通道: {}", channel);

        // 获取连接工厂
        RedisConnectionFactory connectionFactory = redisTemplate.getConnectionFactory();

        // 创建订阅者监听器
        MessageListener listener = (message, pattern) -> {
            String channelStr = new String(message.getChannel(), StandardCharsets.UTF_8);
            String msg = new String(message.getBody(), StandardCharsets.UTF_8);
            logger.info("从通道接收消息 {}: {}", channelStr, msg);
            handleMsg.apply(msg);
        };

        // 创建 Jedis 连接并订阅
        connectionFactory.getConnection().subscribe(listener, channel.getBytes(StandardCharsets.UTF_8));
        return "订阅成功";
    }

    public static void main(String[] args) {
//                "redis-12394.c14.us-east-1-2.ec2.redns.redis-cloud.com",
//                12394,
//                "1plK8zieFHUyLPRupPk0OQnJE51b7Xrw"

        // 初始化 RedisConnector
        RedisConnector redisTool = new RedisConnector().initRedisTemplate("127.0.0.1", 6379, "abc1234", 0);

        // 测试链接是否可用
        Boolean testConnection = redisTool.testConnection("127.0.0.1", 6379, "abc1234", 0);
        System.out.println("测试Redis连接，结果为： " + testConnection);

        // 订阅消息
        redisTool.subscribe("test-channel", message -> {
            System.out.println("收到的消息: " + message);
            return message;
        });

        // 发布消息
        redisTool.publish("test-channel", "Hello, Redis!");

        // 为了保持主线程不退出，可以添加一个等待
        try {
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

```












## 四、实现原理



