"use strict";
Cubee.StdPopup = function(options){

	var me = this;	
		
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.construct = function(){
	
		//if()
		var bodyDOMElem = $('body');
		var backgroundDiv = $('<div class="cubee-popup-bg idx0"></div>');
		var foregroundDiv = $('<div class="cubee-popup-fg idx0"></div>');
		backgroundDiv.on('click', function(){
			if(null != options.closeCallback){
				options.closeCallback();
			}
			else{
				foregroundDiv.remove();
				backgroundDiv.remove();
			}
		});
		foregroundDiv.html(options.bodyHtml);
		bodyDOMElem.append(backgroundDiv);
		bodyDOMElem.append(foregroundDiv);
	}
	
	this.construct();
	
	
};
