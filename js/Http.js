var Http = {

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
