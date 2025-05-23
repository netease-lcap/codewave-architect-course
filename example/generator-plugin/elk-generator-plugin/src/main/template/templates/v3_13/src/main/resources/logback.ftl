<?xml version="1.0" encoding="UTF-8" ?>
<configuration scan="true">
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>
    <define name = "ip" class = "com.snp.common.utils.LogIpConfig"/>
    <!-- 日志存放路径 -->
    <property name="log.path" value="./logs"/>
    <!-- 日志输出格式 -->
    <property name="log.pattern"
              value="[%d{yyyy-MM-dd HH:mm:ss.SSS}] %green(%-5level) [${r"$"}{ip}] [%thread] %yellow([%tid]) %cyan(%logger{50}) : %msg%n"/>

    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="org.apache.skywalking.apm.toolkit.log.logback.v1.x.TraceIdPatternLogbackLayout">
                <Pattern>${r"$"}{log.pattern}</Pattern>
            </layout>
        </encoder>
    </appender>
    <appender name="SYSTEM_ERROR_FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <File>${r"$"}{log.path}/error.log</File>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${r"$"}{log.path}/history/error.%d{yyyy-MM-dd}.%i</fileNamePattern>
            <maxHistory>180</maxHistory>
            <maxFileSize>100MB</maxFileSize>
        </rollingPolicy>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${r"$"}{log.pattern}</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <appender name="SYSTEM_INFO_FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <File>${r"$"}{log.path}/info.log</File>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>INFO</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${r"$"}{log.path}/history/info.%d{yyyy-MM-dd}.%i</fileNamePattern>
            <maxHistory>180</maxHistory>
            <maxFileSize>100MB</maxFileSize>
        </rollingPolicy>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${r"$"}{log.pattern}</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <appender name="SYSTEM_DEBUG_FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <File>${r"$"}{log.path}/debug.log</File>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>DEBUG</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${r"$"}{log.path}/history/debug.%d{yyyy-MM-dd}.%i</fileNamePattern>
            <maxHistory>180</maxHistory>
            <maxFileSize>100MB</maxFileSize>
        </rollingPolicy>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${r"$"}{log.pattern}</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <logger name="de.codecentric.boot.admin.registry" level="OFF"/>

    <springProfile name="prod">
        <root level="info">
            <appender-ref ref="CONSOLE"/>
            <appender-ref ref="SYSTEM_INFO_FILE"/>
            <appender-ref ref="SYSTEM_ERROR_FILE"/>
        </root>
    </springProfile>

    <springProfile name="dev">
        <root level="DEBUG">
            <appender-ref ref="CONSOLE"/>
            <appender-ref ref="SYSTEM_DEBUG_FILE"/>
            <appender-ref ref="SYSTEM_INFO_FILE"/>
            <appender-ref ref="SYSTEM_ERROR_FILE"/>
        </root>
    </springProfile>
</configuration>