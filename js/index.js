//canvas animation

var dots = [];
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//canvas animation settings
var colors = [
	'rgba(34, 49, 63, 0.8)',
	'rgba(189, 195, 199, 0.8)',
	'rgba(241, 196, 15, 0.8)',
	'rgba(231, 76, 60, 0.8)'
];
var defaultSize = 10;
var numDots = 50;
var minSpeed = -2;
var maxSpeed = 2;
var expandState = true;

function buildArray(){
	'use strict';
	for(var i = 0; i < numDots; i++){
		var color = Math.floor(Math.random() * (colors.length - 1 + 1)) + 1;
		var left = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0;
		var top = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0;
		var size = defaultSize;
		var leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10;
		var topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed) + 1) * minSpeed) / 10;
		var expandState = expandState;

		while(leftSpeed == 0 || topSpeed == 0){
			leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10;
			topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10;
		}

		var dot = {
			color: color,
			left: left,
			top: top,
			size: size,
			leftSpeed: leftSpeed,
			topSpeed: topSpeed,
			expandState: expandState
		};

		dots.push(dot);
	}
}

function build(){
	'use strict';
	for(var h = 0; h < dots.length; h++){
		var curDot = dots[h];
		context.fillStyle = colors[curDot.color-1];
		context.beginPath();

		if(curDot.left > canvas.width+curDot.size){
			curDot.left = 0 - curDot.size;
			context.rect(curDot.left, curDot.top, curDot.size, curDot.size);
		}else if(curDot.left < 0 - curDot.size){
			curDot.left = canvas.width + curDot.size;
			context.rect(curDot.left, curDot.top, curDot.size, curDot.size);
		}else{
			curDot.left = curDot.left + curDot.leftSpeed;
			context.rect(curDot.left, curDot.top, curDot.size, curDot.size);
		}

		if(curDot.top > canvas.height + curDot.size){
			curDot.top = 0 - curDot.size;
			context.rect(curDot.left, curDot.top, curDot.size, curDot.size);
		}else if(curDot.top < 0 - curDot.size){
			curDot.top = canvas.height + curDot.size;
			context.rect(curDot.left, curDot.top, curDot.size, curDot.size);
		}else{
			curDot.top = curDot.top + curDot.topSpeed;
		}

		context.closePath();
		context.fill();
		context.ellipse;
	}
}

var xVal = 0;

window.requestAnimFrame = (function(callback){
	'use strict';
	return window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame || 
	window.oRequestAnimationFrame || 
	window.msRequestAnimationFrame || 
	function(callback){
		window.setTimeout(callback, 1000/60);
	};
})();

function animate(){
	'use strict';
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	//clear the canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	//draw the next frame
	xVal++;
	build();

	//request a new frame
	requestAnimFrame(function(){
		animate();
	});
}

window.onload = function(){
	'use strict';
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	buildArray();
	animate();
};

window.onresize = function(){
	'use strict';
	console.log("resize");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	animate();
};