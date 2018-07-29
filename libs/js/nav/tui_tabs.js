// JavaScript Document

(function($){ 
	$.fn.tuitab = function(options){ 
		return new Tuitab(this,options);

	}
	

	function Tuitab(target,options){
		var defaults = {
			index:0,
			className:"current",
			event:"click",
		}
		var thismc = this;
		
//      2017/07		
//		console.log($(".vertical_tab").width())
//		console.log($(".vertical_tab .tabBar").width())
		$(".vertical_tab .tabCon").outerWidth($(".vertical_tab").width()-$(".vertical_tab .tabBar").outerWidth());
		$(".vertical_tab .tabCon").css("min-height",$(".vertical_tab .tabBar").outerHeight())
		
		this.myData = $.extend(defaults,options);
		this.target = target;

		var $tabBar = $(target).find(this.myData.bar);
		var $tabCon = $(target).find(this.myData.content);

		this.showCurrTab(this.myData.index);

		$tabBar.bind(this.myData.event,function(){
			thismc.showCurrTab($(this).index());
        });

		$tabBar.find(".tui_tab_close").bind("click",function(){
			var currMenu =  $(this).parent();
			var index= currMenu.index();
			//如果删除的是当前选中的
			if(currMenu.hasClass(thismc.myData.className)){
				currMenu.unbind(thismc.myData.event)
				if(index!=0)
					thismc.showCurrTab(index-1);
				else
					thismc.showCurrTab(index+1);
			}

			currMenu.remove();
			$tabCon.eq(index).remove();
			return false;
        });
	}

	Tuitab.prototype.showCurrTab = function(index){
		var $tabBar = $(this.target).find(this.myData.bar);
		var $tabCon = $(this.target).find(this.myData.content);
		$tabBar.removeClass(this.myData.className);
		$tabBar.eq(index).addClass(this.myData.className);
		$tabCon.hide();
		$tabCon.eq(index).show();

	}; 
})(jQuery); 



