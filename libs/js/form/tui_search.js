
/*
 * jQuery search Plugins
 * author:siwei
 * date: 2015/8/3
 * 
 */
(function($){ 
	$.fn.searchRender = function(options){ 
		if ($(this).find(".search_c").length==0){
			var c1 = $('<input class="search_input input_text"></input><div class="search_c"></div>');
			$(this).append(c1);

			var inputWidth=182;
			var inputHeight=28;
			if($(this).attr("inputWidth")!="" && $(this).attr("inputWidth")!= null){
				inputWidth = $(this).attr("inputWidth");
				$(this).find(".search_input").css("width",inputWidth);
			}
			if($(this).attr("inputHeight")!="" && $(this).attr("inputHeight")!= null){
				inputHeight = $(this).attr("inputHeight");
				$(this).find(".search_input").css("height",inputHeight);
				$(this).find(".search_c").css("top",inputHeight+"px");
			}
			var c2 = $('<div class="search_c_container"></div>');
			$(this).find(".search_c").append(c2);
			$(this).find(".search_c").css("width",inputWidth-2)	
			$(this).find(".search_c").css("display","none");
		}

		var thismc =$(this);
		init();

	

		function init(){
			var container = thismc.find(".search_c_container");
			var isAMouseOver = false;
			
			initEvent();//设置事件
			
			//设置初始事件
			function initEvent()
			{
				thismc.find('.search_input').click(function(){
					findItem($(this).val());
				});

				thismc.find('.search_input').blur(function(){
					if(!isAMouseOver){
						setTimeout(function (){thismc.find(".search_c").hide()}, 200);
					};
				});
				thismc.find('.search_input').bind('input propertychange',function(e)
				{
					findItem($(this).val())
				});

				thismc.find(".search_input").keypress(function(event){
					if(event.keyCode==13 && thismc.attr("search")){  
						var fun = eval(thismc.attr("search"));
						fun($(this).val());
					}  
				});
			}

			function findItem(targetKey){
				targetKey = $.trim(targetKey);
				if(targetKey=="")
				{
					container.empty();
					thismc.find(".search_c").hide();
				}
				else{
					$.ajax({
						url: thismc.attr("url"),
						cache:false,
						dataType: "json",
						data: "param="+encodeURIComponent(targetKey)+"&name="+encodeURIComponent(thismc.attr("name")),
						success: function(data){
							fillItem(data.list);
						}
					});
				}
			}

			function fillItem(myList){
				container.empty();
				if(myList && myList.length>0){
					for(var i=0;i <myList.length; i++){
						container.append('<a class="myitem" href="javascript:void(0)"><span class="myvalue">'+myList[i]+'</span></a>');
					}
					container.find(".myitem").click(function(e){		
						var myvalue = $(this).find(".myvalue");
						fillInputValue(myvalue.text(),myvalue.text());
						$(this).trigger("listSelect",[myvalue.text()]) 
					})
					thismc.find(".search_c").show();
				}
				else{
					thismc.find(".search_c").hide();
				}
			}

			function fillInputValue(text,value){
				thismc.find(".search_input").val(text);
			}

		}
	}
})(jQuery); 