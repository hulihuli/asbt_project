(function($){ 
	var setTimeout_id;
	this.inits = function() {
		var title = this.data.title;
		var content = this.data.content;
		var c1 = $('<div class="popmsg"></div>');
		var c2 = $('<div class="popmsg_header"><div class="popmsg_title">' + title + '</div><div class="popmsg_tool"><a href="#" class="close">关闭</a></div></div>');
		var c3 = $('<div class="popmsg_content">'+content+'</div>');
		var c4 = $('<div class="popmsg_btm_btn"><button type="button" class="button">查看详情</button></div>');
		c1.append(c2).append(c3).append(c4);
		$(document.body).append(c1)
	};

	this.show = function(option) {
		if ($(".popmsg").is("div")) {
			return;
		}
		this.original(option);
		this.inits();
		$(".popmsg").stop(true,true);
		$(".popmsg").slideDown(this.data.anims.speed*1000);
		$(".popmsg_tool .close").click(function() {
			mesclose()
		});
		$(".popmsg_btm_btn .button").click(function() {
			showLink()
		});

		if(this.data.time!=0){
			setTimeout_id = setTimeout(function (){mesclose()}, this.data.time*1000);
		}
	};

	this.mesclose = function() {
		clearInterval(setTimeout_id) 
		$(".popmsg").stop(true,true);
		$(".popmsg").slideUp(this.data.anims.speed*1000, function (){$(".popmsg").remove();});
	};

	this.showLink = function(){
		if(this.data.link.callback)
			this.data.link.callback(this.data.link.data);
	}

	this.original = function(option) {
		this.data={
			title:"信息提示",
			time:0,
			anims:{
				type: "slide",
				speed: 0.6
			},
			link:{
				callback:null,
				data:null
			}
		}
		this.data = $.extend(this.data,option); 
	};
	$.messager = this;
	return $;
})(jQuery); 