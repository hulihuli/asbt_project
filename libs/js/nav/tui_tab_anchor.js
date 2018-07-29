/*
 * author:huli
 * date:2017/7
 * 
 */
(function($) {
	$.fn.tabanchor = function() {

		var t = 0;
		for(var i = 0; i < $(this).find("li.current").index(); i++) {
			var h = $(this).find(".anchor_infos").eq(i).outerHeight(true);
			t = t + h;
		}
		$(this).find(".anchor_con").scrollTop(t);
		
		var $this=$(this);
		
		$this.find(".anchor_bar ul li").each(function() {
			$(this).click(function() {
				var s = 0;
				for(var i = 0; i < $(this).index(); i++) {
					var h = $this.find(".anchor_infos").eq(i).outerHeight(true);
//					console.log(h);
					s = s + h;
				}
				$this.find(".anchor_con").animate({
					scrollTop: s
				}, 100,function(){
//					$this.find(".anchor_con").unbind('scroll');
					return false;
				});
			})
		});
		
		$this.find(".anchor_con").scroll(function() {
			for(var i = 0; i < $this.find(".anchor_infos").length; i++) {

				var a = $(this).position().top;
				var b = $(this).find(".anchor_infos").eq(i).position().top;
				var c = $(this).find(".anchor_infos").eq(i).outerHeight(true);
				//			console.log(a)
				//			console.log(c);
				//			console.log(b)
				//判断当前显示的div的序号
				if(b >= -(c - a) && b <= 0) {
					$this.find(".anchor_bar li").removeClass("current");
					$this.find(".anchor_bar li").eq(i).addClass("current");
				}
			}
		})
	}
})(jQuery);