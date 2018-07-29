/*
 * author:huli
 * date:2017/7
 * 
 */
$(function(){
	$(".dropdown").hover(function(){
		$(this).addClass("hover");
	},
	function(){$(this).removeClass("hover");
	});
	//�������
	$(".dropdown_click.dropdown_default .dropdown_A").click(function(){
		$(this).next(".dropdown_menu").toggle();
		return true
	});
	//��������
	$(".dropdown_hover.dropdown_default").hover(function(){
		$(this).find(".dropdown_menu").show();
	},function(){
		$(this).find(".dropdown_menu").hide();
	})
	
	//----------------2017/07-----------------------
	$(".dropdown_slide.dropdown_click .dropdown_A").click(function(){
		$(this).next(".dropdown_menu").slideToggle();
		return false;
		
	})
	
	$(".dropdown_fade.dropdown_click .dropdown_A").click(function(){
		$(this).next(".dropdown_menu").fadeToggle();
		return false;
		
	})
	
	$(".dropdown_slide.dropdown_hover").hover(function(){
		$(this).find(".dropdown_menu").slideDown();
	},function(){
		$(this).find(".dropdown_menu").slideUp();
	})
	
	$(".dropdown_fade.dropdown_hover").hover(function(){
		$(this).find(".dropdown_menu").fadeIn();
	},function(){
		$(this).find(".dropdown_menu").fadeOut();
	})
	
	

	$(".dropdown_menu li a").click(function(){
		$(this).parents(".dropdown_menu").hide();
	});

	isAMouseOver = false;
	$(".dropdown_menu li a").bind('mouseover', function(){
		isAMouseOver = true;
	})
	$(".dropdown_menu li a").bind('mouseout', function(){
		isAMouseOver = false;
	})
	$(".dropdown_click .dropdown_A").blur(function(){
		if(!isAMouseOver)
			$(".dropdown_menu").hide();
	 });


	 /*�����˵�*/
	$(document).on("mouseenter",".dropdown",function(){
		$(this).addClass("hover");
	});
	$(document).on("mouseleave",".dropdown",function(){
		$(this).removeClass("hover");
	});
	$(document).on("mouseenter",".dropdown_hover",function(){
		$(this).find(".dropdown_menu").show();
	});
	$(document).on("mouseleave",".dropdown_hover",function(){
		$(this).find(".dropdown_menu").hide();
	});
	$(document).on("click",".dropdown_menu li a",function(){
		$(".dropdown_menu").hide();
	});
	$(document).on("mouseenter",".ddmenu > li",function(){
		$(this).addClass("open");
	});
	$(document).on("mouseleave",".ddmenu > li",function(){
		$(this).removeClass("open");
	});
	
});


