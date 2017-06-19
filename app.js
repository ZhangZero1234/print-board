var express = require('express');
var app = express();

var http = require('http').Server(app);;

var io = require('socket.io')(http);

app.use(express.static("./public"));
app.set("view engine","ejs");

app.get('/',function(req,res,next){
	res.render("index");
});

io.on('connection',function(socket){
	console.log("connect");
	socket.on("disconnect",function(){});
	socket.on("sendOrigin",function(msg){
		console.log(msg);
		socket.broadcast.emit("serverOrigin",msg);
	})
});

http.listen(3000);