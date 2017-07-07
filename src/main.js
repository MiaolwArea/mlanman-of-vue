import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './router/router'
import store from './store/'
import './assets/applicationUtil/flexible' 
import loading from './components/common/loading'
import vueUtils from './assets/applicationUtil/vueUtils'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(vueUtils);

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

new Vue({
	router,
	store,
}).$mount('#app')

