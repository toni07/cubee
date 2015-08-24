"use strict";
Cubee.StdTableFilter = function(options){

	var me = this;	
	
	/////////////////////////////////////////////////////////////////////////////////
	/**
	 * creates the global div for the filters
	*/
	/////////////////////////////////////////////////////////////////////////////////
	this.createGlobalDiv = function(){
	
		me.globalDiv = $('<div class="cubee-table-filter"><div>'
				+	'	<div class="cubee-table-filter-title">Filtres </div>'
				+	'	<div class="cubee-model">'
				+	'		<select disabled="disabled" class="filter-operator-id cubee-filter-select"><option value="0">=</option><option value="1">%</option><option value="2"><=</option><option value="3">>=</option><option value="4">!=</option></select> <input disabled="disabled" name="filter-value" type="text" placeholder=" valeur" class="cubee-filter-input" />'
				+	'	</div>'
				+ 	'</div></div>');
	};

	/////////////////////////////////////////////////////////////////////////////////
	/**
	 * validates the values written by the user, and returns the valid ones
	*/
	/////////////////////////////////////////////////////////////////////////////////
	this.validateFilterValues = function(doThrowError){
	
		var hasError = false;
		var cssClassInputError = 'cubee-input-error';
		var validFilterList = new Array();
		for(var i=0; i<me.filterList.length; i++){
			var filterDivElem = me.filterList[i];
			if(!filterDivElem.isRemoved){
				var fiterInputText = filterDivElem.find('input');
				var fiterFieldId = filterDivElem.find('select.filter-field-id').val();
				var fiterOperatorId = filterDivElem.find('select.filter-operator-id').val();
				var column = me.findColumnByFieldId(fiterFieldId);
				var filterValue = fiterInputText.val().replace(' ', '');
				if('' != filterValue){
					if(me.isValidFilterValue(filterValue, column)){
						fiterInputText.removeClass(cssClassInputError);
						if(1*fiterFieldId == fiterFieldId && 1*fiterOperatorId == fiterOperatorId){
							validFilterList.push({
								fieldId: 1*fiterFieldId,
								operatorId: 1*fiterOperatorId,
								value: filterValue
							});
						}					
					}
					else{
						fiterInputText.addClass(cssClassInputError);
						hasError = true;
					}
				}
			}
		}
		if(hasError && doThrowError){
			throw new Error('error in filters values');
		}
		return validFilterList;
	};
	
	/**
	 *
	*/
	this.findColumnByFieldId = function(fieldId){
		
		for(var i=0; i<options.columnList.length; i++){
			var column = options.columnList[i];
			if(fieldId == column.fieldId){
				return column;
			}
		}
		return null;
	};
	
	/**
	 * returns true or false
	*/
	this.isValidFilterValue = function(value, column){
		
		if(CUBEE_TABLE_FIELD_TYPE_STRING == column.type){
			return true;
		}
		else if(CUBEE_TABLE_FIELD_TYPE_DATE == column.type){
			return (/[0-9]{4}-[0-9]{2}-[0-9]{2}/gi).test(value);
		}
		else if(CUBEE_TABLE_FIELD_TYPE_NUMBER == column.type){
			return (1*value == value);
		}
		return true;
	};
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.constructor = function(){
	
		me.filterList = new Array();
		/////	span filter		/////
		var spanAddFilter = $('<span class="cubee-action">'+ options.filtersPlusButtonHtml +'</span>');
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
		var selectField = $('<select disabled="disabled" class="filter-field-id cubee-filter-select"><option>** choix **</option></select>');
		for(var i=0; i<options.columnList.length; i++){
			var column = options.columnList[i];
			if(null == column.actionable || column.actionable){
				selectField.append($('<option value="'+ column.fieldId +'">'+ column.label +'</option>'));
			}
		}
		
		/////	bouton post filter	/////
		var boutonSendFilter = $('<input type="submit" class="cubee-filter-submit" />');
		boutonSendFilter.hide();
		me.boutonSendFilter = boutonSendFilter;
		me.createGlobalDiv();
		
		me.globalDiv.find('.cubee-table-filter-title').append(me.spanAddFilter);
		me.globalDiv.find('.cubee-model').prepend(/*me.*/selectField);
		me.globalDiv.append(me.boutonSendFilter);
	}
	
	this.constructor();
	
};
