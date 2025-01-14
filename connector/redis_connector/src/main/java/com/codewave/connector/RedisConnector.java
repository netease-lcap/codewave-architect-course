package com.codewave.connector;

import com.netease.lowcode.core.annotation.NaslConnector;
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


        connector = connector.initRedis(
               host,port,password
        );

        String ret2 = connector.setValue("fff","123");
        System.out.println("setValue:..: "+ ret2 );

        String ret3 = connector.getValue("abc");
        System.out.println("getValue:..: "+ ret3 );

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
//        connector2.publish("test","abc");
//        System.out.println("publish...abc");

        // 为了演示，让程序运行一段时间
        Thread.sleep(20000);



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
