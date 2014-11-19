

			function drawCircle(x, y, radius){
	context.beginPath();
context.arc(x, y, radius, 0, 2 * Math.PI, true);
context.closePath();
context.fill();
}

function main() {
	var sketch = document.getElementById('sketch');
	var context = sketch.getContext("2d");
	
	context.fillStyle = "#00ff00"
	context.beginPath();
	context.arc(150, 250, 125, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();

	context.fillStyle = "#ffffff"
	context.beginPath();
	context.arc(100, 210, 25, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();

	context.fillStyle = "#ffffff"
	context.beginPath();
	context.arc(200, 210, 25, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();

	context.fillStyle = "#000000"
	context.beginPath();
	context.arc(200, 200, 15, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();	

	context.beginPath();
	context.arc(100, 200, 15, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();


	context.fillRect(100, 290, 105, 45);

}
document.addEventListener('DOMContentLoaded', main);
