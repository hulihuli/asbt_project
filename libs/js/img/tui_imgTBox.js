(function($){ 
	$.fn.imgTBoxRender = function(){ 
		var defaults = {
			img_title:"",
			img_content:"",
			type:"1",
		}
		var options={}
		options.img_title = this.attr('img_title');
		options.img_content = this.attr('img_content');
		options.type = this.attr('type');
		options.width = this.attr('box_width');
		options.height = this.attr('box_height');

		var myData = $.extend(defaults,options); 
		this.addClass('imgcaption');
		this.append('<img src="'+this.attr('img_url')+'"/><div class="boxcaption"><div class="boxcaption_title"></div><div class="boxcaption_con"></div></div>');
		this.find('.boxcaption_title').html(myData.img_title);
		this.find('.boxcaption_con').html(myData.img_content);

		var $boxcaption = this.find('.boxcaption');
		var $contentbox = this.find('.boxcaption_con');
		if(myData.width)
			this.css("width",myData.width);
		if(myData.height)
			this.css("height",myData.height);

		var tipHei = $boxcaption.outerHeight();
		var initBottom;
		switch(myData.type)
		{
			case "1":
			case "3":
				initBottom = "-"+tipHei+"px";
				$boxcaption.css("bottom",initBottom);
				break;
			case "2":
				initBottom = "-"+$contentbox.outerHeight()+"px";
				$boxcaption.css("bottom",initBottom);
				break;
		}

		this.hover(function(){
			switch(myData.type)
			{
				case "3":
					$boxcaption.stop().animate({bottom:"-"+$contentbox.outerHeight()+"px"},{queue:false,duration:160});
					break;
				default:
					$boxcaption.stop().animate({bottom:'0px'},{queue:false,duration:160});
					break;
			}
		},function(){
			$boxcaption.stop().animate({bottom:initBottom},{queue:false,duration:160});
		})
	}
})(jQuery); 