import { getStyle } from '../../assets/config/mUtils'

/*------------directives--------------*/
// 滚动加载更多
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
// 时间戳格式化
export const formatDate = {
	filters: {
		formatDate(time, format){
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