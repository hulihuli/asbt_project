/*
 * jQuery page Component 标准化页面
 * author:siwei
 * date: 2016/3/16
 * 
 */
 //对话管理
(function($){ 
	var myData={}
	$.showPage = function(options){ 
		showCustomPage(options);	
	}

	var showCustomPage=function(options,flag){
		myData={
			title: "", // 添加标题显示内容
			content:"",
			flag:1,//1成功 2错误 3信息,
			btns:[]
		}

		myData = $.extend(myData,options); 
		//建立容器
		var box = $("<div class='tui_customPage'></div>");
		$("body").append(box);

		var myIconBox;
		switch(myData.flag)
		{
			case 1:
				myIconBox= $('<div class="pageIcon success"></div>');
				break;
			case 2:
				myIconBox=$('<div class="pageIcon error"></div>');
				break;
			case 3:
				myIconBox=$('<div class="pageIcon info"></div>');
				break;
		}

		box.append(myIconBox);

		var myCotentBox = $('<div class="tip"><div class="title"></div><div class="content"></div><div class="btns"></div></div>');
		if(myData.content){
			myCotentBox.find(".content").html(myData.content);
		}
		if(myData.title)
			myCotentBox.find(".title").text(myData.title);
		if(myData.btns)
		{
			for(var i=0; i<myData.btns.length; i++){
				myCotentBox.find(".btns").append('<input class="btn btn_primary radius size_S" value="'+myData.btns[i]+'" type="button">');
			}
		}
		box.append(myCotentBox);

		$(".tui_customPage .btn").click(function(){
			if(myData.link){
				var myfun = eval(myData.link);
				myfun($(this).index());
			}
		})

		return this;	
	}
})(jQuery); 


