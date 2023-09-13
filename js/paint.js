var ctx, color = "#000";	
var stroke = 4;

$(document).ready(function () {
	

    setTimeout(function(){
	   newCanvas();
    }, 1000);
		

	$(".palette").click(function(){
		$(".palette").css("border-color", "#777");
		$(".palette").css("border-style", "solid");
		$(this).css("border-color", "#fff");
		$(this).css("border-style", "dashed");
		color = $(this).css("background-color");
		ctx.beginPath();
		ctx.strokeStyle = color;
	});
    
	$("#new").click(function() {
		newCanvas();
	});

	//Change stroke width
	$("#slider1").change(function(){
		stroke = document.getElementById("slider1").value;
		ctx.lineWidth = stroke;
	})
	
});


function newCanvas(){

    $("#content").height($(window).height()-90);
    var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height()-90)+'"></canvas>';
	$("#content").html(canvas);
    
    // setup canvas
	ctx=document.getElementById("canvas").getContext("2d");
	ctx.strokeStyle = color;
	ctx.lineWidth = stroke;	
	$("#canvas").drawMouse();
}

// Dessiner les lignes avec moveTo et lineTo
$.fn.drawMouse = function() {
	var clicked = 0;
	var start = function(e) {
		clicked = 1;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-44;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		if(clicked){
			x = e.pageX;
			y = e.pageY-44;
			ctx.lineTo(x,y);
			ctx.stroke();
		}
	};
	var stop = function(e) {
		clicked = 0;
	};

	$(this).on("mousedown", start);
	$(this).on("mousemove", move);
	$(window).on("mouseup", stop);
	
};


function drawLine(){
	var xpos1 = prompt("X Position1", 100);
	var ypos1 = prompt("Y Position1", 100);
	var xpos2 = prompt("X Position2", 400);
	var ypos2 = prompt("Y Position2", 100);
	
	ctx.beginPath();
	ctx.moveTo(xpos1, ypos1);
	ctx.lineTo(xpos2, ypos2);
	ctx.stroke();
}

function drawRect(){
	var xpos = prompt("X Position", 100);
	var ypos = prompt("Y Position", 100);
	var w = prompt("Width", 100);
	var h = prompt("Height", 100);
	ctx.beginPath();
	ctx.rect(xpos, ypos, w, h);
	ctx.stroke();
}

function drawCircle(){
	var xCpos = prompt("X Center Position", 100);
	var yCpos = prompt("Y Center Position", 100);
	var r = prompt("Radius", 50);
	ctx.beginPath();
	ctx.arc(xCpos, yCpos, r, 0, 2 * Math.PI);
	ctx.stroke();
}

//Save image
function saveImg(){
    var canvas = document.getElementById("canvas");
    var dataURL = canvas.toDataURL("image/png", 4.0);
	downloadImage(dataURL, 'my-canvas.png');
}
//Download Image
function downloadImage(data, filename = 'untitled.png') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}


//Uploading Image
function uploadImg(){
	//var file = document.getElementById('img').files[0].name;
	var file = prompt("Image URL:", "./img.png");
	var imgObj = new Image();

	var xpos = prompt("X Position", 100);
	var ypos = prompt("Y Position", 100);
	var w = prompt("Width", 100);
	var h = prompt("Height", 100);
	imgObj.src = file;

	imgObj.onload = function(){
    	ctx.drawImage(imgObj, xpos, ypos, w, h);
	}
}

// function strokeWidth(){
// 	stroke = document.getElementById("slider1").value;
// 	console.log(stroke);
// }