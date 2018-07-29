/*
 * jQuery spliter
 *
 * Copyright 2013, siwei,TianHao
 *
 * Last Update 2015.11.16
 */
(function($){ 
	$.fn.spliter = function(options){ 
		var defaults = {
			open:true,
			speed:0.2
		}
		var myData = $.extend(defaults,options); 
		if(myData.open){
			$(myData.elem).show();
			$(this).addClass("open");
		}
		else{
			$(myData.elem).hide();
			$(this).removeClass("open");
		}
		$(this).bind('click',function(e){
			$(myData.elem).toggle(myData.speed*1000);
			$(this).toggleClass("open");
		});
	};

	$.fn.layoutSpliter = function(options){ 
		var defaults = {
			open:true,
			index:0,//分隔条位置  0最边上 1中间
			type:0,//0第二，三列定宽  1第一二列定宽
			speed:0.2
		}

		//根据布置，计算坐标（myData.spliterPos1分隔条初始坐标，myData.spliterPos2滑动后坐标）
		var myData = $.extend(defaults,options);
		myData.diffWid = myData.totalWid-myData.width;
		if(myData.type==0){
			myData.spliterPos1 = myData.totalWid;
			myData.spliterPos2 = myData.diffWid ;
			if(myData.index==1){
				myData.spliterPos1 = myData.width;
				myData.spliterPos2 = 0;
			}
		}
		else
		{
			myData.spliterPos1 = myData.width;
			myData.spliterPos2 = 0;
			if(myData.index==1){
				myData.spliterPos1 = myData.totalWid;
				myData.spliterPos2 = myData.diffWid ;
			}

		}

		var thismc = $(this);
		thismc.css({"top":(this.parent().innerHeight()-thismc.height())/2});
		changeStatus(0);
		$(this).bind('click',function(e){
			changeStatus(myData.speed*1000);
		});

		function changeStatus(time){
			if(thismc.hasClass("spliterLeft")){
				if(myData.open){
					$(myData.elem).animate({width:myData.width},time);
					thismc.parent().find(".layout_box_content").parent().animate({marginLeft:-myData.totalWid},time);
					thismc.parent().find(".layout_box_content").animate({marginLeft:myData.totalWid},time);
					thismc.addClass("open");
					thismc.animate({left:myData.spliterPos1},time);
				}
				else{
					$(myData.elem).animate({width:'0px'},time);
					thismc.parent().find(".layout_box_content").parent().animate({marginLeft:-myData.diffWid },time);
					thismc.parent().find(".layout_box_content").animate({marginLeft:myData.diffWid },time);
					thismc.removeClass("open");
					thismc.animate({left:myData.spliterPos2},time);
				}
			}
			else{
				if(myData.open){
					$(myData.elem).animate({width:myData.width},time);
					thismc.parent().find(".layout_box_content").parent().animate({marginRight:-myData.totalWid},time);
					thismc.parent().find(".layout_box_content").animate({marginRight:myData.totalWid},time);
					thismc.addClass("open");
					thismc.animate({right:myData.spliterPos1},time);
				}
				else{
					
					$(myData.elem).animate({width:'0px'},time);
					thismc.parent().find(".layout_box_content").parent().animate({marginRight:-myData.diffWid },time);
					thismc.parent().find(".layout_box_content").animate({marginRight:myData.diffWid },time);
					thismc.removeClass("open");
					thismc.animate({right:myData.spliterPos2},time);
				}
			}
			myData.open=!myData.open;
		}
	}
})(jQuery); 					
