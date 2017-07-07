import loading from '@/components/common/loading'

/**
 * 封装请求所要执行内容，此处作用是为所有请求加入loading加载动画
 * @param {Function} awaitFetch   请求动作
 */
const ajaxDoSomething = (awaitFetch) => {
	this.loading.isloading = true;
    let res = awaitFetch;
    this.loading.isloading = false;
    return res;
}

/**
 * 判断对象是否为空
 */
const isEmptyObject = (e) => {
    var t;  

    for (t in e)  
        return !1;  
    return !0  
}

export default{
	install(Vue, options){
		Vue.component('loading', loading)
		Object.assign(Vue.prototype, {ajaxDoSomething, isEmptyObject})
	}
}