"use strict";
Cubee.CubeeChartColumn = function(divElem, options){
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.cubeeConstructor = function(){
		
		//dynamic parameters (can be changed) TODO: pass these in options
		var yAxisHeight = 350;
		var chartPaddingLeft = 50;
		var chartPaddingBottom = 50;
		var svgHeight = 500;
		var nbYTicks = 6;
		var yTickWidth = 6;	//in pixels
		
		//calculated params (not to be changed!)
		var xAxisHeightPosition = svgHeight - chartPaddingBottom;
		var yTickLeftCornerXPosition = chartPaddingLeft - yTickWidth;
		
		var html = '<svg width="400" height="'+ svgHeight +'" style="border:1px solid #000000;">'
			+ '			<line x1="'+ chartPaddingLeft +'" y1="'+ xAxisHeightPosition +'" x2="'+ yAxisHeight +'" y2="'+ xAxisHeightPosition +'" style="stroke:rgb(50,50,50);stroke-width:2;" />'	//x-axis
			+ '			<line x1="'+ chartPaddingLeft +'" y1="100" x2="'+ chartPaddingLeft +'" y2="'+ xAxisHeightPosition +'" style="stroke:rgb(50,50,50);stroke-width:2;" />'	//y-axis	
			+ '			<rect x="90" y="350" width="30" height="100" style="fill:rgb(240,0,0);" />'					//data
			+ '			<rect x="170" y="280" width="30" height="170" style="fill:rgb(200,150,50);" />'
			+ '			<rect x="250" y="100" width="30" height="350" style="fill:rgb(10,10,255);" />'
			+ '			<line x1="105" y1="'+ xAxisHeightPosition +'" x2="105" y2="458" style="stroke:rgb(50,50,50);stroke-width:2;" />'	//x-ticks	
			+ '			<line x1="185" y1="'+ xAxisHeightPosition +'" x2="185" y2="458" style="stroke:rgb(50,50,50);stroke-width:2;" />'	//x-ticks	
			+ '			<line x1="265" y1="'+ xAxisHeightPosition +'" x2="265" y2="458" style="stroke:rgb(50,50,50);stroke-width:2;" />'	//x-ticks	
			+ '';
		
		//y-ticks
		for(var i=1; i<nbYTicks; i++){		//'1': no bug here, just do not draw the bottom line (or it is ugly)
			var yTickHeightPosition = xAxisHeightPosition - i*(Math.floor(yAxisHeight/nbYTicks));	//ticks created from chart bottom to chart top
			html+= '<line x1="'+ yTickLeftCornerXPosition +'" y1="'+ yTickHeightPosition +'" x2="'+ chartPaddingLeft +'" y2="'+ yTickHeightPosition +'" style="stroke:rgb(50,50,50);stroke-width:2;" />';
		}
		html+= 
			  '     </svg>'; 
		divElem.innerHTML = html;
	}
	
	this.cubeeConstructor();
}