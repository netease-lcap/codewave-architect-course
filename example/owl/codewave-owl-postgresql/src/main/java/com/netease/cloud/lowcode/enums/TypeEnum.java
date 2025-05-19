package com.netease.cloud.lowcode.enums;

import lombok.Getter;

import java.util.*;

@Getter
public enum TypeEnum {

    SMALLINT("smallint", Arrays.asList("SMALLINT", "INT2", "SMALLSERIAL", "SERIAL2")),
    INTEGER("integer", Arrays.asList("INTEGER", "INT", "INT4", "SERIAL", "SERIAL4")),
    BIGINT("bigint", Arrays.asList("BIGINT", "BIGSERIAL", "INT8", "BIGSERIAL", "SERIAL8")),
    FLOAT4("float4", Arrays.asList("REAL", "FLOAT4")),
    FLOAT8("float8", Arrays.asList("DOUBLE PRECISION", "FLOAT", "FLOAT8")),
    DECIMAL("numeric", Arrays.asList("DECIMAL", "NUMERIC")),
    BOOLEAN("boolean", Arrays.asList("BOOLEAN", "BOOL")),
    CHAR("char", Arrays.asList("BPCHAR", "CHAR", "CHARACTER")),
    VARCHAR("varchar", Arrays.asList("VARCHAR", "CHARACTER VARYING")),
    TEXT("text", Collections.singletonList("TEXT")),
    DATE("date", Collections.singletonList("DATE")),
    TIME("time", Collections.singletonList("TIME")),
    TIMESTAMP("timestamp", Arrays.asList("TIMESTAMP", "TIMESTAMPTZ")),
    BYTEA("bytea", Collections.singletonList("BYTEA")),
    UNKNOWN("unknown", Collections.singletonList("UNKNOWN"));

    // 通用的类型名
    private final String name;
    // 等价或者类型转换时视为等价的类型名
    private final List<String> types;
    // 类型描述

    TypeEnum(String name, List<String> types) {
        this.name = name;
        this.types = types;
    }

    public static TypeEnum getTypeEnum(String type) {
        type = type.toUpperCase();
        if (type.contains("(") && type.contains(")")) {
            type = type.substring(0, type.indexOf("("));
        }
        for (TypeEnum typeEnum : TypeEnum.values()) {
            if (typeEnum.getTypes().contains(type)) {
                return typeEnum;
            }
        }
        return UNKNOWN;
    }

    public static final List<TypeEnum> INTEGER_TYPE_LIST = Arrays.asList(INTEGER, SMALLINT, BIGINT);

    public static final List<TypeEnum> DATE_TYPE_LIST = Arrays.asList(DATE, TIME, TIMESTAMP);

    public static final List<TypeEnum> CUSTOM_LENGTH_LIST = Arrays.asList(CHAR, VARCHAR, BYTEA);

    public static final List<TypeEnum> NUMERIC_TYPE_LIST = Arrays.asList(SMALLINT, INTEGER, BIGINT, FLOAT4, FLOAT8, DECIMAL);

    public static final List<TypeEnum> STRING_TYPE_LIST = Arrays.asList(CHAR, VARCHAR, TEXT);

    public static final List<TypeEnum> BIG_TYPE_LIST = Arrays.asList(TEXT, BYTEA);
}
