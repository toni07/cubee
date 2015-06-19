var Http = {

	/*
	var json = { "toto" : 'test', "toto2" : 'model', "key3": 36};
	$.ajax({ 
			url:'/od3m-bo/party/list',    
			type:"POST", 
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(json),
			async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
			cache: false,    //This will force requested pages not to be cached by the browser          
			processData:false, //To avoid making query String instead of JSON
			success: function(resposeJsonObject){                           
	}});
	*/

	sendRequest: function(url, params, callbackFunction, options){

		var ajaxAttributes = {
			type: (null != options.httpMethod) ? options.httpMethod : 'get',
			url: url,
			data: params,
			beforeSend: function(){
			}
		};
		if(null != options.dataType){
			ajaxAttributes.dataType = options.dataType;
		}
		if(null != options.contentTypePost){
			ajaxAttributes.contentType = options.contentTypePost;
			if(CUBEE_HTTP_POST_HEADER_JSON == options.contentTypePost){
				ajaxAttributes.data = JSON.stringify(ajaxAttributes.data);
			}
		}
		
		$.ajax(ajaxAttributes).
		done(function(data){
			callbackFunction(data);
		}).
		fail(function(){
			alert('fail');
		}).
		always(function(){
		});
	},
	
	/**
	 * @param orderbyList: key/value list: key=fieldId,val=fieldOrder
	*/
	buildOrderBy: function(orderbyList){
	
		var result = new Array();
		//for(var i=0; i<orderbyList; i++){
		for(var i in orderbyList){
			result.push(i + '_' + orderbyList[i]);
		}
		return result.join('##');
	},
	
	copyModel: function(elemToCopy, elemTarget, callbackFunction){
		
		var copiedElem = elemToCopy.clone();
		copiedElem.removeClass('cubee-model');
		copiedElem.find('input, select').prop('disabled', false);
		elemTarget.append(copiedElem);
		callbackFunction(copiedElem);
	}
};
