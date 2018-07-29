(function($){ 
	$.fn.scrollBoxRender = function(options){ 
		var thismc = $(this);
		var scroll = $(this).find(".scroll");
		var Scrp=scroll.find("p");
		var content = $(this).find(".scrollContent");
		var clickScoll = false;
		var Scrp_Height =Scrp.outerHeight()/2;
		var Num2=scroll.outerHeight()-Scrp.outerHeight();
		var offsetX=0;
		var offsetY=0;
		var tempObj={};
		Scrp.mousedown(function(e){  
			tempObj.select = document.onselectstart;
			document.onselectstart = function (){ return false; };
			clickScoll=true;
		});
		$(document).mouseup(function(){
			clickScoll=false;
			document.onselectstart = tempObj.select;
		});
		$(document).mousemove(function(e){
			if(clickScoll){
				var t = document.documentElement.scrollTop || document.body.scrollTop;
				var Num1 = e.clientY + t - thismc.offset().top;
				//var Num1= e.clientY - scroll.position().top;
				var y=Num1 - Scrp_Height;
				if(y<=1){
					Scrll(0);
					Scrp.css("top",1);
				}else if(y>=Num2){
					Scrp.css("top",Num2);
					Scrll(Num2);
				}else{
					Scrll(y);
				}
			}
		})

		function Scrll(y){
			Scrp.css("top",y);
			content.css("margin-top",-(y/(scroll.outerHeight()-Scrp.outerHeight()))*(content.outerHeight()-thismc.height()));
		}

		if(thismc[0].addEventListener) 
			thismc[0].addEventListener('DOMMouseScroll',wheel,true);
			thismc[0].onmousewheel=wheel;

		var Distance=Num2*0.1;
		function wheel(e){
			var evt = e || window.event;
			var wheelDelta = evt.wheelDelta || evt.detail;
			if(wheelDelta == -120 || wheelDelta == 3){
				var Distances=Scrp.position().top+Distance;
				if(Distances>=Num2){
					Scrp.css("top",Num2);
					Scrll(Num2);
				}else{
					Scrll(Distances);
				}
				return false;
			}else if (wheelDelta == 120 || wheelDelta == -3){
				var Distances=Scrp.position().top-Distance;
				if(Distances<=1){
					Scrll(0);
					Scrp.css("top",1);
				}else{
					Scrll(Distances);
				}
				return false;
			}   
		}

	}
})(jQuery); 
