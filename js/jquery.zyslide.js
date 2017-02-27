
// 自运行的匿名函数
/*
(function(){
	alert('自运行匿名函数');
})()

$(function(){
	alert('自运行匿名函数');
});
*/
(function($){
	// 本函数每次调用只负责一个轮播图的功能
	// 也就说只会产生一个轮播图，这个函数的作用域只能分配一个轮播图
	// 所以要求在调用本函数的时候务必把当前轮播图的跟标签传递过来。
	// 这里的形参 ele 就是某个轮播的跟标签
	   function Slide(ele,options){
		// 转化为 jquery 标签对象
		 this.$ele = $(ele);
		// 默认设置选项
		this.setting = {
			// 控制刚开炸开的时间
			delay: 1000,
			// 控制 interval 的时间（轮播速度）
			speed: 2000
		};
		// 对象合并
		$.extend(true, this.setting, options);
		// 规定好每张图片处于的位置和状态
		this.states = [
						{ZIndex: 1,width: 120,height: 150,top: 69,left: 134,ZOpacity: 0.2},
						{ZIndex: 2,width: 130,height: 170,top: 59,left: 0,ZOpacity: 0.5},
						{ZIndex: 3,width: 170,height: 218,top: 35,left: 110,ZOpacity: 0.7},
						{ZIndex: 4,width: 224,height: 288,top: 0,left: 263,ZOpacity: 1},
						{ZIndex: 3,width: 170,height: 218,top: 35,left: 470,ZOpacity: 0.7},
						{ZIndex: 2,width: 130,height: 170,top: 59,left: 620,ZOpacity: 0.5},
						{ZIndex: 1,width: 120,height: 150,top: 69,left: 500,ZOpacity: 0.2}
					 ];
		
		 this.lis = this.$ele.find('li');
		 this.interval = null;
		// 让 li 从正中间展开
		this.move();
		
		//开启自动轮播
			this.autoPlay();
		// 下一张，让轮播图发生偏移
				
		// 点击下一张（section）
		this.$ele.find('.zy-next').click(function(){
			this.next();	
		}.bind(this));
		
		// 点击上一张
		this.$ele.find('.zy-prev').click(function(){
			this.prev();	
		}.bind(this));
		
				
		// 停止轮播
		this.$ele.find('section').add(this.lis).hover(function(){
			clearInterval(this.interval);
		}.bind(this),function(){
			this.autoPlay();
		}.bind(this));
	}
	   //原型
	// 让每个 li 对应上面 states 的每个状态
		Slide.prototype.move = function(){
			this.lis.each(function(index,value){
				//注意这里的this 指向问题
				//两个解决办法:1.定义变量传进去 2.用bind()方法
				var state = this.states[index];
				$(value).css('z-index',state.ZIndex).finish().animate(state,this.setting.delay).find('img').css('opacity',state.ZOpacity);
			}.bind(this));
		}
//让下一张轮播图发生偏移
		Slide.prototype.next = function(){
			// 原理：把数组最后一个元素移到数组的第一位
			this.states.unshift(this.states.pop());
			this.move();
		}
		// 上一张，让轮播图发生偏移
		Slide.prototype.prev = function(){
			// 原理：把数组第一个元素移动最后一位
			this.states.push(this.states.shift());
			this.move();
		}
		// 自动轮播		
		Slide.prototype.autoPlay = function(){
			var _this =this;
			this.interval = setInterval(function(){
				_this.next();
			},this.setting.speed);
		}
		
	// 找到要轮播的轮播图的跟标签，调用 slide 方法
	$.fn.zySlide = function(options){
		$(this).each(function(i,ele){
		new	Slide(ele,options);
		})
		
		// 支持链式调用
		return this;
	}
})(jQuery)

/*
 * 用 jQuery 封装插件的几种写法：
 * 
 * 插件类写法：
 * $.fn.customFun = function(){
 *    // 自定义插件的代码
 * } 
 * 用法：
 * $('selector').customFun();
 * 
 * 工具类写法：
 * $.customFun = function(){
 * 	  // 自定义工具类的代码  
 * }
 * 用法：
 * $.customFun()
 */




