/*
 * jQuery popAlert Component
 * author:siwei
 * date: 2015/7/5
 * 
 */
 //对话管理
(function($){ 
	var myData={}
	var type;
	$.showAlert = function(options){ 
		showPopWindws(options,"alert");	
	}

	$.showConfirm = function(options){ 
		showPopWindws(options,"confirm");
	}

	$.openDialog= function(options){ 
		showPopWindws(options,"dialog");
	}

	$.showTip= function(options){ 
		showPopWindws(options,"tip");
	}

	$.showLoading= function(options){ 
		showPopWindws(options,"loading");
	}

	//关掉指定窗口(不传参则为关闭所有弹窗）
	$.closePopWin= function(key){ 
		if(key && key!=""){
			$(".tui_popWinBox[key='"+key+"']").remove();
		}
		else{
			$(".tui_popWinBox").remove();
		}
	}

	//关掉最上面一个窗口
	$.closePopTopWin= function(target){ 
		var popwin = $(".tui_popWinBox").eq($(".tui_popWinBox").length-1);
		popwin.remove();
	}

	var showPopWindws=function(options,flag){
		myData={
			title: "提示", // 添加标题显示内容
			content:"",
			width:400,
			height:200,
			effect:"scale",
			speed:0.2,
			mode:true,
			sureLabel:"确定",
			cancelLabel:"取消",
			showClose:true,
			autoClose:1500,
			//2017/07
			className: "loading",
			key:""
		}
		if(typeof(options) == "string"){options={content:options}}

		myData = $.extend(myData,options); 
		type = flag;

		//建立容器
		var box = $("<div class='tui_popWinBox' key='"+myData.key+"'></div>");
		$("body").append(box);

		//建立Mask
		var mask;
		if(myData.mode){
			mask=$("<div class='tui_winMask'></div>");
			box.append(mask);
		}
		var myPopBox;
		switch(flag)
		{
			case "alert":
				myPopBox= $("<div class='tui_popWin alert'><div class='title'></div><div><div class='dialogBtn closeBtn'></div></div><div class='content'></div><div class='btnbox'><a href='javascript:void(0);' class='dialogBtn sureBtn'>"+myData.sureLabel+"</a></div></div>");
				break;
			case "confirm":
				myPopBox= $("<div class='tui_popWin confirm'><div class='title'></div><div><div class='dialogBtn closeBtn'></div></div><div class='content'></div><div class='btnbox'><a href='javascript:void(0);' class='dialogBtn sureBtn'>"+myData.sureLabel+"</a><a href='javascript:void(0);' class='dialogBtn cancelBtn'>"+myData.cancelLabel+"</a></div></div>");
				break;
			case "dialog":
				myPopBox= $("<div class='tui_popWin dialog'><div class='title'></div><div><div class='dialogBtn closeBtn'></div></div><div class='content'></div></div>");
				break;
				//---------2017/07
			case "tip":
				myPopBox= $("<div class='tui_popWin tip'><div class='content'></div></div>");
				//-----------------------2017/07---------------------
				//tip
				if(myData.autoClose){
				
					if(typeof myData.autoClose=="number"){
						setTimeout(function(){
							myPopBox.parent().fadeOut(500,function(){
								myPopBox.parent().remove();
							});
							if(myData.sure){
								myData.sure(myData.data);
							}
				
						},myData.autoClose);
					}
				}
				break;
			case "loading":
				if(myData.content==""){
					myData.content="正在载入数据，请稍候";
				}
				myPopBox= $("<div class='tui_popWin loading'><div class='content'></div><div class='loading'></div></div>");
				break;
		}
		box.append(myPopBox);
		
		//---------2017/07----------------------
		$(".tui_popWin.tip").prev(".tui_winMask").css("background","none");
		

		if(myData.content)
			myPopBox.find(".content").html(myData.content);
			
		//--------------2017/07-----------------------
		if(myData.className){
			myPopBox.find(".loading").attr("class",myData.className);
			
		}

		myPopBox.find(".title").text(myData.title);
		myPopBox.find(".dialogBtn").bind('click',function(e)
		{ 
			$(this).parent().parent().parent().remove();
		});

		
		//显示隐藏关闭按钮
		if(myData.showClose){
			myPopBox.find(".closeBtn").show();
			addCloseEvent(myPopBox.find(".closeBtn"),myData);
		}
		else{
			myPopBox.find(".closeBtn").hide();
		}
		

		switch(flag)
		{
			case "alert":
				addSureEvent(myPopBox.find(".sureBtn"),myData);
				break;
			case "confirm":
				addSureEvent(myPopBox.find(".sureBtn"),myData);
				addCancelEvent(myPopBox.find(".cancelBtn"),myData)
				break;
		}
		$.resizeWin(myPopBox);

		//弹出效果
		var from=""
		var fre_webkit="-webkit-";
		var fre_moz="-moz-";
		var fre_ms="-ms-";
		switch(myData.effect){
			case "scale"://放大
				from = "transform:scale(0.9)";
				to="transform:scale:(1)";
				break;
			case "fadein"://淡入
				fre_webkit="";
				fre_moz="";
				fre_ms="";
				from = "opacity:0;";
				to="opacity:1";
				break;
			case "fadeinB"://淡入向下
				from = "transform:translateY(-100px);opacity:0;";
				to="transform:translateY(0);opacity:1;";
				break;
		}
		$("#popWinEffect").remove();
		var css="@-webkit-keyframes effectName{0%{"+fre_webkit+from+"} 100%{"+fre_webkit+to+"}}";
		css+="@-moz-keyframes effectName{0%{"+fre_moz+from+"} 100%{"+fre_moz+to+"}}";
		css+="@-ms-keyframes effectName{0%{"+fre_ms+from+"} 100%{"+fre_ms+to+"}}";
		css+="@keyframes effectName{0%{"+from+"} 100%{"+to+"}}";
		css+=".effectClass{-webkit-animation: effectName "+myData.speed+"s  ease-in-out; animation: effectName "+myData.speed+"s  ease-in-out; -moz-animation:effectName "+myData.speed+"s  ease-in-out; -ms-animation:effectName "+myData.speed+"s  ease-in-out}";
		$('head').append("<style id='popWinEffect'>"+css+"</style>");
		myPopBox.addClass("effectClass"); 

		if(flag='dialog'){
			var boxCotent = myPopBox.find(".content");
			setTimeout(function (){if(myData.url)
				boxCotent.append($("<iframe  width='100%' height='100%' frameBorder=0  allowTransparency='false' src='"+myData.url+"'></iframe>"));}, myData.speed*1000);
		}
		return this;	
	}

	function resizePercentWin(wid,hei,myPopBox){
		var boxCotent = myPopBox.find(".content");
		var title=myPopBox.find(".title");
		wid = wid.toString();
		hei = hei.toString();
		var index = wid.indexOf("%");
		if(index!=-1){
			wid = wid.substring(0,index);
			wid = document.documentElement.clientWidth*Number(wid)*0.01;
		}
		index = hei.indexOf("%");
		if(index!=-1){
			hei = hei.substring(0,index);
			hei = document.documentElement.clientHeight*Number(hei)*0.01;
		}
		myPopBox.css({"width":wid});
		boxCotent.css({"height":hei-title.height()});
	}

	function addSureEvent(btn,myData){
		btn.bind('click',function(e){
			if(myData.sure)
				myData.sure(myData.data)
		});
	}

	function addCancelEvent(btn,myData){
		btn.bind('click',function(e){
			if(myData.cancel)
				myData.cancel(myData.data);
		});
	}

	function addCloseEvent(btn,myData){
		btn.bind('click',function(e){
			if(myData.close)
				myData.close(myData.data);
		});
	}

	$.resizeWin = function(options){ 
		var myPopBox = options;
		if(type=="dialog")
			resizePercentWin(myData.width,myData.height,myPopBox);
		myPopBox.css("left",(document.documentElement.clientWidth-myPopBox.width())/2);
		myPopBox.css("top",(document.documentElement.clientHeight-myPopBox.height())/2);
	
	}
})(jQuery); 


$(function() {
	var fn= window.onresize;
	window.onresize = function() {
		if(fn)
			fn();
		$.resizeWin($(".tui_popWin"));
	}
});

