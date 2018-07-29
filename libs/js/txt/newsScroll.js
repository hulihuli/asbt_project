/*
 * author:huli
 * date:2017/7
 * 
 */
(function($){
	$.fn.newsScroll = function(options){ 
		var defaults = {
			spacetime:1000,
			hoverstop:true
		}
		var myData = $.extend({},defaults,options); 
		
		var $this=$(this);
		var height=$this.find("li").height();
		function autoScroll(){
			$this.find("ul").animate({"marginTop":-height},500,function(){
				$this.find("ul").css({marginTop:"0px"}).find("li:first").appendTo(this);
			})
		}
		
		var timer=null;
		
		timer=setInterval(autoScroll,myData.spacetime);
		
		//鼠标经过停止
		if(myData.hoverstop){
			$this.hover(function(){
				clearInterval(timer);
			},function(){
				timer=setInterval(autoScroll,myData.spacetime);
			})
		}
	}
	
})(jQuery);
	
	
	

