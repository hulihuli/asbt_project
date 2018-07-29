
/*
 * jQuery suggestion Plugins
 * author:siwei
 * date: 2015/8/3
 * 
 */
(function($){ 
	$.fn.suggestionRender = function(options){ 

		if ($(this).find(".suggestion_c").length==0){
			var c1 = $('<input class="suggestion_input input_text"></input><div class="suggestion_c"></div>');
			$(this).append(c1);

			var inputWidth=182;
			var inputHeight=28;
			if($(this).attr("inputWidth")!="" && $(this).attr("inputWidth")!= null){
				inputWidth = $(this).attr("inputWidth");
				$(this).find(".suggestion_input").css("width",inputWidth);
			}
			if($(this).attr("inputHeight")!="" && $(this).attr("inputHeight")!= null){
				inputHeight = $(this).attr("inputHeight");
				$(this).find(".suggestion_input").css("height",inputHeight);
				$(this).find(".suggestion_c").css("top",inputHeight+"px");
			}
			if ($(this).attr("showMultiList") == "true") 
			{
				var c2 = $('<div class="suggestion_c_head">请选择</div><div class="suggestion_c_container"><ul></ul></div>');
				$(this).find(".suggestion_c").append(c2);
				$(this).find(".suggestion_c").css("width",$(this).attr("multiListWidth"));
			}
			else
			{
				var c2 = $('<div class="suggestion_c_head">请选择</div><div class="suggestion_c_container"></div>');
				$(this).find(".suggestion_c").append(c2);
				$(this).find(".suggestion_c").css("width",inputWidth-2)	

			}
			$(this).find(".suggestion_c").css("display","none")
		}

		var thismc =$(this);
		if(options)
		{
			fillData();
		}
		else
		{
			if($(this).attr("data")!="" && $(this).attr("data")!= null){
				options = eval("("+$(this).attr("data")+")");
				fillData();
				return;
			}
			if($(this).attr("url")!="" && $(this).attr("url")!= null){
				$.ajax({
					 url: $(this).attr("url"),
					 dataType: "json",
					 success: function(data){
						 options = data;
						 fillData();
					 }
				 });
				 return;
			}
		}
		
	
		//fill 填充数据
		function fillData(){
			var rownum=10;
			var container = thismc.find(".suggestion_c_container");
			var myData={
				list:null
			}
			myData = $.extend(myData,options); 
			var isAMouseOver = false;
			
			showSuggestion();//显示下拉菜单
			initEvent();//设置事件
			//设置初始值
			if (thismc.attr("selectedValue")!="" && thismc.attr("selectedValue")!= null){
				for(var i=0;i <myData.list.length; i++){
					if(myData.list[i].value==thismc.attr("selectedValue"))
					{
						//thismc.find(".suggestion_input").val(myData.list[i].key);
						fillInputValue(myData.list[i].key,myData.list[i].value);
					}
				}		
			}
			//-------初始化结束----------
			
			//设置初始事件
			function initEvent()
			{
				if(myData.list){
					thismc.find('.suggestion_input').click(function(){
						thismc.find(".suggestion_c").css("display","block");
						showSuggestion();
					});
					thismc.find('.suggestion_input').bind('input propertychange',function(e)
					{
						if($(this).val()==""){
							changePage(1);
						}
						else{
							findItem($(this).val())
						}
					});
					if (thismc.attr("showCheckbox") == "true"){
						thismc.delegate(".suggestion_c_container .myitem","mouseover",function(){ 
							isAMouseOver = true;
						});
						thismc.delegate(".suggestion_c_container .myitem","mouseout",function(){ 
							isAMouseOver = false;
						});
						thismc.delegate(".suggestion_c_container .myitem","blur",function(){ 
							if(!isAMouseOver){
								setTimeout(function (){thismc.find(".suggestion_c").hide()}, 200);
							}
						});
					}
					thismc.find('.suggestion_input').blur(function(){
						if(!isAMouseOver){
							setTimeout(function (){thismc.find(".suggestion_c").hide()}, 200);
						};
					});
				}
			}
			
			//显示下拉菜单
			function showSuggestion(){
				if (thismc.attr("showMultiList") == "true"){
					container = container.find("ul");
					fillItem(myData.list);	
				}
				else{
					showPages();
				}
			}


			//显示分页信息
			function showPages(){
				if(thismc.find(".page_break").length>0){
					thismc.find(".page_break").css("display","block");
				}
				else{
					if(myData.list && myData.list.length>rownum){
						var pagebox = '<div class="page_break">';
						var row = Math.ceil(myData.list.length/10);
						for(var i=0; i<row; i++){
							pagebox+=('<a href="javascript:void(0)" inum="'+(i+1)+'">'+(i+1)+'</a>')
						}
						pagebox+=('</div>')
						thismc.find(".suggestion_c").append(pagebox);
						thismc.find(".page_break a").bind('click', function(){
							changePage($(this).attr("inum"));
							thismc.find('.suggestion_input').focus();
						})
						thismc.find(".page_break a").bind('mouseover', function(){
							isAMouseOver = true;
						})
						thismc.find(".page_break a").bind('mouseout', function(){
							isAMouseOver = false;
						})
					}//endif
				}//endif
				changePage(1);
			}

			function hidePage(){
				if(thismc.find(".page_break").length>0)
					thismc.find(".page_break").css("display","none")
			}

			function changePage(page){
				var beforeCurrPage = thismc.find(".page_break .current");
				beforeCurrPage.removeClass("current")
				var currLink = thismc.find('a[inum="'+page+'"]');
				currLink.addClass("current");

				var beginIndex = (page-1)*rownum;
				var endIndex = beginIndex+rownum;
				if(endIndex>myData.list.length)
					endIndex=myData.list.length;
				var tempArr=[];
				for(var i=beginIndex; i<endIndex; i++){
					tempArr.push(myData.list[i]);
				}
				fillItem(tempArr);
			}


			function findItem(targetKey){	
				var myList=[];
				for(var i=0;i <myData.list.length; i++){
					var suggest = myData.list[i].suggest;
					if(suggest.indexOf(targetKey)!=-1)
					{
						myList.push(myData.list[i]);
					}
				}
				fillItem(myList);
				hidePage();
			}

			function fillItem(myList){
				container.empty();
				var str=thismc.attr("relText");
				if(!str)
					str="";
				var listData = str.split(",");
				for(var i=0;i <myList.length; i++){
					if (thismc.attr("showMultiList") == "true") {
						container.append('<li class="myitem"><a href="javascript:void(0)" class="myvalue" value="'+myList[i].value+'">'+myList[i].key+'</a></li>');
					}
					else{
						if(thismc.attr("showCheckbox")=="true"){
							var flag="";
							for(j=0; j<listData.length; j++)
							{
								if(listData[j]==myList[i].key){
									flag='checked="checked"';
									break;
								}
							}
							container.append('<label class="myitem item hand"><input class="myvalue" type="checkbox" '+flag+' value="'+myList[i].value+'" type="checkbox">'+myList[i].key+'</lable>');
						}
						else{
							container.append('<a class="myitem item" href="javascript:void(0)"><span class="myvalue" value="'+myList[i].value+'">'+myList[i].key+'</span></a>');
						}
					}
				}
				if(thismc.attr("showCheckbox")=="true"){
					container.find(".myvalue").change(function(){
						fillInputValue($(this).parent().text(),$(this).attr("value"));
						$(this).trigger("listSelect",[{key:$(this).parent().text(),value:$(this).attr("value")}]);
					});
				}
				else{
					container.find(".myitem").click(function(e){	
						var myvalue = $(this).find(".myvalue");
						fillInputValue(myvalue.text(),myvalue.attr("value"));
						$(this).trigger("listSelect",[{key:myvalue.text(),value:myvalue.attr("value")}]);
					})
				}
			}

			function fillInputValue(text,value){
				if(thismc.attr("showCheckbox")=="true"){
					var str = thismc.attr("relText");
					var values = thismc.attr("relValue");
					if(!str)
						str="";
					if(!values)
						values="";
					var listData = str.split(",");
					var valueData = values.split(",");
					var findit = false;
					for(i=0; i<listData.length; i++)
					{
						if(listData[i]==text){
							listData.splice(i,1);
							valueData.splice(i,1);
							findit = true;
							break;
						}
					}
					if(str==""){
						listData=[];
						valueData=[];
					}
					if(!findit){
						listData.push(text)
						valueData.push(value);
					}
					str = listData.join(",");
					values= valueData.join(",");

					thismc.find(".suggestion_input").val(str);
					thismc.attr("relText",str);
					thismc.attr("relValue",values);
				}
				else{
					thismc.find(".suggestion_input").val(text);
					thismc.attr("relText",text);
					thismc.attr("relValue",value);
				}
			}

		}
		//fill 填充数据 end

	}
})(jQuery); 