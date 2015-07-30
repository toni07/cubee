"use strict";
var StdTree = function(divElem, options){

	var me = this;
	this.buildHtmlChildren = function(elem){
		
		var htmlStr = '<li>' + elem.label + '</li>';
		if(elem.children.length > 0){
			htmlStr+= '<ul>';
		}
		for(var i=0; i<elem.children.length; i++){
			htmlStr+= '<li>'+ me.buildHtmlChildren(elem.children[i]) +'</li>';
		}
		if(elem.children.length > 0){
			htmlStr+= '</ul>';
		}
		return htmlStr;
	}
		
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.constructor = function(){
	
		var fct = function(response){
			var treeRoot = response.result;
			var htmlStr = '';
			for(var i=0; i<treeRoot.length; i++){
				htmlStr+= '<ul>' + me.buildHtmlChildren(treeRoot[i]) + '</ul>';
			}
			var newDiv = $('<div>'+ htmlStr +'</div>');
			divElem.appendChild(newDiv[0]);
		};
		Http.sendRequest(options.urlData, {}, fct, {});
	}
	
	this.constructor();
	
	
};