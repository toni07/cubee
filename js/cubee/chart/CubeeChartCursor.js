"use strict";
Cubee.CubeeChartCursor = function(divElem, options){
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.cubeeConstructor = function(){
		
		//dynamic parameters (can be changed) TODO: pass these in options
		var svgHeight = 350;
		var hasDataOutsideTheBox = false;
		
		//calculated params (not to be changed!)
		
		
		var html = '<svg width="700" height="'+ svgHeight +'" style="border:1px solid #000000;">'
			+ '			<defs>'
			+ '				<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">'
			+ '					<stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />'
			+ '					<stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />'
			+ '				</linearGradient>'
			+ '			</defs>'
			+ '			<rect x="90" y="100" width="300" height="50" fill="url(#gradient)" />'
		if(hasDataOutsideTheBox){
			html+=  '   <line x1="50" y1="125" x2="440" y2="125" style="stroke:rgb(50,50,50);stroke-width:1;" />'	//central line if data outside the box
		}
		
		html+=  '   <line x1="90" y1="90" x2="90" y2="160" style="stroke:rgb(50,50,50);stroke-width:2;" />'	//left tick
		html+=  '   <line x1="390" y1="90" x2="390" y2="160" style="stroke:rgb(50,50,50);stroke-width:2;" />'	//right tick
		html+=  '   <line x1="200" y1="70" x2="200" y2="180" style="stroke:rgb(0,255,0);stroke-width:4;" />'	//cursor for the data
		html+=  '   <text x="70" y="85" fill="#000000" font-family="calibri">Clim. max 10 ans</text>'	//label left
		html+=  '   <text x="370" y="85" fill="#000000" font-family="calibri">Clim. min 10 ans</text>'	//label right
		html+=  '   <text x="155" y="60" fill="#00ff00" font-family="calibri">Semaine dernière</text>'	//label data
		html+= 
			  '     </svg>'; 
		divElem.innerHTML = html;
	}
	
	this.cubeeConstructor();
}