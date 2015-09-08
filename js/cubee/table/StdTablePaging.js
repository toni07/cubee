"use strict";
Cubee.StdTablePaging = function(stdTable, options){

	var me = this;	
	
	/////////// global div for filters /////////////
	this.createGlobalDiv = function(){
	
		me.globalDiv = $('<div class="cubee-table-paging">'
				+ 	'<div class="cubee-center">'
				+ 		'<div>'
				+			'<a href="#" class="rew-total"> << </a>'
				+			'<a href="#" class="rew"> < </a>'
				+			'Page <input type="text" class="current-page-num" value="1"> / <span class="nbpage-total">1</span>'
				+			'<a href="#" class="fwd"> > </a>'
				+			'<a href="#" class="fwd-total"> >> </a>'
				+		'</div>'
				+	'</div>'
				+'</div>');
	},
	
	this.updatePageNumber = function(pageNumber){
	
		me.globalDiv.find('.current-page-num').val(pageNumber);
	};
	
	this.updateTotalNbPage = function(totalNbPage){

		me.globalDiv.find('.nbpage-total').html(totalNbPage);
	};
	
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
				me.currentPage = Math.min(me.currentPage + 1, me.nbTotalPage);
			}
			/*var params = {
				'page-num': me.currentPage
			};
			Http.sendRequest('http://toto.com', params, function(response){
				thisTable.append('<tr></tr>');
			});*/
			me.updatePageNumber(me.currentPage);
			stdTable.triggerPageChange(me.currentPage);
		});
	}
	
	this.constructor();
	
	
};
