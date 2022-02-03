var redis = require('redis');

var client = redis.createClient(6379,'localhost');

client.set('hello', '不好吧');

client.get('hello', function (err,v) {
    console.log("redis get hello err, v", err, v);
});

// 问题1: 该配置: 
// config set stop-writes-on-bgsave-error no

// 问题2: 降版本: 3.1.2

