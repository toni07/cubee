'use strict';
var CubeePanel = function(divElem, options){
		
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	var me = this;
	this.cubeeConstructor = function(){
	
		divElem.addClass('cubee-panel');
		var wrapperDiv = $('<div></div>');
		wrapperDiv.append(divElem.contents());
		divElem[0].innerHTML = '';
		divElem.append(wrapperDiv);
		me.isCollapsed = false;
		me.divTitle = null;
		if(null != options.title){
			me.divTitle = $('<div class="cubee-panel-title">'+ options.title +'</div>');
			divElem.prepend(me.divTitle);
		}
		if(null != options.collapsible && options.collapsible){
			var htmlCollapseButton1 = ' << ';
			var htmlCollapseButton2 = ' >> ';
			me.collapseButton = $('<div class="cubee-action" style="float:right;">'+ htmlCollapseButton1 +'</div>');
			me.collapseButton.on('click', function(){
				if(me.isCollapsed){
					divElem.css('width', '100%');
					if(null != me.divTitle){
						me.divTitle.removeClass('cubee-panel-title-rotate');
						me.divTitle.text(me.divTitle.oldText);	//TODO: bug if starts collapsed
					}
					me.collapseButton[0].innerHTML = htmlCollapseButton1;
					wrapperDiv.show();
				}
				else{
					divElem.css('width', '20px');
					if(null != me.divTitle){
						me.divTitle.oldText = me.divTitle.text();
						me.divTitle.addClass('cubee-panel-title-rotate');
						if(me.divTitle.oldText.length > divElem.height()/100){
							me.divTitle.text(me.divTitle.oldText.substring(0, 2) + '...');
						}
					}
					me.collapseButton[0].innerHTML = htmlCollapseButton2;
					wrapperDiv.hide();
				}
				me.isCollapsed = !me.isCollapsed;
			});
			divElem.prepend(me.collapseButton);
		}
	}
	
	this.cubeeConstructor();
	
};
