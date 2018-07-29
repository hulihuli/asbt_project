$(function() {

	//---------render----------------
	$("div,input,textarea,button,select,form,table,a,img,span").each(function() {
		$(this).render();
	});
	//---------render-over---------------
	
	
	//----------------select模拟----------------
	$(".model-select-option").find("li").each(function(){
		if($(this).hasClass('selected')) {
			$(this).addClass('data-selected');
			$(this).parent().siblings('.model-select-text').text($(this).text());
			$(this).parent().siblings('.model-select-text').attr('data-value',$(this).attr('data-option'));
		}
	})
	/*
	 * 模拟网页中所有的下拉列表select
	 */
	function selectModel() {
		var $box = $('div.model-select-box');
		var $option = $('ul.model-select-option', $box);
		var $txt = $('div.model-select-text', $box);
		var speed = 100;
		/*
		 * 单击某个下拉列表时，显示当前下拉列表的下拉列表框
		 * 并隐藏页面中其他下拉列表
		 */
		$(".model-select-box").on("click",".model-select-text",function(e) {
			$option.not($(this).siblings('ul.model-select-option')).slideUp(speed, function() {
				int($(this));
			});
			$txt.not($(this)).removeClass("select_drop");
			$(this).addClass("select_drop");
			$(this).siblings('ul.model-select-option').slideToggle(speed, function() {
				int($(this));
			});
			return false;
		});
		//点击选择，关闭其他下拉
		/*
		 * 为每个下拉列表框中的选项设置默认选中标识 data-selected
		 * 点击下拉列表框中的选项时，将选项的 data-option 属性的属性值赋给下拉列表的 data-value 属性，并改变默认选中标识 data-selected
		 * 为选项添加 mouseover 事件
		 */
			
		$(".model-select-box").on("click",".model-select-option li",function(){
			$(this).parent().siblings('div.model-select-text')
				.attr('data-value', $(this).attr('data-option'))
				.text($(this).text())
				.removeClass("select_drop");
			$(this).parent().slideUp(speed, function() {
				int($(this));
			});
			$(this).addClass('selected data-selected').siblings('li').removeClass('selected data-selected');
			return false;
		});
		
		$(".model-select-box").on("mouseover",".model-select-option li",function(){
			$(this).addClass('selected').siblings('li').removeClass('selected');
		});
		
		//点击文档，隐藏所有下拉
		$(document).click(function(e) {
			$option.slideUp(speed, function() {
				int($(this));
			});
		});
		//初始化默认选择
		function int(obj) {
			obj.find('li.data-selected').addClass('selected').siblings('li').removeClass('selected');
		}
	}

	selectModel();
	//----------------select模拟结束----------------
});




