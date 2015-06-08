"use strict";
var StdTable = function(divElem, options){
	
	/**
	 * creates the jQuery table
	*/
	this.createHtmlTable = function(){
	
		me.stdTableFilter.globalDiv.insertBefore(me.tableElem);
		me.stdTablePaging.globalDiv.insertBefore(me.tableElem);
		
		/*
		var jsonResultKey = 'records';
		var thisTable = this;
		thisTable.currentPage = 1;
		thisTable.orderByList = new Array();
		
		var html = ''
				+ '<div class="cubee t07-table-above" style="width:90%;">'
				+ 	'<div class="t07-center">'
				+ 		'<div>'
				+			'<a href="#" class="rew-total"> << </a>'
				+			'<a href="#" class="rew"> < </a>'
				+			'Page <input type="text" class="nbpage" value="1"> / <span class="nbpage">1</span>'
				+			'<a href="#" class="fwd"> > </a>'
				+			'<a href="#" class="fwd-total"> >> </a>'
				+		'</div>'
				+	'</div>'
				+'</div>'
			+'';
		var elem = $(html);
		
		elem.find('a').click(function(event){
			event.preventDefault();
			var hrefElem = $(this);
			if(hrefElem.hasClass('rew-total')){
				thisTable.currentPage = 1;
			}
			else if(hrefElem.hasClass('rew')){
				thisTable.currentPage = Math.max(thisTable.currentPage - 1, 1);
			}
			else if(hrefElem.hasClass('fwd')){
				thisTable.currentPage = thisTable.currentPage + 1;
			}
			var params = {
				'page-num': thisTable.currentPage
			};
			Http.sendRequest(urlGet, params, function(response){
				thisTable.append('<tr></tr>');
			});
		});
		elem.insertBefore(this);
		for(var i=0; i<htmlColumnList.length; i++){
			var href = htmlColumnList[i];
			(function(hrefElem){
				hrefElem.on('click', function(event){
					event.preventDefault();
					if(0 == hrefElem.orderby){
						hrefElem.orderby = 1;
						hrefElem.html('&utrif;');
					}
					else if(1 == hrefElem.orderby){
						hrefElem.orderby = -1;
						hrefElem.html('&dtrif;');
					}
					else if(-1 == hrefElem.orderby){
						hrefElem.orderby = 0;
						hrefElem.html('&squf;');
					}
					thisTable.orderByList[hrefElem.fieldId] = hrefElem.orderby;
					var params = {
						'page-num': thisTable.currentPage,
						'order-by': Http.buildOrderBy(thisTable.orderByList)
					};
					Http.sendRequest(urlGet, params, function(response){
						thisTable.append('<tr></tr>');
					});
				})
			})(href);
		}
		
		me.htmlTable = $(me.tableElem).jStdTable('http://opendata.paris.fr/api/records/1.0/search?dataset=troncon_voie', htmlColumnList, this.stdTableFilter);*/
	}
	
	this.triggerPageChange = function(pageNumber){
	
		me.pageNumber = pageNumber;
		me.getData();
	};
	
	/*this.triggerFilterChange = function(){
	
		me.getData(pageNumber);
	};*/
	
	this.createFilter = function(p1){
		console.log('TODO: create filters with param: ' + p1);
	}
		
	/*this.changeColumnVisibilty = function(){
		
		me.jsonData;
	}*/
	
	/**
	 * fires the HttpRequest to get the data from the server 
	*/
	this.getData = function(){
		
		var params = me.globalFormElem.serializeArray();
		params.push({name: 'page-num', value: me.pageNumber});
		Http.sendRequest(me.urlData, params, function(response){
			var jsonResult = response[me.jsonKeyData];
			me.setData(jsonResult);
			me.populateRow();
		});
	};
	
	this.setData = function(jsonData){
	
		me.jsonData = jsonData;
		/*me.jsonData = [
			{
				toto1: 'yooo',
				toto2: 'gahah',
				toto3: 12,
				toto4: '2012-05-06',
				toto5: 222
			},
			{
				toto1: 'fzedz',
				toto2: 'cccccc',
				toto3: 48,
				toto4: '2017-05-06',
				toto5: 1
			}
		];*/
	};

	/**
	 * creates the rows that display data
	*/
	this.populateRow = function(){
		
		var tBodyElem = me.tableElem.find('tbody').eq(0);
		tBodyElem.html('');
		for(var i=0; i<me.jsonData.length; i++){
			var trElem = document.createElement('tr');
			if(null != options.onClickRow){
				var $trElem = $(trElem);
				(function(jsonRow){
					$trElem.addClass('cubee-action');
					$trElem.on('click', function(){
						options.onClickRow(jsonRow);
					});
				})(me.jsonData[i]);
			}		
			for(var j=0; j<me.visibleColumnList.length; j++){
				var tmpColumn = me.visibleColumnList[j];
				var tdElem = document.createElement('td');
				$(tdElem).html(me.jsonData[i][tmpColumn.fieldKey]);
				trElem.appendChild(tdElem);				
			}
			tBodyElem.append(trElem);
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	var me = this;
	this.constructor = function(){
	
		me.columnList = options.columnList;
		me.visibleColumnList = new Array();
		for(var i=0; i<me.columnList.length; i++){
			var tmpColumn = me.columnList[i];
			if(null == tmpColumn.visible || tmpColumn.visible){
				me.visibleColumnList.push(tmpColumn);
			}
		}
		
		var tableElem = document.createElement('table');
		tableElem.className = 'cubee';
		var trElem = document.createElement('tr');
		var htmlColumnList = new Array();
		var nbColumnsVisible = 0;
		var columnSelectHeader = $('<select></select>');
		for(var i=0; i<me.columnList.length; i++){
			var tmpColumn = me.columnList[i];
			columnSelectHeader.append($('<option value="'+ tmpColumn.fieldId +'">'+ tmpColumn.label +'</option>'));
		}
		
		for(var i=0; i<me.visibleColumnList.length; i++){
			var tmpColumn = me.visibleColumnList[i];		
			nbColumnsVisible = nbColumnsVisible + 1;
			var colElem = document.createElement('col');
			$(colElem).attr('style', 'width:'+ tmpColumn.width +'');
			tableElem.appendChild(colElem);
			var thElem = document.createElement('th');
			var $thElem = $(thElem);
			var selectElemClone = columnSelectHeader.clone();
			(function(column, index){
				selectElemClone.on('change', function(){
					var selectedFieldId = $(this).val();
					var newVisbileColumn = null;
					for(var i=0; i<me.columnList.length; i++){
						var tmpCol = me.columnList[i];
						if(selectedFieldId == tmpCol.fieldId){
							newVisbileColumn = tmpCol;
						}
					}
					me.visibleColumnList[index] = newVisbileColumn;
					me.populateRow();
				});
			})(tmpColumn, i);
			$thElem.append(selectElemClone.val(tmpColumn.fieldId));
			var $a = $('<a href="#">&squf;</a>');
			$a.orderby = 0;
			$a.fieldId = i;
			htmlColumnList.push($a);
			$thElem.append($a);
			trElem.appendChild(thElem);
					
		}
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
		me.stdTableFilter = new StdTableFilter(options);
		me.stdTablePaging = new StdTablePaging(me, options);
		me.tableElem = $(tableElem);
		me.globalFormElem = $('<form></form>');
		me.globalFormElem.on('submit', function(e){
			e.preventDefault();
			var pageNumber = 1;
			me.pageNumber = pageNumber;
			me.stdTablePaging.updatePageNumber(pageNumber);
			me.getData();
			return false;
		});
		me.globalFormElem.append(me.tableElem);
		divElem.appendChild(me.globalFormElem[0]);
		me.urlData = 'http://opendata.paris.fr/api/records/1.0/search?dataset=troncon_voie';
		me.jsonKeyData = 'records';
		me.createHtmlTable();
		me.triggerPageChange(1);
	}
	
	this.constructor();
	
	
};
