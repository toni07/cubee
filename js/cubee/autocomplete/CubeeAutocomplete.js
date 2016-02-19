'use strict';
Cubee.CubeeAutocomplete = function(inputElem, options){
		
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	var me = this;
	this.cubeeConstructor = function(){
	
		inputElem = $(inputElem);
		inputElem.addClass('cubee-panel');
		var autoCompleteDiv = $('<div></div>');
		autoCompleteDiv.css({
			position: 'relative',
			bottom: 0,
			border: '1px solid #000000',
			width: inputElem.width()
		});
		autoCompleteDiv.insertAfter(inputElem);
		
		inputElem.on('keyup', function(){
			console.log('##keyup');
			for(var i=0; i<5; i++){
				var suggestionDiv = $('<div>suggestion '+ i +'</div>');
				autoCompleteDiv.append(suggestionDiv);
			}
			
		});
	}
	
	this.cubeeConstructor();
	
};