//---------插件开始---------------
(function($){ 
	$.fn.render = function(){ 
		if ($(this).hasClass("tui_layout")){
			$(this).layoutRender();
			return;
		}
		if ($(this).hasClass("tui_panel")){
			$(this).panelRender();
			return;
		}
		if ($(this).hasClass("tui_uploader")){
			$(this).uploaderRender();
			return;
		}
		if ($(this).hasClass("tuialert")){
			$(this).find(".icon_remove").bind('click',function(e)
			{ 
				$(this).parent().remove();
			});
			return;
		}
		if($(this).hasClass("tui_backtop")){
			var thismc = $(this);
			testPosition();
			$(window).scroll(function(){ 
				testPosition();
			});  
			$(this).click(function(){ 
				$('html,body').animate({scrollTop:0},500); 
			});
			function testPosition(){
				var s = $(window).scrollTop(); //获取窗口的滚动条的垂直位置 
				//当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐 
				if( s > 0){ 
					thismc.fadeIn(100); 
				}else{ 
					thismc.fadeOut(200); 
				}; 
			}
			return;
		}
		if ($(this).hasClass("tui_tip")){
			try {
				$(this).tooltip()
			} catch(b) {
				alert("提示插件出错，注意脚本的引入：tui_tooltip.js")
			}
			return;
		}
		if ($(this).hasClass("tui_floatPanel")){
			try {
				$(this).floatPanelRender()
			} catch(b) {
				alert("浮动面板出错，注意脚本的引入：floatPanel.js")
			}
			return;
		}

		if ($(this).hasClass("tui_suggestion")){
			try {
				$(this).suggestionRender()
			} catch(b) {
				alert("下拉框出错，注意脚本的引入：tui_suggestion.js")
			}
			return;
		}
		
		if ($(this).hasClass("tui_search")){
			try {
				$(this).searchRender()
			} catch(b) {
				alert("搜索框出错，注意脚本的引入：tui_search.js")
			}
			return;
		}
		if ($(this).hasClass("tui_lister")){
			try {
				$(this).listerRender()
			} catch(b) {
				alert("双向选择器出错，注意脚本的引入：tui_lister.js")
			}
			return;
		}
		if ($(this).hasClass("tui_imgTBox")){
			try {
				$(this).imgTBoxRender()
			} catch(b) {
				alert("图片标题容器出错，注意脚本的引入：tui_TBox.js")
			}
			return;
		}
		if($(this).hasClass("tui_scorllBox")){
			try {
				$(this).scrollBoxRender()
			} catch(b) {
				alert("滚动条出错，注意脚本的引入：tui_scroll.js")
			}
			return;
		}
		//if($(this).attr("placeholder")!= null) {
			//funPlaceholder($(this)[0]);
		//}

	};

	$.fn.panelRender = function(){ 
		var panelTool = $(this).children("panelTool"); 
		panelTool.remove();
		var content = $(this).html();
		$(this).empty();
		$(this).append($("<div class='panel_top'><div class='panel_title'></div><div class='panel_status'></div>"));
		$(this).append($("<div class='panel_middle'></div>"));
		var panel = $(this);

		//size
		if ($(this).attr("panelWidth") != null) 
			$(this).css({"width":$(this).attr("panelWidth")});
		if ($(this).attr("panelHeight") != null){
			var middleHeight = $(this).attr("panelHeight") - $(this).children(".panel_top").outerHeight() - $(this).children(".panel_middle").outerHeight();
			$(this).children(".panel_middle").css({"height":middleHeight});
		}
					
		//fill
		$(this).children(".panel_middle").append(content);
		if ($(this).attr("panelTitle") != null) 
			$(this).find(".panel_title").html($(this).attr("panelTitle"));
		if (panelTool.length>0){
			$(this).find(".panel_status").append(panelTool.children())
		}

		
		$(this).find(".panel_status a").each(function() { 
			 //effect hide and show 
			 if($(this).attr("openname")!= null && $(this).attr("closename")!= null){
				$(this).bind('click',function(e){ 
					var target = panel.find(".panel_middle");
					if(target.css("display")=="none"){
						$(this).text($(this).attr("closename"));
					}
					else{
						$(this).text($(this).attr("openname"));
					}
					//if(panel.next().hasClass("panel_interval"))
					//{
						//if(target.css("display")=="none")
						//	panel.next().css("height","");
					//else
						//panel.next().css("height","5px");
					//}
					target.slideToggle(500);
				})
			}

			if($(this).attr("icon")!= null){ 
				$(this).prepend('<i class="'+$(this).attr("icon")+'"></i>')
			}
		});
	};

	$.fn.uploaderRender = function(){
		var labelName="浏览文件";
		if((this).attr("lable")!=null){
			labelName = (this).attr("lable");
		}
		if($(this).find("input").length==0){
			var c1=$('<input type="text" class=" input_text  radius filename" readonly/><input type="button" name="file" class="btn btn_primary radius" value="'+labelName+'"/><input type="file" size="30"/>');
			$(this).append(c1)
			$(this).addClass("uploader");
			$(this).find("input[type=file]").change(function(){$(this).parents(".uploader").find(".filename").val($(this).val());});
			$(this).find("input[type=file]").each(function(){
				if($(this).val()==""){$(this).parents(".uploader").find(".filename").val("请选择文件...");}
			});
			if((this).attr("filename")!=null){
				$(this).find("input[type=file]").attr("name",(this).attr("filename"))
			}
			if((this).attr("width")!=null){
				$(this).find(".filename").width((this).attr("width"))
			}
		}
	};

	$.fn.layoutRender = function(){
		var thismc = $(this);
		var layoutBox = $(this).find(".layout_box");

		var spliter;//分隔条
		var totalWid=0;//总宽度
		var wid;//定宽宽度
		var spliterIndex=0;//分隔条位置  0最边上 1中间
		var type=0;//0第二，三列定宽,1第一二列定宽

		//二列布局
		if(layoutBox.length==2)
		{
			layoutBox.each(function(index) { 
				if($(this).attr("wid"))
					wid = $(this).attr("wid");
			})
			layoutBox.each(function(index) { 
				if(index==0){
					if($(this).attr("wid")!= null){
						$(this).css({"position":"relative","float":"left","width":wid+"px","margin-right":"-"+wid+"px","overflow":"hidden"});//左侧定宽
					}
					else{
						$(this).css({"float":"left","width":"100%"});//左侧自适应
						$(this).find(".layout_box_content").css({"margin-right":wid+"px"});
					}
				}
				else{
					if($(this).attr("wid")!= null){
						$(this).css({"position":"relative","float":"right","width":wid+"px","margin-left":"-"+wid+"px","overflow":"hidden"});//右侧定宽
					}
					else{
						$(this).css({"float":"right","width":"100%"});//右侧自适应
						$(this).find(".layout_box_content").css({"margin-left":wid+"px"});
					}
				}
				//如果带分隔条
				if($(this).attr("spliter")!= null){spliter=$(this);};
			});
		}

		//三列布局
		if(layoutBox.length==3){
			layoutBox.each(function(index) { 
				if($(this).attr("wid")){
					totalWid+= parseInt($(this).attr("wid"));
					if(index==0){type=1;}//如果第一列定宽
				}
			})
			layoutBox.each(function(index) { 
				if(type==0){
					//第二，三列定宽
					switch(index){
						case 0:
							$(this).css({"float":"left","width":"100%","margin-right":"-"+totalWid+"px"});//第一列自适应
							$(this).find(".layout_box_content").css({"margin-right":totalWid+"px"});
							break;
						case 1:
						case 2:
							$(this).css({"position":"relative","float":"right","width":+$(this).attr("wid")+"px","overflow":"hidden"});//第二列,第三列定宽
							break;
					}
				}
				else
				{
					//第一二列定宽
					switch(index){
						case 0:
						case 1:
							$(this).css({"position":"relative","float":"left","width":+$(this).attr("wid")+"px","overflow":"hidden"});//第一列,第二列定宽
							break;
						case 2:
							$(this).css({"float":"right","width":"100%","margin-left":"-"+totalWid+"px"});//第三列自适应
							$(this).find(".layout_box_content").css({"margin-left":totalWid+"px"});
							break;
					}
				}
				//如果带分隔条
				if($(this).attr("spliter")!= null){spliter=$(this);spliterIndex=index;wid = $(this).attr("wid");};
			});
		}
		//如果带分隔条
		if(spliter){
				if(totalWid==0)
						totalWid=wid;
				var className = spliter.attr("spliter");
				thismc.append('<div class="'+className+'"></div>');
				thismc.find("."+className).layoutSpliter({"elem":spliter,"width":wid,"totalWid":totalWid,"open":spliter.attr("hide"),"index":spliterIndex,"type":type});
		}
	};

})(jQuery); 
//---------插件over--------------

