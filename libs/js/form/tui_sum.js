/*!
 * 计数器
 *
 */

;
(function($){ 
	$.fn.sumRender = function(options){ 
		var defaults = {
			min:1,
			max:999999,
			value:1
		}
		var myData = $.extend(defaults,options); 
		return new SumRender(this,myData);
	}

	var SumRender=function(thismc,options){
		var input = thismc.find("input");
		input.val(options.value);
		var num = options.value;
		this.value = num;
		var currThis =this;
		thismc.find(".tui_sum_reduce").click(function(){ 
			num=input.val();
			num--;
			if(num<options.min)
				num=options.min;
			else{
				currThis.value = num;
				input.val(num);
				if(options.change){
					options.change(thismc);
				}
			}
		});
		thismc.find(".tui_sum_increase").click(function(){ 
			num=input.val();
			num++;
			if(num>options.max)
				num=options.max;
			else{
				currThis.value = num;
				input.val(num);
				if(options.change){
					options.change(thismc);
				}
			}
		});

		input.keyup(function(){
			var rule = /^[0-9]*$/;
			var currNum = $(this).val();
			if(rule.test(currNum)){
				if(currNum<options.min || currNum>options.max)
				{
					input.val(currThis.value);
				}
			}
			else{
				input.val(currThis.value);
			}	
		});
			
	}
})(jQuery); 