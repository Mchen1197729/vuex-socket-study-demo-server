const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

/*
* 1.监听客户端主动与服务端建立socket连接:io.on('connect',callback)、io.on('connection',callback)
* 2.监听某一个客户端主动断开与服务端的socket连接:socket.on('disconnect',callback) 此处的socket是客户端的实例
* */
io.on('connect', socket => {
  //此处的socket就是只特定的跟服务器建立了socket连接的客户端 有唯一的id属性
  console.log(`a client named ${socket.id} connected at ${new Date()}`);
  //socket.emit('事件名',要传递给该客户端的值)
  socket.emit('data', {
    name: '伊万卡',
    age: 12,
    id: socket.id
  }, data => {
    console.log(data)
  });

  //监听客户端主动断开事件
  socket.on('disconnect', reason => {
    /*
    * reason可能情况
    * 1.transport close ->客户端页面关闭
    * */
    console.log(`a user named ${socket.id} disconnected at ${new Date()}`, reason);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
