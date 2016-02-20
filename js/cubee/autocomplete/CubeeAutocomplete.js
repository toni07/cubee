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
		if(null == options.addUIData){
			options.addUIData = function(elementValue, displayedText, innerDiv){			
				var suggestionDiv = $('<div title="'+ displayedText +'">'+ displayedText +'</div>');
				suggestionDiv.css({
					cursor: 'pointer',
					'padding-left': '4px',
					'white-space': 'nowrap'
				});
				suggestionDiv.on('click', function(){
					//me.destroyAutocompleteDiv();	//already done in the $(body).onclick
					inputElem.val(displayedText);
					options.onValueSelected(elementValue);
				});
				suggestionDiv.on('mouseover', function(){
					suggestionDiv.css({
						'background-color': options.mouseOverColor
					});
				});
				suggestionDiv.on('mouseout', function(){
					suggestionDiv.css({
						'background-color': '#ffffff'
					});
				});
				innerDiv.append(suggestionDiv);
			}
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
			}
		}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		inputElem = $(inputElem);
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
				'overflow-y': 'auto'
			});
			me.autoCompleteDiv.insertAfter(inputElem);			
			options.onKeyUp($(this).val(), me.autoCompleteDiv);
			console.log('##keyup');
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
	}
	
	this.cubeeConstructor();
	
};
