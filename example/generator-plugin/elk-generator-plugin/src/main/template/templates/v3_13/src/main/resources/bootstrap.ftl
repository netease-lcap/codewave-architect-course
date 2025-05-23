server:
  port: 9090
spring:
  profiles:
    #    active: dev
    active: prod
  cloud:
    consul:
      #host: 192.168.164.106 #consul服务器的主机地址
      #port: 8500
      host: ${r"$"}{CONSUL_HOST} #consul服务器的主机地址
      port: ${r"$"}{CONSUL_PORT}
      discovery:
        #启用服务发现
        enabled: true
        #注册的实例ID (唯一标志)
        instance-id: ${r"$"}{spring.application.name}-${r"$"}{spring.cloud.client.ip-address}-${r"$"}{server.port}
        #服务的名称
        service-name: ${r"$"}{spring.application.name}
        #指定开启ip地址注册
        prefer-ip-address: true
        #当前服务的请求ip
        ip-address: ${r"$"}{spring.cloud.client.ip-address}
        #启用自动注册
        register: true
        #停服务自动取消注册
        deregister: true
        heartbeat:
          enabled: true
        # 健康检查
        health-check-url: http://${r"$"}{spring.cloud.client.ip-address}:${r"$"}{server.port}/actuator/health
        #健康检查时间10秒
        health-check-interval: 10s
        #健康超时时间5秒
        health-check-critical-timeout: 5s
      config:
        #是否启用配置中心，配置true开启
        enable: true
        #设置配置的基本文件夹，默认config，可以理解为配置文件的所在的最外层文件夹
        prefixes:
          - config
        #设置应用的文件夹名称，默认值application，一般建议设置为微服务应用名称
        default-context: snp-xxx-xxxx
        #配置环境分割符，默认值“：”和default-context配置项搭配
        #例如应用service-name分别有环境dev，test
        #只需要在config文件夹创建service-name:dev、service-name:prod
        profileSeparator: ':'
        #指定配置格式为yaml
        format: YAML
        #Consul的Key/values中Key，value对应整个配置文件，最配置的地址为config/service-name:dev/data
        data-key: data