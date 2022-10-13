const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { createCluster } = require ('redis');
const { createAdapter } = require ('@socket.io/redis-adapter');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
const aws = require('aws-sdk');

const app = express();
const server = http.createServer(app);

(async ()=> {
    const client = createCluster({
        rootNodes: [{
            url : "redis://owl-redis.yhspjt.clustercfg.apn2.cache.amazonaws.com:6379"
        }]
    });

    client.on('error', (err)=> console.log("Redis Client Error", err));
    await client.connect();
    
    await client.set("key", "test");
    console.log("Redis Connected!!!");
    const value = await client.get("key");
    console.log(value);
})();