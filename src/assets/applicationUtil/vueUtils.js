import loading from '@/components/common/loading'

/**
 * 封装请求所要执行内容，此处作用是为所有请求加入loading加载动画
 * @param {Function} awaitFetch   请求动作
 */
const _ajaxDoSomething = (awaitFetch) => {
	this.isloading = true;
    let res = awaitFetch;
    this.isloading = false;
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


/**
 * 判断对象是否为空
 */
const _verification = () => {
    if(_isEmptyObject(this.userInfo)){
        this.showAlert = true;
        this.alertText = "(。・`ω´・)你还没登录，点击确认开始登录！";
        return false;
    }
}

export default{
	install(Vue, options){
		Vue.component('loading', loading)
		Object.assign(Vue.prototype, {_ajaxDoSomething, _isEmptyObject, _verification})
	}
}