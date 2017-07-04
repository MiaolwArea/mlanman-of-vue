import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './router/router'
import store from './store/'
import './assets/applicationUtil/flexible' 
import loading from './components/common/loading'

Vue.use(VueRouter);
Vue.use(VueResource);

// 是否开启生产模式下提示 
Vue.config.productionTip = false

const router = new VueRouter({
	mode: 'history',
	routes,
	scrollBehavior (to, from, savedPosition) {
		// 关闭路由跳转页默认记录位置功能
	    return { x: 0, y: 0 }
	}
});

// 所有页面跳转启用loading动画
router.beforeEach((to, from, next) => {
	store.commit('updateLoadingStatus', {isLoading: true});
	next();
})
router.afterEach((to) => {
	store.commit('updateLoadingStatus', {isLoading: false});
})

// 封装请求所要执行内容，此处作用是为所有请求加入loading加载动画，不建议写在此处，可作为外部文件引入
Vue.component('loading', loading)
Vue.prototype.ajaxDoSomeing = function (awaitFetch){
	this.loading.isloading = true;
    let res = awaitFetch;
    this.loading.isloading = false;
    return res;
}

new Vue({
	router,
	store,
}).$mount('#app')

