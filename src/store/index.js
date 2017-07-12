import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import * as getters from './getters'
import modules from './modules'
import { getStore } from '../assets/config/mUtils'

Vue.use(Vuex)

const state = { 
	cartList: {}, // 加入购物车的商品列表
	userInfo: null, //用户信息
	searchAddress: null,//搜索并选择的地址
	choosedAddress: null,//选择地址
	addressIndex: null,//选择地址的索引值
	needValidation: null,//确认订单时是否需要验证
	cartId: null, //购物车id
	orderParam: null,//订单的参数
	orderMessage: null, //订单返回的信息
	orderDetail: null, //订单详情
	isLogin: (getStore('isLogin') === 'true' ? true : false),//是否登录
	imgPath:null,//头像地址
	picIndex: 0,//滚图索引值
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules
})