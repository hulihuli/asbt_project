
/*
 * jQuery fileUpload Plugins
 * author:siwei
 * date: 2015/8/3
 * 
 */
(function($){ 
	this.addUploadListRead = function(options) {
		var myData={
			fileNameWidth:300
		}
		options = $.extend(myData,options); 
		this.target = $("#"+options.fileListContainer);
		 $.ajax({
             url: options.listUrl,
             dataType: "json",
             success: function(data){
				 updateList(data.attachmentList,options);
             }
         });
	};

	function updateList(dataList,options){
		$.fileUpload.target.empty();
		for(var i=0; i<dataList.length; i++){
			var obj= dataList[i];
			var c1=$('<div class="upload_list"></div>');
			var c2=$('<div class="upload_icon"></div><div class="upload_name"><span>'+obj.uploadFileName+'</span></div>');
	
			c1.append(c2);
			if(options.downloadUrl)
				c1.append('<div class="upload_itembtn"><a href="'+options.downloadUrl+obj.id+'">下载</a></div>');
			if(options.deleteUrl)
				c1.append('<div class="upload_itembtn upload_delete" id="'+obj.id+'"><a>删除</a></div>'); 
			c1.append('<div class="clear"></div>')
			$.fileUpload.target.append(c1);
		}
		$.fileUpload.target.find(".upload_name").css("width",options.fileNameWidth);
		addRemoveEvent(options);
	}

	function addRemoveEvent(options){
		if(options.deleteUrl){
			$.fileUpload.target.find(".upload_delete").bind('click',function(e)
			{ 
				 $.ajax({
					 url: options.deleteUrl+$(this).attr("id"),
					 dataType: "json",
					 success: function(data){
						 updateList(data.attachmentList,options);
					 }
				 }); 
			});
		}
	}
	$.fileUpload = this;
})(jQuery); 
