"use strict";
var StdTablePaging = function(options){

	var me = this;	
	
	/////////// global div for filters /////////////
	this.createGlobalDiv = function(){
	
		me.globalDiv = $('<div class="cubee-table-filter">'
				+ 	'<div class="t07-center">'
				+ 		'<div>'
				+			'<a href="#" class="rew-total"> << </a>'
				+			'<a href="#" class="rew"> < </a>'
				+			'Page <input type="text" class="nbpage" value="1"> / <span class="nbpage">1</span>'
				+			'<a href="#" class="fwd"> > </a>'
				+			'<a href="#" class="fwd-total"> >> </a>'
				+		'</div>'
				+	'</div>'
				+'</div>');
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.constructor = function(){
	
		me.createGlobalDiv();
		me.currentPage = 1;
		
		me.globalDiv.find('a').click(function(event){
			event.preventDefault();
			var hrefElem = $(this);
			if(hrefElem.hasClass('rew-total')){
				me.currentPage = 1;
			}
			else if(hrefElem.hasClass('rew')){
				me.currentPage = Math.max(me.currentPage - 1, 1);
			}
			else if(hrefElem.hasClass('fwd')){
				me.currentPage = me.currentPage + 1;
			}
			var params = {
				'page-num': me.currentPage
			};
			Http.sendRequest('http://toto.com', params, function(response){
				thisTable.append('<tr></tr>');
			});
		});
	}
	
	this.constructor();
	
	
};