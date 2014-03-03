var jade = require('jade'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app);

    app.set('views',__dirname + '/views');
    app.set('view engine','jade');
    app.set('view options',{layout:false});
    app.set('view options', { locals: { scripts: ['script.js'] } });
    app.use(express.static(__dirname + '/public'));


    app.get('/',function(req,res){
      res.render('home.jade');
    });

    var port = 3000;
    server.listen(port);
    console.log('Listening on port: ' + port);

  var io = require('socket.io').listen(server);

  io.sockets.on('connection',function(socket){
    socket.on('setPseudo',function(data){
      console.log(data);
      socket.set('pseudo',data);
    });
    socket.on('message',function(message){
      socket.get('pseudo',function(error,name){
        var data = {'message': message, pseudo : name };
        socket.broadcast.emit('message',data);
        console.log("user: " + name + "send this : " + message);
      })
    });
  });