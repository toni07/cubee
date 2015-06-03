var StdTableFilter = function(options){

	var me = this;
	/////	span filter		/////
	var spanAddFilter = $('<span class="cubee-action">+</span>');
	spanAddFilter.on('click', function(){
		var thisElem = $(this);
		console.log('##thisElem', me.spanAddFilter.nbFilterElem);
		if(null == me.spanAddFilter.nbFilterElem){
			me.spanAddFilter.nbFilterElem = 0;
		}
		if(0 == me.spanAddFilter.nbFilterElem){
			me.boutonSendFilter.show();
		}
		me.spanAddFilter.nbFilterElem = me.spanAddFilter.nbFilterElem + 1;
		var parent = thisElem.parents('div.cubee-table-filter');
		var divModel = parent.children('div.cubee-model');
		Http.copyModel(divModel, parent, function(newDiv){
			var spanDeleteLine = $('<span class="cubee-action"> X </span>');
			spanDeleteLine.on('click', function(){
				newDiv.remove();
				me.spanAddFilter.nbFilterElem = me.spanAddFilter.nbFilterElem - 1;
				if(0 == me.spanAddFilter.nbFilterElem){
					me.boutonSendFilter.hide();
				}
			});
			newDiv.append(spanDeleteLine);
		});
	});
	this.spanAddFilter = spanAddFilter;
	
	/////	<select> for filter field	/////
	var selectField = $('<select disabled="disabled"><option>** choix **</option></select>');
	for(var i=0; i<options.columnList.length; i++){
		var column = options.columnList[i];
		selectField.append($('<option value="'+ column.fieldId +'">'+ column.label +'</option>'));
	}
	this.selectField = selectField;
	
	/////	bouton post filter	/////
	var boutonSendFilter = $('<input type="submit" />');
	boutonSendFilter.hide();
	this.boutonSendFilter = boutonSendFilter;
};
