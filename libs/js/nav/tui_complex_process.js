(function($){ 
	$.fn.loadComplexProcess = function(options){ 
		var defaults = {
			steps:[],
		}
		var myData = $.extend(defaults,options); 
		var content="";
		var len = myData.steps.length;

		for(var i=0;i<len; i++){
			var currData=myData.steps[i];
			var childStr="";
			if(currData.children){
				for(var j=0;j<currData.children.length; j++){
					var childData=currData.children[j];
					var className="item"+currData.children.length;
					if(childData.steps)
					{
						var stepStr="";
						var mr="mr";
						for(var k=0;k<childData.steps.length; k++){
							var stepData=childData.steps[k];
							if(k==(childData.steps.length-1))
								mr="";
							stepStr+= '<a href="javascript:void(0)" class="item '+className+' '+mr+' substep status'+stepData.status+'" id="'+stepData.id+'">'+stepData.name+'</a>';
						}
						childStr+='<div>'+stepStr+'</div>';
					}else{
						childStr+='<a href="javascript:void(0)" class="item '+className+' status'+childData.status+'" id="'+childData.id+'">'+childData.name+'</a>';
					}
				}
			} 
			var nameStr="";
			if(currData.name){
				nameStr='<a href="javascript:void(0)" class="item status'+currData.status+'" id="'+currData.id+'">'+currData.name+'</a>'
			}
			var tipStr="";
			if(currData.tip){
				tipStr='<div class="tip" >'+currData.tip+'</div>'
			}
			content+='<div class="step">'+childStr+nameStr+tipStr+'</div>'
			if(i!=(len-1))
				content+='<div class="interval"></div>'
		}
		$(this).append("<div class='mainProcess'>"+content+"</div>");
	};

})(jQuery); 