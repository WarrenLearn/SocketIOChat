var jade = require('jade'),
    express = require('express'),
    app = express();

    app.set('views',__dirname + '/views');
    app.set('view engine','jade');
    app.set('view options',{layout:false});

    app.configure(function(){
      app.use(express.static(__dirname + '/public'));
    });

    app.get('/',function(req,res){
      res.render('home.jade');
    });

    var port = 3000;
    app.listen(port);
    console.log('Listening on port: ' + port);

  var io = require('socket.io').listen(app);
  io.sockets.on('connection',function(socket){
    socket.on('setPseudo',function(data){
      socket.set('pseudo',data);
    });
    socket.on('message',function(data){
      socket.get('pseudo',function(error,name){
        var data = {'message': message, pseudo : name };
        socket.broadcast.emit('message',data);
        console.log("user: " + name + "send this : " + message);
      })
    });
  });