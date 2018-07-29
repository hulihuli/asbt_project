
/*
 * jQuery floatPanel Plugins
 * author:siwei
 * date: 2015/7/22
 * 
 */
(function($){ 
	$.fn.floatPanelRender = function(option){ 
		var content = $(this).html();
		$(this).empty();
		
		//direction
		var direction = $(this).attr("direction");
		if ($(this).attr("direction") == null||$(this).attr("direction")=="") {
			direction = "top_left";
		}
		var direction1= direction.split("_")[0];//top bottom  left
		var direction2 = direction1;
		$(this).addClass("floatpanel_"+direction);
		

		if(direction1=="left"||direction1=="right")
				direction1 = "top";

		//txt
		var opentxt = $(this).attr("opentxt");
		var closetxt = $(this).attr("closetxt");
		if ($(this).attr("opentxt") == null||$(this).attr("opentxt")=="") {
			opentxt = "打开面板";
		}
		if ($(this).attr("closetxt") == null||$(this).attr("closetxt")=="") {
			closetxt = "关闭面板";
		}

		var inittxt =  $(this).attr("opentxt");
		var addedCotent;
		switch(direction2)
		{
			case "top":
			case "left":
				addedCotent = "<div class='floatpanel_con"+direction1+"'><div class='floatpanel_con'></div><div class='clearfix'></div></div><div class='floatpanel_btn"+direction1+"'><button title='"+closetxt+"' class='floatpanel_btn_btntop' type='button'>"+opentxt+"</button></div><div class='clearfix'></div>";
				break;
			case "bottom":
			case "right":
				addedCotent = "<div class='floatpanel_btn"+direction1+"'><button title='"+closetxt+"' class='floatpanel_btn_btntop' type='button'>"+opentxt+"</button></div><div class='floatpanel_con"+direction1+"'><div class='floatpanel_con'></div><div class='clearfix'></div></div><div class='clearfix'></div>";
				break;
		}
		$(this).append($(addedCotent));
		$(this).find(".floatpanel_con").append(content);
		
		
		var panel = $(this);
		var isOpen = true;
		var contentBox = $(this).children(".floatpanel_con"+direction1);
		var btnBox = $(this).children(".floatpanel_btn"+direction1);

		//size
		if ($(this).attr("panelWidth") != null){
			$(this).css({"width":parseInt($(this).attr("panelWidth"))+50});
			$(this).children(".floatpanel_contop").css({"width":$(this).attr("panelWidth")});
		}
		if ($(this).attr("panelHeight") != null){
			var middleHeight = $(this).attr("panelHeight") -(contentBox.outerHeight()-contentBox.height());
			contentBox.css({"height":middleHeight});		
		}
		
		var contentHeight= contentBox.outerHeight()+4;
		var contentWidth = contentBox.outerWidth();

		//fill
		if ($(this).attr("panelTitle") != null) 
			$(this).find(".panel_title").html($(this).attr("panelTitle"));

		//init
		closeIt(0);


		//event
		btnBox.find("button").bind('click',function(e)
		{ 			
			if(isOpen)
			{
				showIt();
				$(this).html(closetxt);
			}
			else
			{
				closeIt("slow");
				$(this).html(opentxt);
			}
			isOpen = !isOpen;
		});

		function closeIt(speed){
			switch(direction2)
			{
				case "top":
					panel.animate({top:'-'+contentHeight+'px'},speed);
					break;
				case "bottom":
					panel.animate({bottom:'-'+contentHeight+'px'},speed);
					break;
				case "left":
					panel.animate({left:'-'+contentWidth+'px'},speed);
					break;
				case "right":
					panel.animate({right:'-'+contentWidth+'px'},speed);
					break;
			}
		}

		function showIt(speed){
			switch(direction2)
			{
				case "top":
					panel.animate({top:'0px'},speed);
					break;
				case "bottom":
					panel.animate({bottom:'0px'},speed);
					break;
				case "left":
					panel.animate({left:'0px'},speed);
					break;
				case "right":
					panel.animate({right:'0px'},speed);
					break;
			}
		}
	}
})(jQuery); 