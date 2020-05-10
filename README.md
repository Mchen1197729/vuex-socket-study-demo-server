## 在服务端使用socket.io
```shell
npm i socket.io express
```
```js
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//监听客户端主动与服务端建立socket连接的事件
io.on('connect',socket=>{
  //此处的socket就代表与服务端建立socket连接的客户端对象,每一个客户端对象都有一个唯一字符串id:socket.id
  console.log(`a client called ${socket.id} connects to us`);
  
  //针对该客户端推送事件
  socket.emit('事件名',{data});
  
  //监听客户端主动断开连接的事件
  socket.on('disconnect',reason=>{
    console.log(`a client called ${socket.id} leaves because of ${reason}`);
  });
})
```


### 1.监听客户端主动与服务端建立socket连接


### 2.监听客户端主动与服务端断开socket连接


### 3.如何计算与服务端建立socket连接的客户端的数量


### 4.服务端如何主动断开与某个特定客户端的连接

## 在客户端使用socket.io
```shell
npm i socket.io-client
```

```js
import io from 'socket.io-client';

//得到socket连接对象
const socket = io('ws://localhost:3000');

//客户端监听connect事件
socket.on('connect',()=>{
  console.log('successfully connect to socket server');
  //此时该客户端的socket.id也是可以得到的(此socket.id跟服务端的socket.id是相对应的)
  console.log(socket.id);
});

//客户端监听服务端分发的事件
socket.on('事件名',data=>{
  //do something with the `data` from server
})
```
