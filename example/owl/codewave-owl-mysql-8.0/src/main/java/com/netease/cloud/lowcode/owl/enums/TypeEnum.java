package com.netease.cloud.lowcode.owl.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Getter
public enum TypeEnum {

    TINYINT("tinyint", Arrays.asList("TINYINT", "INT1")),
    BOOLEAN("boolean", Arrays.asList("BOOLEAN", "BOOL")),
    SMALLINT("smallint", Arrays.asList("SMALLINT", "INT2")),
    MEDIUMINT("mediumint", Arrays.asList("MEDIUMINT", "INT3")),
    INT("int", Arrays.asList("INT", "INTEGER", "INT4")),
    BIGINT("bigint", Arrays.asList("BIGINT", "INT8")),
    FLOAT("float", Collections.singletonList("FLOAT")),
    DOUBLE("double", Arrays.asList("DOUBLE", "REAL")),
    DECIMAL("decimal", Arrays.asList("DECIMAL", "NUMERIC")),
    CHAR("char", Arrays.asList("CHAR", "CHARACTER")),
    VARCHAR("varchar", Arrays.asList("CHARACTER VARYING", "VARCHAR")),
    TEXT("text", Arrays.asList("TEXT", "TINYTEXT", "MEDIUMTEXT", "LONGTEXT")),
    DATE("date", Collections.singletonList("DATE")),
    TIME("time", Collections.singletonList("TIME")),
    DATETIME("datetime", Collections.singletonList("DATETIME")),
    TIMESTAMP("timestamp", Collections.singletonList("TIMESTAMP")),
    BLOB("blob", Arrays.asList("BLOB", "LONGBLOB", "MEDIUMBLOB", "TINYBLOB")),
    UNKNOWN("unknown", Collections.singletonList("UNKNOWN"));

    // 通用的类型名
    private final String name;
    // 等价或者类型转换时视为等价的类型名
    private final List<String> types;

    TypeEnum(String name, List<String> types) {
        this.name = name;
        this.types = types;
    }

    public static TypeEnum getTypeEnum(String type) {
        type = type.toUpperCase();
        // mysql8.0中的boolean类型是tinyint(1)
        if (type.equals("TINYINT(1)")) {
           return TypeEnum.BOOLEAN;
        }
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

    public static final List<TypeEnum> DATE_TYPE_LIST = Arrays.asList(DATE, TIME, DATETIME, TIMESTAMP);

    public static final List<TypeEnum> NUMERIC_TYPE_LIST = Arrays.asList(TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT, FLOAT, DOUBLE, DECIMAL);

    public static final List<TypeEnum> STRING_TYPE_LIST = Arrays.asList(CHAR, VARCHAR, TEXT);

    public static final List<TypeEnum> BIG_TYPE_LIST = Arrays.asList(TEXT, BLOB);
}
