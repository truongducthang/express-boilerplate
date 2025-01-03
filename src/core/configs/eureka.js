const { Eureka } = require('eureka-js-client');

// Config Eureka Client
const clientEureka = new Eureka({
  instance: {
    app: 'node-service',
    instanceId: 'node-service:8080', // ID duy nhất của instance
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:8080/info',
    healthCheckUrl: 'http://localhost:8080/health',
    port: {
      $: 3000, // Port của service Node.js
      '@enabled': true,
    },
    vipAddress: 'nodejs-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'host.docker.internal', // Địa chỉ Eureka Server
    port: 8761,
    servicePath: '/eureka/apps/',
    fetchRegistry: true, // Lấy danh sách các service từ Eureka
    registerWithEureka: true, // Đăng ký với Eureka
  },
});

module.exports = clientEureka;
