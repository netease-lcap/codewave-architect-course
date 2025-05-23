
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

        String host = "redis-13102.c90.us-east-1-3.ec2.redns.redis-cloud.com";
        int port = 13102;
        String password = "Mrv5yHF7KhnBIguqddBADZ7yl8khm4p5";
        int database = 0;

        // 初始化 RedisConnector
        RedisConnector redisTool = new RedisConnector().initRedisTemplate(host,port,password,database);

        // 测试链接是否可用
        Boolean testConnection = redisTool.testConnection(host,port,password,database);
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
