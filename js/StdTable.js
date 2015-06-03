"use strict";
var StdTable = function(idDiv, options){
	
	var me = this;
	var tableElem = document.createElement('table');
	tableElem.className = 'cubee';
	var trElem = document.createElement('tr');
	var htmlColumnList = new Array();
	var nbColumnsVisible = 0;
	var columnSelectHeader = $('<select></select>');
	for(var i=0; i<options.columnList.length; i++){
		var tmpColumn = options.columnList[i];
		columnSelectHeader.append($('<option value="'+ tmpColumn.fieldId +'">'+ tmpColumn.label +'</option>'));
	}
	
	for(var i=0; i<options.columnList.length; i++){
		var tmpColumn = options.columnList[i];
		if(null == tmpColumn.visible || tmpColumn.visible){
			nbColumnsVisible = nbColumnsVisible + 1;
			var colElem = document.createElement('col');
			$(colElem).attr('style', 'width:'+ tmpColumn.width +'');
			tableElem.appendChild(colElem);
			var thElem = document.createElement('th');
			var $thElem = $(thElem);
			$thElem.append(columnSelectHeader.clone().val(tmpColumn.fieldId));
			var $a = $('<a href="#">&squf;</a>');
			$a.orderby = 0;
			$a.fieldId = i;
			htmlColumnList.push($a);
			$thElem.append($a);
			trElem.appendChild(thElem);
		}		
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
	var divElem = document.getElementById(idDiv);
	divElem.appendChild(tableElem);
	this.stdTableFilter = new StdTableFilter(options);
	
	this.createHtmlTable = function(){
		
		/**
		 * @param urlGet The url used to retreive json data
		*/
		$.fn.jStdTable = function(urlGet, htmlColumnList, stdTableFilter) {
					
			var jsonResultKey = 'records';
			var thisTable = this;
			thisTable.currentPage = 1;
			thisTable.orderByList = new Array();
			
			var html = '<form>'
					+ '<div class="cubee t07-table-above" style="width:90%;">'
					+ 	'<div class="cubee-table-filter">'
					+	'	<div class="cubee-table-filter-title">Filtres </div>'
					+	'	<div class="cubee-model">'
					+	'		<select disabled="disabled"><option>** choix **</option><option>=</option><option><=</option><option>>=</option><option>!=</option></select> <input disabled="disabled" name="filter-value" type="text" placeholder=" valeur" />'
					+	'	</div>'
					+ 	'</div>'
					+ 	'<div class="t07-center">'
					//+ 		'<div class="pull-left">Nb par page<select><option></option></select></div>'
					+ 		'<div>'
					+			'<a href="#" class="rew-total"> << </a>'
					+			'<a href="#" class="rew"> < </a>'
					+			'Page <input type="text" class="nbpage" value="1"> / <span class="nbpage">1</span>'
					+			'<a href="#" class="fwd"> > </a>'
					+			'<a href="#" class="fwd-total"> >> </a>'
					+		'</div>'
					+	'</div>'
					+'</div>'
				+'</form>';
			var elem = $(html);
			elem.on('submit', function(e){
				e.preventDefault();
				alert('todo: submit');
				return false;
			});
			elem.find('.cubee-model').prepend(stdTableFilter.selectField);
			elem.find('.cubee-table-filter-title').append(stdTableFilter.spanAddFilter);
			stdTableFilter.boutonSendFilter.insertAfter(elem.find('.cubee-table-filter'));
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
			return this;
		}
		me.htmlTable = $(tableElem).jStdTable('http://opendata.paris.fr/api/records/1.0/search?dataset=troncon_voie', htmlColumnList, this.stdTableFilter);
	}
	
	this.createFilter = function(p1){
		console.log('TODO: create filters with param: ' + p1);
	}
	
	this.jsonData = [
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
	];
	
	this.changeColumnVisibilty = function(){
		
		me.jsonData;
	}
	
	/**
	 * fires the HttpRequest to get the data from the server 
	*/
	this.getData = function(){
		
		var paramsIni = {
			'page-num': thisTable.currentPage
		};
		Http.sendRequest(urlGet, paramsIni, function(response){
			var jsonResult = response[jsonResultKey];
			var tBodyElem = thisTable.find('tbody').eq(0);
			tBodyElem.html('');
			for(var i=0; i<jsonResult.length; i++){
				var trElem = document.createElement('tr');
				console.log(jsonResult[i]);
				if(null != options.onClickRow){
					var $trElem = $(trElem);
					(function(jsonData){
						$trElem.addClass('cubee-action');
						$trElem.on('click', function(){
							options.onClickRow(jsonData);
						});
					})(jsonResult[i]);
				}		
				for(var j=0; j<options.columnList.length; j++){
					var tmpColumn = options.columnList[j];
					if(null == tmpColumn.visible || tmpColumn.visible){
						var tdElem = document.createElement('td');
						$(tdElem).html(tmpColumn.label);
						trElem.appendChild(tdElem);
					}
				}
				tBodyElem.append(trElem);
			}
		});
	}

	/**
	 * creates the rows that display data
	*/
	this.populateRow = function(){
		
		var tBodyElem = me.htmlTable.find('tbody').eq(0);
		tBodyElem.html('');
		for(var i=0; i<me.jsonData.length; i++){
			var trElem = document.createElement('tr');
			console.log(me.jsonData[i]);
			if(null != options.onClickRow){
				var $trElem = $(trElem);
				(function(jsonRow){
					$trElem.addClass('cubee-action');
					$trElem.on('click', function(){
						options.onClickRow(jsonRow);
					});
				})(me.jsonData[i]);
			}		
			for(var j=0; j<options.columnList.length; j++){
				var tmpColumn = options.columnList[j];
				if(null == tmpColumn.visible || tmpColumn.visible){
					var tdElem = document.createElement('td');
					$(tdElem).html(tmpColumn.label);
					trElem.appendChild(tdElem);
				}
			}
			tBodyElem.append(trElem);
		}
	}
	
};
