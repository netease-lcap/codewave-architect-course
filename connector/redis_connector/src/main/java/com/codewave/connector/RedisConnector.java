package com.codewave.connector;

import com.netease.lowcode.core.annotation.NaslConnector;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;
import io.lettuce.core.pubsub.RedisPubSubAdapter;
import io.lettuce.core.pubsub.RedisPubSubListener;
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection;
import io.lettuce.core.pubsub.api.async.RedisPubSubAsyncCommands;
import java.util.function.Function;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.pubsub.api.sync.RedisPubSubCommands;

@NaslConnector(connectorKind = "redisConnector")
public class RedisConnector {

    private RedisClient client;


    /**
     * 初始化Redis
     * @param host 地址
     * @param port 端口
     * @param password 密码
     * @return
     */
    @NaslConnector.Creator
    public RedisConnector initRedis(String host, Integer port, String password) {
        RedisConnector connector = new RedisConnector();
        // 创建RedisURI对象，设置连接信息
        RedisURI redisURI = RedisURI.builder()
                .withHost(host)
                .withPort(port)
                .withPassword(password.toCharArray())
                .build();
        // 创建Redis客户端
        connector.client  = RedisClient.create(redisURI);

        return connector;
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
        RedisURI redisURI = RedisURI.builder()
                .withHost(host)
                .withPort(port)
                .withPassword(password.toCharArray())
                .build();
        // 创建Redis客户端
        RedisClient redisClient = RedisClient.create(redisURI);

        // 获取连接
        StatefulRedisConnection<String, String> connection = redisClient.connect();

        // 获取发布订阅相关的命令操作对象
        RedisCommands<String, String> pubSubCommands = connection.sync();

        return pubSubCommands.ping().equals("PONG");
    }


    /**
     * 指定 key 的值为指定字符串
     * @param key
     * @param value
     * @return
     */
    @NaslConnector.Logic
    public String setValue(String key, String value ) {

        // 获取连接
        StatefulRedisConnection<String, String> connection = client.connect();

        // 获取发布订阅相关的命令操作对象
        RedisCommands<String, String> commands = connection.sync();
       return commands.set(key, value);
    }

    /**
     * 获取key对应的字符串值
     * @param key
     * @return
     */
    @NaslConnector.Logic
    public String getValue(String key ) {

        // 获取连接
        StatefulRedisConnection<String, String> connection = client.connect();

        // 获取发布订阅相关的命令操作对象
        RedisCommands<String, String> commands = connection.sync();
        return commands.get(key);
    }


    @NaslConnector.Logic
    public Long publish(String channel, String msg ) {

        // 获取连接
        StatefulRedisConnection<String, String> connection = client.connect();

        // 获取同步命令对象
        RedisCommands<String, String> commands = connection.sync();

        // 向指定频道发布消息，频道为"test-channel"，消息内容为"Hello from publisher!"
        return commands.publish(channel, msg);
    }

        @NaslConnector.Trigger
    public void subscribe(String channel, Function<String, String> handleMsg) {


            // 获取发布订阅连接
//            StatefulRedisPubSubConnection<String, String> connection = client.connectPubSub();
//
//            // 获取异步发布订阅命令对象
//            RedisPubSubAsyncCommands<String, String> commands = connection.async();
////
////
////            // 添加监听器
////            commands.addListener(listener);
//
//            // 获取发布订阅相关的命令操作对象
////            RedisPubSubCommands<String, String> pubSubCommands = connection.sync();
//
//            // 创建订阅者适配器，用于处理接收到的消息等事件
//            RedisPubSubAdapter<String, String> listener = new RedisPubSubAdapter<>() {
//                @Override
//                public void message(String channel, String message) {
//                    handleMsg.apply(message);
////                    System.out.println("收到消息，频道: " + channel + ", 消息内容: " + message);
//                }
//            };

            // 订阅频道
//            commands.subscribe(channel);


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



    public static void main(String[] args) {

        RedisConnector connector = new RedisConnector();
        // 测试链接
        Boolean ret = connector.testConnection(
                "redis-12394.c14.us-east-1-2.ec2.redns.redis-cloud.com",
                12394,
                "1plK8zieFHUyLPRupPk0OQnJE51b7Xrw"
        );
        System.out.println("test: " + ret.toString());


        connector = connector.initRedis(
                "redis-12394.c14.us-east-1-2.ec2.redns.redis-cloud.com",
                12394,
                "1plK8zieFHUyLPRupPk0OQnJE51b7Xrw"
        );
        String ret2 = connector.setValue("abc","123");
        System.out.println("setValue:..: "+ ret2 );

        String ret3 = connector.getValue("abc");
        System.out.println("getValue:..: "+ ret3 );

        // 验证联通性方法
//        test();

        // 异步测试 订阅发布
//        asyncTest();


    }

//    public static void test() {
//        RedisConnector connector = new RedisConnector();
//        // 测试链接
//        Boolean ret = connector.testConnection(
//                "redis-12394.c14.us-east-1-2.ec2.redns.redis-cloud.com",
//                12394,
//                "1plK8zieFHUyLPRupPk0OQnJE51b7Xrw"
//        );
//
//        log.debug("testConnection : "+ ret.toString());
//    }
//
//
//    private static void asyncTest() {
//
//
//        // 创建一个线程池，用于同时执行发布者和订阅者逻辑（这里使用固定大小为2的线程池，可根据需求调整）
//        ExecutorService executorService = Executors.newFixedThreadPool(2);
//
//        // 提交订阅者任务到线程池
//        executorService.submit(() -> {
//            subscribe();
//        });
//
//        // 稍作延迟，确保订阅者先启动并准备好接收消息（这里简单延迟1秒，可按需调整）
//        try {
//            Thread.sleep(3000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//
//        // 提交发布者任务到线程池
//        executorService.submit(() -> {
//            publish();
//        });
//
//        // 关闭线程池，等待发布和订阅任务执行完成（这里设置了等待超时时间为5秒，可按需调整）
//        try {
//            executorService.shutdown();
//            if (!executorService.awaitTermination(5, java.util.concurrent.TimeUnit.SECONDS)) {
//                System.err.println("发布和订阅任务执行超时");
//                System.exit(0);
//            }
//        } catch (InterruptedException e) {
//            System.err.println("线程池关闭被中断");
//            e.printStackTrace();
//        }
//
//    }
//
//
//
//    private static void subscribe() {
//        RedisConnector connector = new RedisConnector();
//        connector.initRedis(
//                "redis-12394.c14.us-east-1-2.ec2.redns.redis-cloud.com",
//                12394,
//                "1plK8zieFHUyLPRupPk0OQnJE51b7Xrw"
//        );
//
//        // 测试链接
////        Boolean ret = connector.testConnection();
////        log.debug("testConnection : "+ ret.toString());
//
//        Function<String, String> handleMsg = msg -> {
//            log.debug("handleMsg receive msg==> "+ msg);
//            return "handleMsg retrun " ;
//        };
//
//        log.debug("subscribe...");
//        connector.subscribe("test",handleMsg);
//    }
//
//
//    private static void publish() {
//        RedisConnector connector = new RedisConnector();
//        connector.initRedis(
//                "redis-12394.c14.us-east-1-2.ec2.redns.redis-cloud.com",
//                12394,
//                "1plK8zieFHUyLPRupPk0OQnJE51b7Xrw"
//        );
//
//        // 测试链接
////        Boolean ret = connector.testConnection();
////        log.debug("testConnection: "+ ret.toString());
//        log.debug("publish...abc");
//        // 订阅消息
//        connector.publish("test","abc");
//    }
}
