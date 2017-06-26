import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './router/router'
import store from './store/'
import './assets/applicationUtil/flexible' 

Vue.use(VueRouter);
Vue.use(VueResource);

// 是否开启生产模式下提示 
Vue.config.productionTip = false

const router = new VueRouter({
	routes
});

// 所有请求启用loading动画
router.beforeEach(function (to, from, next) {
	store.commit('updateLoadingStatus', {isLoading: true});
	next();
})
router.afterEach(function (to) {
	store.commit('updateLoadingStatus', {isLoading: false});
})

new Vue({
	router,
	store,
}).$mount('#app')