//placeholderIE10以下解决方案
var funPlaceholder = function(element) {
	if($(element).attr("type")=="password"){
		return;
	}
    var placeholder = '';
    if (element && !("placeholder" in document.createElement("input")) && (placeholder = element.getAttribute("placeholder"))) {
        element.onfocus = function() {
            if (this.value === placeholder) {
                this.value = "";
            }
            this.style.color = '';
        };
        element.onblur = function() {
            if (this.value === "") {
                this.value = placeholder;
                this.style.color = 'graytext';    
            }
        };
        
        //样式初始化
        if (element.value === "") {
            element.value = placeholder;
            element.style.color = 'graytext';    
        }
    }
};

//iframe高度自适应
function iframeChangeSize(iframe, extHeight) {
	if(extHeight==null){
		extHeight = 0;
	}
	var pTar = null; 
	if (document.getElementById){ 
		pTar = document.getElementById(iframe); 
	} 
	else{ 
		eval('pTar = ' + iframe + ';'); 
	} 
	if (pTar && !window.opera){ 
		pTar.style.display="block" ;
		if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){ 
			//ns6 syntax 
			pTar.height = pTar.contentDocument.body.offsetHeight + 20 + extHeight; 
		} 
		else if (pTar.Document && pTar.Document.body.scrollHeight){ 
			//ie5+ syntax 
			pTar.height = pTar.Document.body.scrollHeight +extHeight; 
		}
	}   
}