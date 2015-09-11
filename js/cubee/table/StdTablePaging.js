"use strict";
Cubee.StdTablePaging = function(stdTable, options){

	var me = this;	
	
	/////////// global div for filters /////////////
	this.createGlobalDiv = function(){
	
		me.globalDiv = $('<div class="cubee-table-paging">'
				+ 	'<div class="cubee-center">'
				+ 		'<div>'
				+			'<a href="#" class="rew-total disabled"> << </a>'
				+			'<a href="#" class="rew disabled"> < </a>'
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

		me.nbTotalPage = totalNbPage;
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
			var doFireEvent = true;
			if(hrefElem.hasClass('rew-total')){
				if(1 == me.currentPage){
					doFireEvent = false;
				}
				me.currentPage = 1;
			}
			else if(hrefElem.hasClass('rew')){
				if(1 == me.currentPage){
					doFireEvent = false;
				}
				me.currentPage = Math.max(me.currentPage - 1, 1);
			}
			else if(hrefElem.hasClass('fwd')){
				if(me.currentPage == me.nbTotalPage){
					doFireEvent = false;
				}
				me.currentPage = Math.min(me.currentPage + 1, me.nbTotalPage);
			}
			else if(hrefElem.hasClass('fwd-total')){
				if(me.currentPage == me.nbTotalPage){
					doFireEvent = false;
				}
				me.currentPage = me.nbTotalPage;
			}
			if(1 == me.currentPage){
				me.globalDiv.find('a.rew-total').addClass('disabled');
				me.globalDiv.find('a.rew').addClass('disabled');
			}
			else{
				me.globalDiv.find('a.rew-total').removeClass('disabled');
				me.globalDiv.find('a.rew').removeClass('disabled');
			}
			if(me.currentPage == me.nbTotalPage){
				me.globalDiv.find('a.fwd-total').addClass('disabled');
				me.globalDiv.find('a.fwd').addClass('disabled');
			}
			else{
				me.globalDiv.find('a.fwd-total').removeClass('disabled');
				me.globalDiv.find('a.fwd').removeClass('disabled');
			}
			if(doFireEvent){
				me.updatePageNumber(me.currentPage);
				stdTable.triggerPageChange(me.currentPage);				
			}
		});
	}
	
	this.constructor();
	
	
};
