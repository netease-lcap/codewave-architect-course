package com.codewave.connector;

import com.netease.lowcode.core.annotation.NaslConnector;

import java.util.function.Function;

@NaslConnector(connectorKind = "myConnector")
public class MyConnector {

    private String appKey;

    @NaslConnector.Logic
    public Integer add(Integer a, Integer b) {
        return a + b;
    }

    @NaslConnector.Creator
    public MyConnector initBean(String appKey) {
        MyConnector myConnector = new MyConnector();
        myConnector.appKey = appKey;
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

        handle.apply("msg");
    }

    public static void main(String[] args) {
        MyConnector myConnector = new MyConnector().initBean("appKey");
        myConnector.test("appKey");
        Integer add = myConnector.add(1, 1);
        System.out.println("add result :" + add);
        myConnector.subscribe("queue1", new Function<String, String>() {
            @Override
            public String apply(String s) {
                return null;
            }
        });
    }
}
