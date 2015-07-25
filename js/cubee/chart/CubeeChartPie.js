/**
 * Class used to draw a Pie Chart
 * @author toni07 25/07/2015
*/
"use strict";
var CubeeChartPie = function(divElem, data, options){

	var me = this;
		
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.construct = function(){
	
		var canvas = divElem;
		canvas.addEventListener('mousemove', function(p1, p2, p3, p4){
			console.log('mousemove', p1, p2, p3, p4);
		});
		var ctx = canvas.getContext("2d");
		var lastend = 0;
		var myTotal = 0; // Automatically calculated so don't touch

		for (var e = 0; e < data.length; e++) {
		  myTotal += data[e].value;
		}

		for (var i = 0; i < data.length; i++) {
		  ctx.fillStyle = data[i].color;
		  ctx.beginPath();
		  ctx.moveTo(canvas.width / 2, canvas.height / 2);
		  // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
		  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i].value / myTotal)), false);
		  ctx.lineTo(canvas.width / 2, canvas.height / 2);
		  ctx.fill();
		  lastend += Math.PI * 2 * (data[i].value / myTotal);
		}
	};
	
	this.construct();
	
};