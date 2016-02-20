'use strict';
Cubee.Autocomplete = function(inputElem, options){
		
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	var me = this;
	this.cubeeConstructor = function(){
	
		////// default options	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if(null == options.mouseOverColor){
			options.mouseOverColor = '#f0f3a1';
		}
		/*if(null == options.addUIData){
			options.addUIData = me.addUIData
		}
		if(null == options.onKeyUp){
			options.onKeyUp = function(inputValue, innerDiv){
				for(var i=0; i<5; i++){
					var elementValue = {
						idx: i,
						value: 'i=' + i
					};
					options.addUIData(elementValue, '('+ inputValue +') suggestionAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA '+ i +'', innerDiv);
				}
			};
		}*/
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		me.options = options;
		inputElem = $(inputElem);
		me.inputElem = inputElem;
		inputElem.addClass('cubee-panel');		
		
		inputElem.on('keyup', function(){
			if(null != me.autoCompleteDiv){
				me.destroyAutocompleteDiv();
			}
			me.autoCompleteDiv = $('<div></div>');
			me.autoCompleteDiv.css({
				position: 'relative',
				bottom: 0,
				border: '1px solid #000000',
				width: inputElem.width(),
				'max-height': '100px',
				'overflow': 'auto',
			});
			me.autoCompleteDiv.insertAfter(inputElem);			
			options.onKeyUp($(this).val(), me.autoCompleteDiv);
			// me.clickBody = function(){
				// me.destroyAutocompleteDiv();
				// if(null != options.hasQuitAutocompleteWithoutChosingOption){
					// options.hasQuitAutocompleteWithoutChosingOption();
				// }
				// $('body').unbind('click', me.clickBody);
			// };
			// $('body').bind('click', me.clickBody);
			$('body').on('click', function(){
				me.destroyAutocompleteDiv();
			});				
		});
	},
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////// methods ////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 *
	*/
	this.emptyAutocompleteDiv = function(){
	
		me.autoCompleteDiv[0].innerHTML = '';
	},
	
	/**
	 *
	*/
	this.destroyAutocompleteDiv = function(){
	
		me.autoCompleteDiv.remove();
	},
	
	this.cubeeConstructor();
	return this;
	
};

Cubee.Autocomplete.prototype = {

	options: {
	},

	/**
	 *
	*/
	addUIData: function(elementValue, displayedText, innerDiv){
		var me = this;
		var suggestionDiv = $('<div title="'+ displayedText +'">'+ displayedText +'</div>');
		suggestionDiv.css({
			cursor: 'pointer',
			'padding-left': '4px',
			'white-space': 'nowrap'
		});
		suggestionDiv.on('click', function(){
			//me.destroyAutocompleteDiv();	//already done in the $(body).onclick
			//me.setValueSelected(elementValue, displayedText);
			me.options.onValueSelected(me.inputElem, elementValue, displayedText);
		});
		suggestionDiv.on('mouseover', function(){
			suggestionDiv.css({
				'background-color': me.options.mouseOverBgColor,
				color: me.options.mouseOverColor
			});
		});
		suggestionDiv.on('mouseout', function(){
			suggestionDiv.css({
				'background-color': '#ffffff',
				color: 'inherit'
			});
		});
		innerDiv.append(suggestionDiv);
	},
	
	/**
	 *
	*/
	// setValueSelected: function(elementValue, displayedText){
		
		// me.inputElem.val(displayedText);
	// },
	
	/**
	 *
	*/
	setOption: function(key, val){
		
		this.options[key] = val;
	}
}