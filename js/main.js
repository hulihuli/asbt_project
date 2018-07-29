/*
 * author:huli
 * time:2018-07
 * 
 */
function setSize() {
    //set page height
    var height = document.documentElement.clientHeight;

    var topHeight = $(".right_header").outerHeight();
    var breadHeight = $(".bread_nav").outerHeight();

    $(".right_main").outerHeight(height - topHeight - 30);
}

function dateSelected(){
    var start = $(".start_date").val();
    var end = $(".end_date").val();

	if(start && end){
		$(".btn_screen").addClass("current");
	}
	else{
	    $(".btn_screen").removeClass("current");
    }
}

$(function () {
    setSize();
    $(window).resize(function () {
        setSize();
    });
    //left menu
    $(".menu_list li").mouseover(function () {
        $(this).addClass("hover");
        $(this).find("div").show();
    }).mouseout(function () {
        $(this).removeClass("hover");
        $(this).find("div").hide();
    });

    $(".menu_list .left_con").click(function () {
        $(this).parents(".left_menu").addClass("open");
    });

    $(".menu_list_open .left_con").click(function () {
        $(this).parents(".left_menu").removeClass("open");
    });

    //	$(".menu_list li>div").mouseover(function(){
    //		$(this).siblings().addClass("current");
    //		$(this).show();
    //	}).mouseout(function(){
    //		$(this).siblings().removeClass("current");
    //		$(this).hide();
    //	})

    //user_info dropdown
    $(".user_info,.user_info .dropdown").mouseover(function () {
        $(".user_info .dropdown").addClass("current");
    }).mouseout(function () {
        $(".user_info .dropdown").removeClass("current");
    })


})