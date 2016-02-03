"use strict";
Cubee.CubeeChartFakeBoxPlot = function(divElem, options){
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.cubeeConstructor = function(){
		
		//dynamic parameters (can be changed) TODO: pass these in options
		var svgHeight = 350;
		var valueList = {
			min: 1000,
			q1: 1550,
			q2: 3000,
			q3: 7000,
			max: 8000,
			value: 7500
		};
		var xRectLeftPosition = 90;
		var xPaddingLeft = 20;
		var xValuePadding = 70;
		var rectWidth = 300;
		var nbTicks = 7;
		
		//calculated params (not to be changed!)
		xRectLeftPosition = xRectLeftPosition + xPaddingLeft;
		var xRectRightPosition = xRectLeftPosition + rectWidth;
		var xCursorPosition = function(value){
			return xRectLeftPosition + ((value - valueList.min)* (rectWidth/(valueList.max - valueList.min)));
		};
		var xCursorLabelPosition = xCursorPosition - 25;
		var hasDataOutsideTheBox = (valueList.value > valueList.max || valueList.value < valueList.min);
		
		var html = '<svg width="700" height="'+ svgHeight +'" style="border:1px solid #000000;">'
			//+ '			<rect x="'+ xRectLeftPosition +'" y="100" width="'+ rectWidth +'" height="50" />'
			+ '			<rect x="'+ xRectLeftPosition +'" y="100" width="'+ 150 +'" height="50" style="fill:rgb(255,175,175);" />'
			+ '			<rect x="'+ xCursorPosition(valueList.q1) +'" y="100" width="'+ (xCursorPosition(valueList.q3) - xCursorPosition(valueList.q1)) +'" height="50" style="fill:rgb(255,0,0);" />'
			+ '			<rect x="'+ xCursorPosition(valueList.q3) +'" y="100" width="'+ (xCursorPosition(valueList.max) - xCursorPosition(valueList.q3)) +'" height="50" style="fill:rgb(255,175,175);" />'
		
		var centerLineXStart = xRectLeftPosition - xValuePadding;
		if(valueList.value < valueList.min){
			centerLineXStart = xCursorPosition(valueList.value) - xValuePadding;
		}
		var centerLineXEnd = xRectRightPosition + xValuePadding;
		if(valueList.value > valueList.max){
			centerLineXEnd = xCursorPosition(valueList.value) + xValuePadding;
		}			
		html+=  '   <line x1="'+ (centerLineXEnd - 5) +'" y1="182" x2="'+ centerLineXEnd +'" y2="185" style="stroke:rgb(100,100,100);stroke-width:1;" />';	//central line arrow top
		html+=  '   <line x1="'+ centerLineXEnd +'" y1="185" x2="'+ (centerLineXEnd - 5) +'" y2="188" style="stroke:rgb(100,100,100);stroke-width:1;" />';	//central line arrow bottom
		html+=  '   <text x="'+ (centerLineXEnd - 5) +'" y="202" fill="#000000" font-family="calibri" font-size="13">kWh</text>';	//unit
		//html+=  '   <line x1="'+ xCursorPosition(valueList.min) +'" y1="100" x2="'+ xCursorPosition(valueList.min) +'" y2="150" style="stroke:rgb(0,0,0);stroke-width:2;" />';	//cursor for q1
		html+=  '   <line x1="'+ xCursorPosition(valueList.q1) +'" y1="100" x2="'+ xCursorPosition(valueList.q1) +'" y2="150" style="stroke:rgb(0,0,0);stroke-width:2;" />';	//cursor for q1
		html+=  '   <line x1="'+ xCursorPosition(valueList.q2) +'" y1="100" x2="'+ xCursorPosition(valueList.q2) +'" y2="150" style="stroke:rgb(0,0,0);stroke-width:2;" />';	//cursor for q2
		html+=  '   <line x1="'+ xCursorPosition(valueList.q3) +'" y1="100" x2="'+ xCursorPosition(valueList.q3) +'" y2="150" style="stroke:rgb(0,0,0);stroke-width:2;" />';	//cursor for q2
		//html+=  '   <line x1="'+ xCursorPosition(valueList.max) +'" y1="100" x2="'+ xCursorPosition(valueList.max) +'" y2="150" style="stroke:rgb(0,0,0);stroke-width:2;" />';	//cursor for q2
		html+=  '   <line x1="'+ xCursorPosition(valueList.value) +'" y1="80" x2="'+ xCursorPosition(valueList.value) +'" y2="165" style="stroke:rgb(0,255,0);stroke-width:4;" />';	//cursor for the data
		html+=  '   <text x="'+ (xRectLeftPosition - 14) +'" y="206" fill="#000000" font-family="calibri" font-size="14">'+ valueList.min +'</text>';	//value left
		html+=  '   <text x="'+ (xRectRightPosition - 14) +'" y="206" fill="#000000" font-family="calibri" font-size="14">'+ valueList.max +'</text>';	//value right
		html+=	'';
		
		html+=  '   <line x1="'+ centerLineXStart +'" y1="185" x2="'+ centerLineXEnd +'" y2="185" style="stroke:rgb(0,0,0);stroke-width:1;" />';	//x-axis
		html+=  '   <line x1="'+ xRectLeftPosition +'" y1="180" x2="'+ xRectLeftPosition +'" y2="190" style="stroke:rgb(0,0,0);stroke-width:1;" />';	//left tick on x-axis
		html+=  '   <line x1="'+ xRectRightPosition +'" y1="180" x2="'+ xRectRightPosition +'" y2="190" style="stroke:rgb(0,0,0);stroke-width:1;" />';	//right tick on x-axis
		var tickIntervalValue = (valueList.max - valueList.min) / (nbTicks-2);
		for(var i=2; i<nbTicks-1; i++){		//-2: there's already a tick for min and max
			var xTmpPosition = xRectLeftPosition + ((i*tickIntervalValue - valueList.min)* (rectWidth/(valueList.max - valueList.min)));
			html+=  '   <line x1="'+ xTmpPosition +'" y1="180" x2="'+ xTmpPosition +'" y2="190" style="stroke:rgb(0,0,0);stroke-width:1;" />'	//tick	
			html+=  '   <text x="'+ (xTmpPosition - 14) +'" y="206" fill="#000000" font-family="calibri" font-size="14">'+ i*tickIntervalValue +'</text>'	//tick value 
		}
		html+= 
			  '     </svg>'; 
		divElem.innerHTML = html;
	}
	
	this.cubeeConstructor();
}