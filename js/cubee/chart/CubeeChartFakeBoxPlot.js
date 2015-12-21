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
			max: 8000,
			value: 7000
		};
		var xRectLeftPosition = 90;
		var rectWidth = 300;
		
		//calculated params (not to be changed!)
		var xRectRightPosition = xRectLeftPosition + rectWidth;
		var xCursorPosition = xRectLeftPosition + ((valueList.value - 1000)* (rectWidth/(valueList.max - valueList.min)));
		var xCursorLabelPosition = xCursorPosition - 25;
		var hasDataOutsideTheBox = (valueList.value > valueList.max || valueList.value < valueList.min);
		
		var html = '<svg width="700" height="'+ svgHeight +'" style="border:1px solid #000000;">'
			//+ '			<rect x="'+ xRectLeftPosition +'" y="100" width="'+ rectWidth +'" height="50" />'
			+ '			<rect x="'+ xRectLeftPosition +'" y="100" width="'+ 150 +'" height="50" style="fill:rgb(255,175,175);" />'
			+ '			<rect x="'+ (xRectLeftPosition + 150) +'" y="100" width="'+ 125 +'" height="50" style="fill:rgb(255,0,0);" />'
			+ '			<rect x="'+ (xRectLeftPosition + 250) +'" y="100" width="'+ 50 +'" height="50" style="fill:rgb(255,175,175);" />'
		if(true || hasDataOutsideTheBox){
			var centerLineXStart = xRectLeftPosition - 50;
			if(valueList.value < valueList.min){
				centerLineXStart = xCursorPosition - 50;
			}
			var centerLineXEnd = xRectRightPosition + 50;
			if(valueList.value > valueList.max){
				centerLineXEnd = xCursorPosition + 50;
			}
			html+=  '   <line x1="'+ centerLineXStart +'" y1="125" x2="'+ centerLineXEnd +'" y2="125" style="stroke:rgb(100,100,100);stroke-width:1;" />'	//central line if data outside the box
		}
		
		html+=  '   <line x1="'+ xRectLeftPosition +'" y1="125" x2="'+ xRectLeftPosition +'" y2="160" style="stroke:rgb(150,150,150);stroke-width:1;" />'	//left tick
		html+=  '   <line x1="'+ xRectRightPosition +'" y1="125" x2="'+ xRectRightPosition +'" y2="160" style="stroke:rgb(150,150,150);stroke-width:1;" />'	//right tick
		html+=  '   <line x1="'+ xCursorPosition +'" y1="70" x2="'+ xCursorPosition +'" y2="180" style="stroke:rgb(0,255,0);stroke-width:4;" />'	//cursor for the data
		html+=  '   <text x="70" y="176" fill="#000000" font-family="calibri" font-size="14">1000 kWh</text>'	//value left
		html+=  '   <text x="370" y="176" fill="#000000" font-family="calibri" font-size="14">8000 kWh</text>'	//value right
		html+=  '   <text x="'+ xCursorLabelPosition +'" y="200" fill="#00ff00" font-family="calibri" font-size="16" style="font-weight:bold;">'+ valueList.value +' kWh</text>'	//value data
		html+= 
			  '     </svg>'; 
		divElem.innerHTML = html;
	}
	
	this.cubeeConstructor();
}