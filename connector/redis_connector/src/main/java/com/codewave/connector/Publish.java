package com.codewave.connector;

public class Publish {
    // 发布消息
    public static void main(String[] args) {
        String host = "localhost";
        int port = 6379;
        String password = "abc1234";
        RedisConnector connector2 = new RedisConnector();
        connector2 = connector2.initRedis(
                host,port,password
        );

        connector2.publish("test","bbbbb");
        System.out.println("publish...abc");

        // SUBSCRIBE test
        // PUBLISH test abc
    }
}
