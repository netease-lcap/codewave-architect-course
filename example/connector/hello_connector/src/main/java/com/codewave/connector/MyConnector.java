package com.codewave.connector;

import com.netease.lowcode.core.annotation.NaslConnector;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.function.Function;

@NaslConnector(connectorKind = "myConnector")
public class MyConnector {

    private String appKey;

    public EventBus eventBus;

    @NaslConnector.Logic
    public Integer add(Integer a, Integer b) {
        return a + b;
    }

    @NaslConnector.Creator
    public MyConnector initBean(String appKey) {
        MyConnector myConnector = new MyConnector();
        myConnector.appKey = appKey;

        // 初始化事件总线
        myConnector.eventBus = new EventBus();

        return myConnector;
    }

    @NaslConnector.Tester
    public Boolean test(String appKey) {
        if (null != appKey && appKey.equals("myAppKey")) {
            return true;
        }
        return false;
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
