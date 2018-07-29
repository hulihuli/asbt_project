// JavaScript Document

(function($){ 
	$.fn.tuiFolding = function(options){ 
		var defaults = {
			type:1,
			speed:"fast",
			event:"click"
		}
		var myData = $.extend(defaults,options);
		var $bar = $(this).find(myData.bar);
		var $content = $(this).find(myData.content);

		if(myData.type == 2){
			$bar.eq(0).find("b").html("-");
			$content.eq(0).show();
		}

		$bar.bind(myData.event,function(){
			if($(this).next().is(":visible")){
				if(myData.type == 2){
					return false;
				}
				else{
					$(this).next().slideUp(myData.speed).end().removeClass("selected");
					$(this).find("b").html("+");
				}
			}
			else{
				if(myData.type == 3){
					$(this).next().slideDown(myData.speed).end().addClass("selected");
					$(this).find("b").html("-");
				}else{
					$content.slideUp(myData.speed);
					$bar.removeClass("selected");
					$bar.find("b").html("+");
					$(this).next().slideDown(myData.speed).end().addClass("selected");
					$(this).find("b").html("-");
				}
			}
		});
	}
})(jQuery); 


