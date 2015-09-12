"use strict";
Cubee.StdPopup = function(options){

	var me = this;	
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// close this popup ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.close = function(){
		
		me.foregroundDiv.remove();
		me.backgroundDiv.remove();
	};
		
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.construct = function(){
	
		var bodyDOMElem = $('body');
		var currentNbPopup = 0;
		for(var i=0; i<10; i++){
			if(0 == $('div.cubee-popup-bg.idx' + i).length){
				currentNbPopup = i;
				break;
			}
		}
		
		me.backgroundDiv = $('<div class="cubee-popup-bg idx'+ currentNbPopup +'"></div>');
		me.foregroundDiv = $('<div class="cubee-popup-fg idx'+ currentNbPopup +'"></div>');
		var buttonClosePopup = $('<div style="text-align:right;margin-right:6px;cursor:pointer;"> X </div>');
		var functionClose = function(){
			if(null != options.closeCallback){
				options.closeCallback(me);
			}
			else{
				me.close();
			}
		};
		me.backgroundDiv.on('click', functionClose);
		buttonClosePopup.on('click', functionClose);
		if(options.bodyContents instanceof String){
			me.foregroundDiv.html(options.bodyContents);	
		}
		else{
			me.foregroundDiv.append(options.bodyContents);
		}
		if(null == options.doNotShowHideButton || !options.doNotShowHideButton){
			me.foregroundDiv.prepend(buttonClosePopup);
		}
		
		bodyDOMElem.append(me.backgroundDiv);
		bodyDOMElem.append(me.foregroundDiv);
	}
	
	this.construct();
	
	
};
