(function($){
	$(function(){
		var canvas = document.getElementById("myCanvas");
		var socket = io();
		if(!canvas.getContext)
		{
			return false;
		}
		var context = canvas.getContext('2d');
		
 	    $("canvas").on("mousedown",function(){
 	    	var color = 'rgb('+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+')';
 	   		$(this).on("mousemove",function(e){
 	   			var e = e||window.event;
 	   			
 	   			var X = e.clientX;
 	   			var Y = e.clientY;
 	   			context.beginPath();
 	   			context.arc(X,Y,10, 0, Math.PI * 2, true);
 	   			context.closePath();
 	   			context.fillStyle = color;
 	   			context.fill();

 	   			socket.emit("sendOrigin",{"x":X,"y":Y,"c":color});
 	   		});
 	    });
 	    $("canvas").on("mouseup",function(){
 	    	$("canvas").off("mousemove");
 	    });

 	    socket.on('serverOrigin',function(msg){
 	    		context.beginPath();
 	   			context.arc(msg.x,msg.y,10, 0, Math.PI * 2, true);
 	   			context.closePath();
 	   			context.fillStyle = msg.c;
 	   			context.fill();
 	    });
	});
})(jQuery);