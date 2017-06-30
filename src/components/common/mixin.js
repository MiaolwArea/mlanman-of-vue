import { getStyle } from '../../assets/config/mUtils'

/*------------directives--------------*/
/**
 * 滚动加载更多
 * @param {Object} el   当前元素（回调）
 * @param {Function} binding   要执行的事件
 */
export const loadMore = {
	directives: {
		'load-more': {
			bind: (el, binding) => {
				let windowHeight = window.screen.height;
				let height;
				let setTop;
				let paddingBottom;
				let marginBottom;
				let requestFram;
				let oldScrollTop;
				let scrollEl;
				let heightEl;
				let scrollType = el.attributes.type && el.attributes.type.value;
				let scrollReduce = 2;
				if (scrollType == 2) {
					scrollEl = el;
					heightEl = el.children[0];
				} else {
					scrollEl = document.body;
					heightEl = el;
				}

				el.addEventListener('touchstart', () => {
					height = heightEl.clientHeight;
					if (scrollType == 2) {
						height = height
					}
					setTop = el.offsetTop;
					paddingBottom = getStyle(el, 'paddingBottom');
					marginBottom = getStyle(el, 'marginBottom');
				}, false)

				el.addEventListener('touchmove', () => {
					loadMore();
				}, false)

				el.addEventListener('touchend', () => {
					oldScrollTop = scrollEl.scrollTop;
					moveEnd();
				}, false)

				const moveEnd = () => {
					requestFram = requestAnimationFrame(() => {
						if (scrollEl.scrollTop != oldScrollTop) {
							oldScrollTop = scrollEl.scrollTop;
							moveEnd()
						} else {
							cancelAnimationFrame(requestFram);
							height = heightEl.clientHeight;
							loadMore();
						}
					})
				}

				const loadMore = () => {
					if (scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
						binding.value();
					}
				}
			}
		}
	}
};

/*------------filters--------------*/
/**
 * 时间戳格式化
 * @param {Number} time   自动传入要控制的值
 * @param {String} format   期望日期格式：yyyy-MM-dd hH:mm:ss
 */
export const formatDate = {
	filters: {
		formatDate(time, format){
			if(/^[0-9]*$/.test(time) == false){
				return time;
			}

			let date = new Date(parseInt(time) * 1000);

			function padLeftZero(str){
				return ('00' + str).substr(str.length);
			}
			if (/(y+)/.test(format)) {
		        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		    }
		    let o = {
		        'M+': date.getMonth() + 1,
		        'd+': date.getDate(),
		        'h+': date.getHours(),
		        'm+': date.getMinutes(),
		        's+': date.getSeconds()
		    };
		    for (let k in o) {
		        if (new RegExp(`(${k})`).test(format)) {
		            let str = o[k] + '';
		            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		        }
		    }

			return format;
		}
	}
}
/**
 * 小数截取位数
 * @param {Number} number   自动传入要控制的值
 * @param {Number} subNum   截取小数位数（默认：2位）（可选）
 * @param {Boolean} isRounding   是否四舍五入(默认：是)（可选）
 */
export const subNumber = {
	filters: {
		subNumber(number, subNum = 2, isRounding = true){
			let numbers = parseFloat(number); 
			if(!numbers){
				return number;
			}
			if(/[.]*/.test(numbers) == true){
				if(isRounding){
					numbers = numbers.toFixed(subNum);
				}else{
					let numStr = numbers.toString();
					numbers = Number(numStr.substring(0, numStr.indexOf('.') + (subNum + 1) ))
				}
			}else{
				numbers += '.00';
			}
			return numbers;
		}
	}
}