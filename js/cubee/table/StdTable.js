'use strict';
Cubee.StdTable = function(divElem, options){
	
	/**
	 * creates the jQuery table
	*/
	this.createHtmlTable = function(){
	
		me.stdTableFilter.globalDiv.insertBefore(me.tableElem);
		me.stdTablePaging.globalDiv.insertBefore(me.tableElem);
		me.orderByList = {};
		
		for(var i=0; i<me.htmlColumnList.length; i++){
			var href = me.htmlColumnList[i];
			if(null == href.actionable || href.actionable){
				me.orderByList[href.fieldId] = href.orderby;
				(function(hrefElem){
					hrefElem.on('click', function(event){
						event.preventDefault();
						me.resetOrder(hrefElem.fieldId);
						if(0 == hrefElem.orderby){
							hrefElem.orderby = 1;
							//hrefElem.html('&utrif;');
						}
						else if(1 == hrefElem.orderby){
							hrefElem.orderby = -1;
							//hrefElem.html('&dtrif;');
						}
						else if(-1 == hrefElem.orderby){
							hrefElem.orderby = 0;
							//hrefElem.html('&squf;');
						}
						hrefElem.html(me.options.columnSortHtml[hrefElem.orderby]);
						me.orderByList[hrefElem.fieldId] = hrefElem.orderby;
						me.refreshData();
					})
				})(href);
			}
			
		}
	}
	
	/**
	 * resets the order for all the columns
	*/
	this.resetOrder = function(fieldIdToPreserve){
	
		if(null == fieldIdToPreserve){
			for(var i=0; i<me.htmlColumnList.length; i++){
				var href = me.htmlColumnList[i];
				href.orderby = 0;
				href.html(me.options.columnSortHtml[href.orderby]);
			}
			for(var i in me.orderByList){
				me.orderByList[i] = 0;
			}
		}
		else{
			for(var i=0; i<me.htmlColumnList.length; i++){
				var href = me.htmlColumnList[i];
				if(null == href.actionable || href.actionable){
					if(fieldIdToPreserve != href.fieldId){
						me.orderByList[href.fieldId] = 0;
						href.orderby = 0;
						href.html(me.options.columnSortHtml[href.orderby]);
					}		
				}			
			}
		}
		
	};
	
	this.triggerPageChange = function(pageNumber){
	
		me.pageNumber = pageNumber;
		me.refreshData();
	};
	
	/*this.triggerFilterChange = function(){
	
		me.refreshData(pageNumber);
	};*/
	
	this.createFilter = function(p1){
		console.log('TODO: create filters with param: ' + p1);
	}
		
	/*this.changeColumnVisibilty = function(){
		
		me.jsonData;
	}*/
	
	/**
	 * fires the HttpRequest to get the data from the server 
	 * @url if not null, it is the url for export - else it is the options.urlData
	 * @callBackFunction if null, populate the table rows
	*/
	this.refreshData = function(url, callBackFunction){
				
		/*** filters part	***/
		var doThrowError = (null != me.options.stopOnFiltersError) ? me.options.stopOnFiltersError : false;
		try{
			var validFilterList = me.stdTableFilter.validateFilterValues(doThrowError);
		}
		catch(ex){
			if(doThrowError){
				me.options.doThisWhenFilterHasError();
				return;
			}
		}
		
		/*** order part ***/
		var orderData = {
			fieldId: 1,
			orderValue: 0
		};
		var orderFieldList = new Array();
		for(var i in me.orderByList){
			orderFieldList.push({fieldId: i, orderValue: me.orderByList[i]});
			if(0 != me.orderByList[i]){
				orderData = {
					fieldId: i,
					orderValue: me.orderByList[i]
				};
			}
		}
		var jsonPostData = {
			order: orderData,
			/*orders: orderFieldList,*/
			filters: validFilterList,
			pageNum: me.pageNumber
        };
		var fct = (null != callBackFunction) ? callBackFunction : function(response){
			var jsonResult = response[me.jsonKeyData];
			me.setData(jsonResult);
			me.populateRow();
			me.stdTablePaging.updateTotalNbPage(response[me.jsonNbPageKeyData]);
		};
		var httpOptions = {httpMethod: 'post', dataType: 'json'};
		if(null != options.contentTypePost){
			httpOptions.contentTypePost = options.contentTypePost;
		}
		var urlData = (null == url) ? me.urlData : url;
		Cubee.Http.sendRequest(urlData, jsonPostData, fct, httpOptions);
	};
	
	/**
	 *
	*/
	this.setData = function(jsonData){
	
		me.jsonData = jsonData;
	};

	/**
	 * creates the rows that display data
	*/
	this.populateRow = function(){
		
		var tBodyElem = me.tableElem.find('tbody').eq(0);
		tBodyElem.html('');
		for(var j=0; j<me.visibleColumnList.length; j++){	
			var colDomElem = $(me.tableElem.find('col')[j]);
			colDomElem.css({width: me.visibleColumnList[j].width});
		}
		for(var i=0; i<me.jsonData.length; i++){
			var trElem = document.createElement('tr');
			var hasTrElemCursorPointer = false;
			if(null != options.onClickRow){
				var $trElem = $(trElem);
				if(null != me.options.onClickRow){
					hasTrElemCursorPointer = true;
					(function(jsonRow){
						$trElem.addClass('cubee-action');
						$trElem.on('click', function(){
							options.onClickRow(jsonRow);
						});
					})(me.jsonData[i]);
				}			
			}		
			for(var j=0; j<me.visibleColumnList.length; j++){
				var tmpColumn = me.visibleColumnList[j];
				var tdElem = document.createElement('td');
				if(null != tmpColumn.renderer){
					var objToAppend = tmpColumn.renderer(me.jsonData[i][tmpColumn.fieldKey], me.jsonData[i]);
					if('string' == $.type(objToAppend)){
						$(tdElem).html(objToAppend);
					}
					else{	//jQuery object given
						$(tdElem).append(objToAppend);
					}
				}
				else{
					$(tdElem).html(me.jsonData[i][tmpColumn.fieldKey]);
				}
				if(null != tmpColumn.onClick){
					(function($tdElem, clickFunction, tdData, rowData, hasTrElemCursorPointer){
						if(!hasTrElemCursorPointer){
							$tdElem.addClass('cubee-action');
						}
						$tdElem.on('click', function(e){
							clickFunction(tdData, rowData);
							e.stopPropagation();
						});
					})($(tdElem), tmpColumn.onClick, me.jsonData[i][tmpColumn.fieldKey], me.jsonData[i], hasTrElemCursorPointer);
				}
				
				trElem.appendChild(tdElem);				
			}
			tBodyElem.append(trElem);
		}
	};
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// "public methods" ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.exportData = function(){
	
		console.log('##exportData url', options.exportUrl);
		var fct = function(response){
			var jsonResult = response[me.jsonKeyData];
			console.log('##export response', jsonResult);
		};
		me.refreshData(options.exportUrl, fct);
	};
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	var me = this;
	this.constructor = function(){
	
		//default options:
		if(null == options.filtersPlusButtonHtml){
			options.filtersPlusButtonHtml = '+';
		}
	
		me.options = options;
		me.columnList = options.columnList;
		me.visibleColumnList = new Array();
		for(var i=0; i<me.columnList.length; i++){
			var tmpColumn = me.columnList[i];
			if(null == tmpColumn.visible || tmpColumn.visible || tmpColumn.sticky){
				me.visibleColumnList.push(tmpColumn);
			}
		}
		
		var tableElem = document.createElement('table');
		tableElem.className = 'cubee ' + (null != options.tableClass) ? options.tableClass : '';
		var trElem = document.createElement('tr');
		var htmlColumnList = new Array();
		me.selectElementList = new Array();
		var nbColumnsVisible = 0;
		var columnSelectHeader = $('<select></select>');
		for(var i=0; i<me.columnList.length; i++){
			var tmpColumn = me.columnList[i];
			if(!tmpColumn.sticky){
				columnSelectHeader.append($('<option value="'+ tmpColumn.fieldId +'">'+ tmpColumn.label +'</option>'));
			}
		}
		
		for(var i=0; i<me.visibleColumnList.length; i++){
			var tmpColumn = me.visibleColumnList[i];		
			nbColumnsVisible = nbColumnsVisible + 1;
			var colElem = document.createElement('col');
			$(colElem).attr('style', 'width:'+ tmpColumn.width +'');
			tableElem.appendChild(colElem);
			var thElem = document.createElement('th');
			var $thElem = $(thElem);
			if(!tmpColumn.sticky){
				var selectElemClone = columnSelectHeader.clone();
				selectElemClone.cubeeIndex = i;
				me.selectElementList.push(selectElemClone);
				(function(column, index){
					selectElemClone.on('change', function(){
						for(var i=0; i<me.htmlColumnList.length; i++){
							me.htmlColumnList[i].fieldId = me.selectElementList[i].val();
						}
						me.resetOrder();
						var selectedFieldId = $(this).val();
						var newVisibleColumn = null;
						for(var i=0; i<me.columnList.length; i++){
							var tmpCol = me.columnList[i];
							if(selectedFieldId == tmpCol.fieldId){
								newVisibleColumn = tmpCol;
							}
						}			
						var nextHref = selectElemClone.hrefElem;
						nextHref.fieldId = newVisibleColumn.fieldId;
						if(null != newVisibleColumn.actionable && !newVisibleColumn.actionable){
							nextHref.css({display: 'none'});
						}
						else{
							nextHref.css({display: ''});
						}
						me.visibleColumnList[index] = newVisibleColumn;
						me.populateRow();
					});
				})(tmpColumn, i);
				$thElem.append(selectElemClone.val(tmpColumn.fieldId));
				var $a = $('<a href="#" style="padding-left:6px;">'+ me.options.columnSortHtml[0] +'</a>');
				$a.orderby = 0;
				$a.fieldId = tmpColumn.fieldId;
				selectElemClone.hrefElem = $a;
				htmlColumnList.push($a);
				$thElem.append($a);
			}
			else{
				$thElem.html(tmpColumn.label);
			}
			trElem.appendChild(thElem);
		}
		me.htmlColumnList = htmlColumnList;
		tableElem.appendChild(trElem);
		//---------td 'no row'----------------//
		var tdBodyElem = document.createElement('tbody');
		trElem = document.createElement('tr');
		var tdNoRowElem = document.createElement('td');
		var $tdNoRowElem = $(tdNoRowElem);
		$tdNoRowElem.attr('colspan', nbColumnsVisible).attr('align', 'center');
		$tdNoRowElem.html('no result');
		trElem.appendChild(tdNoRowElem);
		tdBodyElem.appendChild(trElem);
		tableElem.appendChild(tdBodyElem);
		//----------------------------------//
		me.stdTableFilter = new Cubee.StdTableFilter(options);
		me.stdTablePaging = new Cubee.StdTablePaging(me, options);
		me.tableElem = $(tableElem);
		me.globalFormElem = $('<form></form>');
		me.globalFormElem.on('submit', function(e){
			e.preventDefault();
			var pageNumber = 1;
			me.pageNumber = pageNumber;
			me.stdTablePaging.updatePageNumber(pageNumber);
			me.refreshData();
			return false;
		});
		me.globalFormElem.append(me.tableElem);
		divElem.appendChild(me.globalFormElem[0]);
		me.urlData = options.urlData;
		me.jsonKeyData = options.jsonRecordsKeyData;
		me.jsonNbPageKeyData = options.jsonNbPageKeyData;
		me.createHtmlTable();
		me.triggerPageChange(1);
	}
	
	this.constructor();
	
	
};
