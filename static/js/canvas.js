
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
})();

function circleOutFromCenter(canvas, speed, frameRate){

	var ctx = canvas.getContext("2d");
	var radius = 0;
	var centerLeft = canvas.width/2;
	var centerTop = canvas.height/2;
	frameRate = frameRate || 50;

	// style
	// TODO: put this elsewhere or take it as a param

	ctx.lineWidth = 35;

	ctx.strokeStyle = "rgba(60, 60, 60, 1)";
	ctx.shadowBlur = 50;
	ctx.shadowColor = "rgba(0, 0, 0, 1)";

	var loop = window.setInterval( function(){

		radius+=speed;
		
		if(radius>canvas.width/1.5){
			window.clearInterval(loop);
		} else {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			ctx.arc(centerLeft, centerTop, radius, 0, Math.PI*2, false);
			ctx.stroke();
			ctx.closePath();
		}
		
	}, frameRate);
}