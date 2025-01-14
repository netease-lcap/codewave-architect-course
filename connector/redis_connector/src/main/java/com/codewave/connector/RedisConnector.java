package com.netease.cloud;

import com.netease.lowcode.core.annotation.NaslConnector;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * Redis 连接器，可连接第三方Redis服务并执行操作
 */
@NaslConnector(connectorKind = "redis")
public class RedisConnector {
    private RedisTemplate<String, String> redisTemplate;

    private RedisMessageListenerContainer container;

    /**
     * 将 Redis 中指定 key 的值增加指定的浮点数 delta
     *
     * @param key   Redis 中的键
     * @param delta 增加的浮点数值
     * @return 增加后的结果值
     */
    /*public Double incrementDouble(String key, Double delta) {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        return ops.increment(key, delta);
    }*/
    public static String convertToJsonString(String input) {
        return input.replace("\\", "");
    }

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
        RedisConnector redisTool = new RedisConnector();
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setPort(port);
        redisStandaloneConfiguration.setDatabase(database);
        redisStandaloneConfiguration.setHostName(host);
        redisStandaloneConfiguration.setPassword(password);

        LettuceConnectionFactory redisConnectionFactory = new LettuceConnectionFactory(redisStandaloneConfiguration);
        redisConnectionFactory.afterPropertiesSet();
        RedisTemplate<String, String> _redisTemplate = new RedisTemplate<>();
        _redisTemplate.setConnectionFactory(redisConnectionFactory);
        _redisTemplate.setKeySerializer(new StringRedisSerializer());
        _redisTemplate.setValueSerializer(new StringRedisSerializer());
        _redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        _redisTemplate.setHashValueSerializer(new StringRedisSerializer());
        _redisTemplate.afterPropertiesSet();
        redisTemplate = _redisTemplate;
        redisTool.redisTemplate = _redisTemplate;

        redisTool.container = new RedisMessageListenerContainer();
        redisTool.container.setConnectionFactory(redisConnectionFactory);

        return redisTool;
    }

    /**
     * 获取key对应的字符串值
     *
     * @param key
     * @return
     */
    @NaslConnector.Logic
    public String getValue(final String key) {
        Object value = redisTemplate.opsForValue().get(key);
        if (value == null) {
            return null;
        }
        return String.valueOf(value);
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

    public void publishMessage(String topic, String message) {
        redisTemplate.convertAndSend(topic, message);
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
        RedisURI redisURI = RedisURI.Builder.redis(host, port).withPassword(password).withDatabase(database).withTimeout(Duration.of(3, ChronoUnit.SECONDS)).build();
        RedisClient client = RedisClient.create(redisURI);
        try (StatefulRedisConnection<String, String> connect = client.connect()) {
            String pong = connect.sync().ping();
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



    // 创建消息监听容器
    public RedisMessageListenerContainer addMessageListener(String topic) {
        container.addMessageListener(new MessageListenerAdapter(new MessageListener()), new ChannelTopic(topic));
        return container;
    }


    // 自定义的消息监听器类
    public static class MessageListener {
        public void handleMessage(String message) {
            System.out.println("Received message: " + message);
        }
    }


    public static void  main(String [] args) throws InterruptedException {
        RedisConnector redisConnector = new RedisConnector();
        Boolean isOK = redisConnector.testConnection("localhost",6379,"abc1234",0);
        System.out.println("connection: " + isOK);

        redisConnector = redisConnector.initRedisTemplate("localhost",6379,"abc1234",0);
//        String v = redisConnector.getValue("abc");
//        System.out.println("getValue: " + v);


        redisConnector.addMessageListener("test");

        System.out.println("addMessageListener====");

        Thread.sleep(20000);
    }
}