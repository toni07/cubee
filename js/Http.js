var Http = {

	sendRequest: function(url, params, callbackFunction, httpMethod){

		if(null == httpMethod){
			httpMethod = 'GET';
		}
		var ajaxAttributes = {
			type: httpMethod,
			url: url,
			data: params,
			beforeSend: function(){
			}
		};
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
	buildOrderBy(orderbyList){
	
		var result = new Array();
		//for(var i=0; i<orderbyList; i++){
		for(var i in orderbyList){
			result.push(i + '_' + orderbyList[i]);
		}
		return result.join('##');
	},
	
	copyModel: function(elemToCopy, elemTarget){
		
		var copiedElem = elemToCopy.clone();
		copiedElem.removeClass('cubee-model');
		copiedElem.find('input, select').prop('disabled', false);
		elemTarget.append(copiedElem);
	},
};
