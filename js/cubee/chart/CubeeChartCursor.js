"use strict";
Cubee.CubeeChartCursor = function(divElem, options){
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.cubeeConstructor = function(){
		
		//dynamic parameters (can be changed) TODO: pass these in options
		var svgHeight = 350;
		var valueList = {
			min: 1000,
			max: 8000,
			value: 8600
		};
		var xRectLeftPosition = 90;
		var rectWidth = 300;
		
		//calculated params (not to be changed!)
		var xRectRightPosition = xRectLeftPosition + rectWidth;
		var xCursorPosition = xRectLeftPosition + (valueList.value * (rectWidth/(valueList.max - valueList.min)));
		var xCursorLabelPosition = xCursorPosition - 25;
		var hasDataOutsideTheBox = (valueList.value > valueList.max || valueList.value < valueList.min);
		
		var html = '<svg width="700" height="'+ svgHeight +'" style="border:1px solid #000000;">'
			+ '			<defs>'
			+ '				<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">'
			+ '					<stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />'
			+ '					<stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />'
			+ '				</linearGradient>'
			+ '			</defs>'
			+ '			<rect x="'+ xRectLeftPosition +'" y="100" width="'+ rectWidth +'" height="50" fill="url(#gradient)" />'
		if(hasDataOutsideTheBox){
			var centerLineXStart = xRectLeftPosition;
			if(valueList.value < valueList.min){
				centerLineXStart = xCursorPosition;
			}
			var centerLineXEnd = xRectRightPosition;
			if(valueList.value > valueList.max){
				centerLineXEnd = xCursorPosition;
			}
			html+=  '   <line x1="'+ centerLineXStart +'" y1="125" x2="'+ centerLineXEnd +'" y2="125" style="stroke:rgb(50,50,50);stroke-width:1;" />'	//central line if data outside the box
		}
		
		html+=  '   <line x1="'+ xRectLeftPosition +'" y1="90" x2="'+ xRectLeftPosition +'" y2="160" style="stroke:rgb(50,50,50);stroke-width:2;" />'	//left tick
		html+=  '   <line x1="'+ xRectRightPosition +'" y1="90" x2="'+ xRectRightPosition +'" y2="160" style="stroke:rgb(50,50,50);stroke-width:2;" />'	//right tick
		html+=  '   <line x1="'+ xCursorPosition +'" y1="70" x2="'+ xCursorPosition +'" y2="180" style="stroke:rgb(0,255,0);stroke-width:4;" />'	//cursor for the data
		html+=  '   <text x="70" y="85" fill="#000000" font-family="calibri">Clim. max 10 ans</text>'	//label left
		html+=  '   <text x="370" y="85" fill="#000000" font-family="calibri">Clim. min 10 ans</text>'	//label right
		html+=  '   <text x="'+ xCursorLabelPosition +'" y="60" fill="#00ff00" font-family="calibri" font-size="16" style="font-weight:bold;">Semaine dernière</text>'	//label data
		html+=  '   <text x="70" y="176" fill="#000000" font-family="calibri" font-size="14">1000 kWh</text>'	//value left
		html+=  '   <text x="370" y="176" fill="#000000" font-family="calibri" font-size="14">8000 kWh</text>'	//value right
		html+=  '   <text x="'+ xCursorLabelPosition +'" y="200" fill="#00ff00" font-family="calibri" font-size="16" style="font-weight:bold;">'+ valueList.value +' kWh</text>'	//value data
		html+= 
			  '     </svg>'; 
		divElem.innerHTML = html;
	}
	
	this.cubeeConstructor();
}