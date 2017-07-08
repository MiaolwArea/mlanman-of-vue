import loading from '@/components/common/loading'
import store from '@/store/'

/**
 * 封装请求所要执行内容，此处作用是为所有请求加入loading加载动画
 * @param {Function} awaitFetch   请求动作
 */
const _ajaxDoSomething = (awaitFetch) => {
	store.commit('updateLoadingStatus', {isLoading: true});
    let res = awaitFetch;
    store.commit('updateLoadingStatus', {isLoading: false});
    return res;
}

/**
 * 判断对象是否为空
 */
const _isEmptyObject = (e) => {
    var t;  

    for (t in e)  
        return !1;  
    return !0  
}

export default{
	install(Vue, options){
		Vue.component('loading', loading)
		Object.assign(Vue.prototype, {_ajaxDoSomething, _isEmptyObject})
	}
}