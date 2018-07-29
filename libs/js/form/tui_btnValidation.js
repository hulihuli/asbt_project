/**
 *发送验证码倒计时插件
 *siwei 2015-11-05
 */
(function($){ 
	$.fn.btnValidation = function(options){ 
		var defaults = {
			time:60,
			txt:"重新获取验证码(n)"
		}
		var myData = $.extend(defaults,options); 
		return new Validform(this,myData);
	}

	var Validform=function(btn,options){
		this.enable = true;
		this.btn = btn;
		this.options = options;
		
		Validform.prototype.start = function(){
			if(!this.enable)
				return;

			var btn = this.btn;
			var initTxt = btn.val();
			var time=this.options.time;
			var txt = this.options.txt.replace(/n/, time)
			$(btn).val(txt);
			var intervalID;
			
			this.enable = false;
			$(btn).addClass("disabled");

			var thismc = this;
			intervalID = setInterval(function (){
				time--;
				txt = thismc.options.txt.replace(/n/, time)
				btn.val(txt);
				if(time==0)
				{
					clearInterval(intervalID);
					btn.val(initTxt);
					thismc.enable = true;
					btn.removeClass("disabled")
				}
			}, 1000);
			
		}; 
	}
})(jQuery); 