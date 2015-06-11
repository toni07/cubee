"use strict";
var StdTableFilter = function(options){

	var me = this;	
	
	/////////// global div for filters /////////////
	this.createGlobalDiv = function(){
	
		me.globalDiv = $('<div class="cubee-table-filter"><div>'
				+	'	<div class="cubee-table-filter-title">Filtres </div>'
				+	'	<div class="cubee-model">'
				+	'		<select disabled="disabled" name="filter-operator"><option value="0">=</option><option value="1">%</option><option value="2"><=</option><option value="3">>=</option><option value="4">!=</option></select> <input disabled="disabled" name="filter-value" type="text" placeholder=" valeur" />'
				+	'	</div>'
				+ 	'</div></div>');
	};

	/**
	 * validates the values written by the user, and returns the valid ones
	*/
	this.validateFilterValues = function(doThrowError){
	
		var hasError = false;
		var cssClassInputError = 'cubee-input-error';
		var validFilterList = new Array();
		for(var i=0; i<me.filterList.length; i++){
			var filterDivElem = me.filterList[i];
			if(!filterDivElem.isRemoved){
				var fiterInputText = filterDivElem.find('input');
				if('' != fiterInputText.val().replace(' ', '')){
					if('aa' != fiterInputText.val()){		//TODO: validate the values by the type of field
						fiterInputText.removeClass(cssClassInputError);
						validFilterList.push({
							'field-id': 2,
							'operator-id': 3,
							value: '2012-05-13'
						});
					}
					else{
						fiterInputText.addClass(cssClassInputError);
						hasError = true;
					}
				}
				console.log('##in filter, fiterInputText: ', fiterInputText, fiterInputText.val());
			}
		}
		if(hasError && doThrowError){
			throw new Error('error in filters values');
		}
		return validFilterList;
	};
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.constructor = function(){
	
		me.filterList = new Array();
		/////	span filter		/////
		var spanAddFilter = $('<span class="cubee-action">+</span>');
		spanAddFilter.on('click', function(){
			var thisElem = $(this);
			if(null == me.spanAddFilter.nbFilterElem){
				me.spanAddFilter.nbFilterElem = 0;
			}
			if(0 == me.spanAddFilter.nbFilterElem){
				me.boutonSendFilter.show();
			}
			me.spanAddFilter.nbFilterElem = me.spanAddFilter.nbFilterElem + 1;
			var parent = thisElem.parent().parent();
			var divModel = parent.children('div.cubee-model');
			Http.copyModel(divModel, parent, function(newDiv){
				var positionOfNewDiv = me.filterList.length;
				newDiv.indexInFilterList = positionOfNewDiv;
				newDiv.isRemoved = false;
				me.filterList.push(newDiv);
				var spanDeleteLine = $('<span class="cubee-action"> X </span>');
				spanDeleteLine.on('click', function(){
					me.filterList[newDiv.indexInFilterList].isRemoved = true;
					//me.filterList.splice(newDiv.indexInFilterList, 1);
					newDiv.remove();
					me.spanAddFilter.nbFilterElem = me.spanAddFilter.nbFilterElem - 1;
					if(0 == me.spanAddFilter.nbFilterElem){
						me.boutonSendFilter.hide();
					}
				});
				newDiv.append(spanDeleteLine);
			});
		});
		this.spanAddFilter = spanAddFilter;
		
		/////	<select> for filter field	/////
		var selectField = $('<select disabled="disabled" name="filter-field-id"><option>** choix **</option></select>');
		for(var i=0; i<options.columnList.length; i++){
			var column = options.columnList[i];
			selectField.append($('<option value="'+ column.fieldId +'">'+ column.label +'</option>'));
		}
		//me.selectField = selectField;
		
		/////	bouton post filter	/////
		var boutonSendFilter = $('<input type="submit" />');
		boutonSendFilter.hide();
		me.boutonSendFilter = boutonSendFilter;
		me.createGlobalDiv();
		
		me.globalDiv.find('.cubee-table-filter-title').append(me.spanAddFilter);
		me.globalDiv.find('.cubee-model').prepend(/*me.*/selectField);
		me.globalDiv.append(me.boutonSendFilter);
	}
	
	this.constructor();
	
	
};
