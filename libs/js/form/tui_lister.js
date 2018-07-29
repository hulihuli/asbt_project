(function($){ 
	$.fn.listerRender = function(options){ 
		//fill dom
		if ($(this).find(".listerLinksLeft").length==0){
			$(this).addClass("listerLinks")
			var left = $('<div style="width: 200px;" class="listerLinksLeft f_l"><div class="listerLinks_tilte">未选列表</div><ul style="height: 200px;" flag="from" class="lister"></ul></div>');
			var center = $('<div class="listBtn f_l"><input value="全选>>" class="btn btn_primary radius btnall" type="button"><input value="<<还原" class="btn btn_warning radius btnreset" type="button"></div>')
			var right= $('<div style="width: 200px;" class="listerLinksRight f_l"><div class="listerLinks_tilte">已选列表</div> <ul style="height: 200px;" flag="to" class="lister"></ul></div>');
			
			$(this).append(left);
			$(this).append(center);
			$(this).append(right);
		}

		var thismc =$(this);
		if(options){
			fillData();
		}
		else
		{
			if($(this).attr("data")!=""){
				options = eval("("+$(this).attr("data")+")");
				fillData();
			}
			if($(this).attr("url")!=""){
				$.ajax({
					 url: $(this).attr("url"),
					 dataType: "json",
					 success: function(data){
						 options = data;
						 fillData();
					 }
				 });
			}
		}
	
		//fill 填充数据
		function fillData(){
			var myData={
				fromList:[],
				toList:[]
			}
			myData = $.extend(myData,options); 

			var leftul = thismc.find(".listerLinksLeft ul");
			var rightul =thismc.find(".listerLinksRight ul");
			fillItems(leftul,myData.fromList);	
			fillItems(rightul,myData.toList);	
			refreshValue();

			function fillItems(box,list){
				box.empty();
				if(list.length>0){
					for(var i=0; i<list.length; i++){
						var obj = list[i];
						box.append($('<li title='+obj.key+' el='+obj.value+'><div class="left">►</div>'+obj.key+'</li>'));

					}
					box.find("li").bind('click',function(e){ 
						moveItem($(this));
						refreshValue();
					});
				}
			}

			//全选还原 event
			thismc.find(".btnall").bind('click',function(e){
				moveItem(leftul.find("li"));
				refreshValue();
			});
			thismc.find(".btnreset").bind('click',function(e){
				moveItem(rightul.find("li"));
				refreshValue();
			});

			//event
			function moveItem(item){
				var flag = item.parent().attr("flag");
				if(flag=="from"){
					item.find("div").removeClass("left");
					item.find("div").addClass("right");
					rightul.prepend(item);
				}
				else{
					item.find("div").removeClass("right");
					item.find("div").addClass("left");
					leftul.prepend(item);
				}
			}

			//set attr
			function refreshValue(){
				var valueArr=[];
				var textArr=[];
				rightul.find("li").each(function() { 
					valueArr.push($(this).attr("el"));
					textArr.push($(this).attr("title"));
				});
				thismc.attr("relText",textArr.join(","));
				thismc.attr("relValue",valueArr.join(",")); 
			}
		}
	};

	$.fn.data = function(options){ 
		if(options=="selectedNodes")
		{
			var dataArr=[];
			var rightul =$(this).find(".listerLinksRight ul");
			rightul.find("li").each(function(){ 
				dataArr.push({key:$(this).attr("title"),value:$(this).attr("el")});
			});
			return dataArr;
		}
	}
})(jQuery); 
