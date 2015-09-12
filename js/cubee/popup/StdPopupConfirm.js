"use strict";
Cubee.StdPopupConfirm = function(options){

	var me = this;

	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////// constructor body ///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.construct = function(){

		var buttonYes = $('<button>YES</button>');
        buttonYes.on('click', function(){
            me.popup.close();
        });
        var buttonNo = $('<button>NO</button>');
        buttonNo.on('click', function(){
            me.popup.close();
        });
        var options2 = {
            bodyContents: $('<div><b>Sure to close?</b><br /></div>').append(buttonNo).append(buttonYes),		//mandatory
            closeCallback: function(){return;},
            doNotShowHideButton: true
        };
        me.popup = new Cubee.StdPopup(options2);
	}

	this.construct();


};
