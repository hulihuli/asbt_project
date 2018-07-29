(function($){ 
	$.fn.loadProcess = function(options){ 
		var defaults = {
			steps:[],
		}
		var myData = $.extend(defaults,options); 
		var content="";
		var len = myData.steps.length;
		for(var i=0;i<len; i++){
			content+='<a href="javascript:void(0)" id="progressStep01" style="cursor:default;"><i></i><span>'+myData.steps[i] +'</span><b></b> </a>'
		}
		$(this).addClass("tui_process");
		$(this).append($(content));

		$(this).children("a").eq(0).addClass("first");
		$(this).children("a").eq(len-1).addClass("last");

		var myWid = parseInt(100/len)+"%"
		$(this).children("a").css({"width":myWid});

		if(myData.step)
			$(this).setStep(myData.step);
	};

	$.fn.setStep = function(index){ 
		index = index-1;
		$(this).children("a").eq(index).addClass("current");
		for(var i=0;i<index; i++){
			$(this).children("a").eq(i).addClass("done");
		}
		
	};

})(jQuery); 