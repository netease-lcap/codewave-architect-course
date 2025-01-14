
package com.codewave.connector;
import com.netease.lowcode.core.annotation.NaslConnector;
<<<<<<< HEAD
import io.lettuce.core.RedisFuture;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;
import io.lettuce.core.pubsub.RedisPubSubAdapter;
import io.lettuce.core.pubsub.RedisPubSubListener;
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection;
import io.lettuce.core.pubsub.api.async.RedisPubSubAsyncCommands;

import java.util.concurrent.CompletableFuture;
import java.util.function.Function;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.pubsub.api.reactive.RedisPubSubReactiveCommands;
import io.lettuce.core.pubsub.api.sync.RedisPubSubCommands;
=======
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.pubsub.RedisPubSubListener;
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
>>>>>>> redis-template

import java.io.IOException;
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
     * @param message
     */
    @NaslConnector.Logic
<<<<<<< HEAD
    public Long publish(String channel, String msg ) {

        // 获取连接
        StatefulRedisConnection<String, String> connection = client.connect();

        // 获取同步命令对象
        RedisCommands<String, String> commands = connection.sync();

        // 向指定频道发布消息
        return commands.publish(channel, msg);
    }

        @NaslConnector.Trigger
    public void subscribe(String channel, Function<String, String> handleMsg) throws InterruptedException {

// 官方文档写法
            StatefulRedisPubSubConnection<String, String> connection = client.connectPubSub();

//            connection.addListener(new RedisPubSubAdapter<String, String>() {
//                @Override
//                public void message(String channel, String message) {
//                    // 处理接收到的消息
//                    System.out.println("Received message from channel " + channel + ": " + message);
//                    // 处理消息的逻辑
//                    String processedMessage = handleMsg.apply(message);
//                    System.out.println("Processed message: " + processedMessage);
//                }
//            });

            // 官方文档写法
            RedisPubSubCommands<String, String> sync = connection.sync();
            sync.getStatefulConnection().addListener(new RedisPubSubAdapter<String,String>() {
                @Override
                public void message(String channel, String message) {
                    // 处理接收到的消息
                    System.out.println("Received message from channel " + channel + ": " + message);
                    // 处理消息的逻辑
                    String processedMessage = handleMsg.apply(message);
                    System.out.println("Processed message: " + processedMessage);
                }
            });
            sync.subscribe(channel);

// async链接
//            RedisPubSubAsyncCommands<String, String> pubsubCmd = connection.async();
//            pubsubCmd.psubscribe(channel);
//            pubsubCmd.psubscribe("CH2");
//            pubsubCmd.unsubscribe("CH");


//            System.out.println("publish %s ");
            // Reactive Redis
//            StatefulRedisPubSubConnection<String, String> connection = client.connectPubSub();
//            RedisPubSubReactiveCommands<String, String> reactive = connection.reactive();
//            reactive.subscribe(channel).subscribe();
//            reactive.observeChannels().doOnNext(patternMessage -> {
//                System.out.println("Received message from channel " + patternMessage.getChannel() + ": " + patternMessage.getMessage());
//            }).subscribe();
    }


//
//
//
//    @NaslConnector.Trigger
//    public void subscribe(String channel, Function<String, String> handleMsg) {
//        // 自定义JedisPubSub的子类，用于处理订阅相关逻辑
//        JedisPubSub pubSub = new JedisPubSub() {
//            // 重写onMessage方法，当接收到消息时调用Function接口的方法来处理消息
//            @Override
//            public void onMessage(String channel, String message) {
//
//                String processedMessage = handleMsg.apply(message);
//                log.debug("处理后的消息: " + processedMessage);
//            }
//        };
//
//        // 开始订阅频道
//        jedis.subscribe(pubSub, channel);
//        jedis.close();
//
//    }



    public static void main(String[] args) throws InterruptedException {
        // 远程地址
//        String host = "redis-12394.c14.us-east-1-2.ec2.redns.redis-cloud.com";
//        int port = 12394;
//        String password = "1plK8zieFHUyLPRupPk0OQnJE51b7Xrw";

        String host = "localhost";
        int port = 6379;
        String password = "abc1234";


        RedisConnector connector = new RedisConnector();
        // 测试链接
//        Boolean ret = connector.testConnection(
//                "redis-12394.c14.us-east-1-2.ec2.redns.redis-cloud.com",
//                12394,
//                "1plK8zieFHUyLPRupPk0OQnJE51b7Xrw"
//        );
//        System.out.println("test: " + ret.toString());
=======
    public void publish(String channel, String message) {
        logger.info("向通道发布消息 {}: {}", channel, message);
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(redisTemplate.getConnectionFactory());
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new StringRedisSerializer());
        template.afterPropertiesSet();
        template.convertAndSend(channel, message);
    }

    /**
     * 订阅消息
     *
     * @param channel    订阅的频道
     * @param handleMsg  消息处理函数
     */
    @NaslConnector.Trigger
    public void subscribe(String channel, Function<String, String> handleMsg) {
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
    }

    public static void main(String[] args) {
        // 初始化 RedisConnector
        RedisConnector redisTool = new RedisConnector().initRedisTemplate("127.0.0.1", 6379, "abc1234", 0);

        // 测试链接是否可用
        Boolean testConnection = redisTool.testConnection("127.0.0.1", 6379, "abc1234", 0);
        System.out.println("测试Redis连接，结果为： " + testConnection);
>>>>>>> redis-template

        // 订阅消息
        redisTool.subscribe("test-channel", message -> {
            System.out.println("收到的消息: " + message);
            return message;
        });

<<<<<<< HEAD
        connector = connector.initRedis(
               host,port,password
        );

//        String ret2 = connector.setValue("fff","123");
//        System.out.println("setValue:..: "+ ret2 );
//
//        String ret3 = connector.getValue("abc");
//        System.out.println("getValue:..: "+ ret3 );

        connector.subscribe("tset", msg -> {
            System.out.println("handleMsg receive msg==> "+ msg);
            return "handleMsg retrun " ;
        });
        System.out.println("subscribe...test");

//        RedisConnector connector2 = new RedisConnector();
//        connector2 = connector2.initRedis(
//                host,port,password
//        );
//        Thread.sleep(4000);
//        connector2.publish("test","dddd");
//        System.out.println("publish...ccc");

        // 为了演示，让程序运行一段时间
        Thread.sleep(20000);


=======
        // 发布消息
        redisTool.publish("test-channel", "Hello, Redis!");
>>>>>>> redis-template

        // 为了保持主线程不退出，可以添加一个等待
        try {
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
