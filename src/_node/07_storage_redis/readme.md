# redis 学习

## 搭建环境
1. 本地安装
   ```
    wget http://download.redis.io/releases/redis-6.0.6.tar.gz
    tar xzf redis-6.0.6.tar.gz
    cd redis-6.0.6
    make
   ```
2. 启动服务端
    ```
    切换目录到 redis 目录, 启动服务
    src/redis-server
    ```
3. 启动客户端
    ```
    切换目录到 redis 目录, 启动客户端
    src/redis-cli
    ```

4. 安装客户端
``` https://getmedis.com/ ```

5. 设置

``` config set stop-writes-on-bgsave-error no ```

## 链接 node
报错: (node:22501) UnhandledPromiseRejectionWarning: Error: The client is closed
解决方案: 将 redis 版本降到 3.1.2 
参照: https://github.com/dvandal/cryptonote-nodejs-pool/issues/695