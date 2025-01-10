package com.codewave.connector;

import com.netease.lowcode.core.annotation.NaslConnector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPubSub;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Function;

@NaslConnector(connectorKind = "redisConnector")
public class RedisConnector {

    private static final Logger log = LoggerFactory.getLogger(RedisConnector.class);

    private Jedis jedis;

    /**
     * 初始化Redis
     * @param host 地址
     * @param port 端口
     * @param password 密码
     * @return
     */
    @NaslConnector.Creator
    public RedisConnector initRedis(String host, Integer port, String password) {
        RedisConnector redisConnector = new RedisConnector();
        jedis = new Jedis(host, port);
        // 进行认证（如果设置了密码）
        jedis.auth(password);
        // 选择使用的数据库（这里选择第0个数据库，可按需更改）
//        jedis.select(0);
        return redisConnector;
    }

    /**
     * 测试链接
     * @param host 地址
     * @param port 端口
     * @param password 密码
     * @return true:成功，false:失败
     */
    @NaslConnector.Tester
    public Boolean testConnection(String host, Integer port, String password) {
        jedis = new Jedis(host, port);
        // 进行认证（如果设置了密码）
        jedis.auth(password);
        return jedis.ping().equals("PONG");
    }


    @NaslConnector.Logic
    public Integer publish(String channel, String msg ) {
        jedis.publish(channel,msg);
        return 0;
    }



    @NaslConnector.Trigger
    public void subscribe(String channel, Function<String, String> handleMsg) {
        // 自定义JedisPubSub的子类，用于处理订阅相关逻辑
        JedisPubSub pubSub = new JedisPubSub() {
            // 重写onMessage方法，当接收到消息时调用Function接口的方法来处理消息
            @Override
            public void onMessage(String channel, String message) {

                String processedMessage = handleMsg.apply(message);
                log.debug("处理后的消息: " + processedMessage);
            }
        };

        // 开始订阅频道
        jedis.subscribe(pubSub, channel);
        jedis.close();

    }



    public static void main(String[] args) {

        // 验证联通性方法
        test();

        // 异步测试 订阅发布
        asyncTest();


    }

    public static void test() {
        RedisConnector connector = new RedisConnector();
        // 测试链接
        Boolean ret = connector.testConnection(
                "redis-12394.c14.us-east-1-2.ec2.redns.redis-cloud.com",
                12394,
                "1plK8zieFHUyLPRupPk0OQnJE51b7Xrw"
        );

        log.debug("testConnection : "+ ret.toString());
    }


    private static void asyncTest() {


        // 创建一个线程池，用于同时执行发布者和订阅者逻辑（这里使用固定大小为2的线程池，可根据需求调整）
        ExecutorService executorService = Executors.newFixedThreadPool(2);

        // 提交订阅者任务到线程池
        executorService.submit(() -> {
            subscribe();
        });

        // 稍作延迟，确保订阅者先启动并准备好接收消息（这里简单延迟1秒，可按需调整）
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 提交发布者任务到线程池
        executorService.submit(() -> {
            publish();
        });

        // 关闭线程池，等待发布和订阅任务执行完成（这里设置了等待超时时间为5秒，可按需调整）
        try {
            executorService.shutdown();
            if (!executorService.awaitTermination(5, java.util.concurrent.TimeUnit.SECONDS)) {
                System.err.println("发布和订阅任务执行超时");
                System.exit(0);
            }
        } catch (InterruptedException e) {
            System.err.println("线程池关闭被中断");
            e.printStackTrace();
        }

    }



    private static void subscribe() {
        RedisConnector connector = new RedisConnector();
        connector.initRedis(
                "redis-12394.c14.us-east-1-2.ec2.redns.redis-cloud.com",
                12394,
                "1plK8zieFHUyLPRupPk0OQnJE51b7Xrw"
        );

        // 测试链接
//        Boolean ret = connector.testConnection();
//        log.debug("testConnection : "+ ret.toString());

        Function<String, String> handleMsg = msg -> {
            log.debug("handleMsg receive msg==> "+ msg);
            return "handleMsg retrun " ;
        };

        log.debug("subscribe...");
        connector.subscribe("test",handleMsg);
    }


    private static void publish() {
        RedisConnector connector = new RedisConnector();
        connector.initRedis(
                "redis-12394.c14.us-east-1-2.ec2.redns.redis-cloud.com",
                12394,
                "1plK8zieFHUyLPRupPk0OQnJE51b7Xrw"
        );

        // 测试链接
//        Boolean ret = connector.testConnection();
//        log.debug("testConnection: "+ ret.toString());
        log.debug("publish...abc");
        // 订阅消息
        connector.publish("test","abc");
    }
}
