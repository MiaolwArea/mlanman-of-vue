import {
	ADD_CART,
	REDUCE_CART,
	INIT_BUYCART,
	CLEAR_CART,
	RECORD_USERINFO,
	GET_USERINFO,
	CONFIRM_REMARK,
	CONFIRM_ADDRESS,
	CHOOSE_ADDRESS,
	NEED_VALIDATION,
	SAVE_CART_ID_SIG,
	SAVE_ORDER_PARAM,
	CHANGE_ORDER_PARAM,
	ORDER_SUCCESS,
	SAVE_ORDER,
	OUT_LOGIN,
	RETSET_NAME,
	BUY_CART, 
	SWIPER_ACTION,
	ADD_CART_NUM,
} from './mutation-types.js'

import {setStore, getStore} from '../assets/config/mUtils'

import {localapi, proapi} from '../assets/config/env'

export default {
	/**
	 * 滚图控制
	 * @param {other} actionNum   控制类型，0: 滑动(默认)；prev: 上一张；next: 下一张（必选）
	 * @param {Number} actionNum   显示图片总数（可选）
	 * @param {Number} index   0: 滑动时，索引（可选）
	 */
	[SWIPER_ACTION](state, {actionNum = 0, picItem, index}) {
		switch(actionNum){
			case 0: {
				state.picIndex = index;
				break;
			}
			case 'prev': {
				if(state.picIndex == 0){
                    state.picIndex = picItem - 1;
                }else{
                    state.picIndex--;
                }
                break;
			}
			case 'next': {
				if(state.picIndex == (picItem - 1)){
                    state.picIndex = 0;
                }else{
                    state.picIndex++;
                }
                break;
			}
		}
	},
	// 加入购物车, TODO 登入后追加购物车数量内容
	[ADD_CART](state, {
		shopId,
		shopPrice,
		goodsName,
		colorName,
		shopPic
	}) {
		let cart = state.cartList;
		if (cart[shopId]) {
			cart[shopId]['num']++;
		} else {
			cart[shopId] = {
				"num" : 1,
				"id" : shopId,
				"name" : goodsName,
				"price" : shopPrice,
				"colorName": colorName,
				shopPic
			};
		}
		state.cartList = {...cart};
		//存入localStorage
		setStore('buyCart', state.cartList);
	},
	/**
	 * 修改商品数量
	 * @param {Number} shopId   要修改的商品ID
	 * @param {Number} num   具体数量
	 */
	[ADD_CART_NUM](state, {
		shopId,
		num
	}) {
		let cart = state.cartList;
		if (cart[shopId]) {
			cart[shopId]['num'] = num;
		} 
		state.cartList = {...cart};
		//存入localStorage
		setStore('buyCart', state.cartList);
	},
	// 移出购物车
	[REDUCE_CART](state, {
		shopId,
		shopPrice,
		goodsName,
		colorName,
		shopPic
	}) {
		let cart = state.cartList;
		if (cart && cart[shopId]) {
			if (cart[shopId]['num'] > 0) {
				cart[shopId]['num']--;
				state.cartList = {...cart};
				//存入localStorage
				setStore('buyCart', state.cartList);
			} else {
				//商品数量为0，则清空当前商品的信息
				cart[shopId] = null;
			}
		}
	},
	//网页初始化时从本地缓存获取购物车数据
	[INIT_BUYCART](state) {
		let initCart = getStore('buyCart');
		if (initCart) {
			state.cartList = JSON.parse(initCart);
		}
	},
	//清空当前商品的购物车信息
	[CLEAR_CART](state, shopid) {
		delete state.cartList[shopid];
		state.cartList = {...state.cartList};
		setStore('buyCart', state.cartList);
	},
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.isLogin = true;
		setStore('isLogin', true);
		setStore('user_id', info.user_id);
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		let infoData = info.data;

		if (!info.error) {
			state.userInfo = {...infoData};
		} else {
			state.userInfo = null;
		}
	},
	//修改用户名
	[RETSET_NAME](state,username) {
		state.userInfo = Object.assign({}, state.userInfo,{username})
	},
	//退出登录
	[OUT_LOGIN](state) {
		state.userInfo = {};
		state.isLogin = false;
		setStore('isLogin', false);
	},
	
	//记录订单页面用户选择的备注, 传递给订单确认页面
	[CONFIRM_REMARK](state, {
		remarkText,
		inputText
	}) {
		state.remarkText = remarkText;
		state.inputText = inputText;
	},
	//确认订单页添加新的的地址
	[CONFIRM_ADDRESS](state, newAddress) {
		state.newAddress.push(newAddress);
	},
	//选择的地址
	[CHOOSE_ADDRESS](state, {
		address,
		index
	}) {
		state.choosedAddress = address;
		state.addressIndex = index;
	},
	//保存下单需要验证的返回值
	[NEED_VALIDATION](state, needValidation) {
		state.needValidation = needValidation;
	},
	//保存下单后购物id 和 sig
	[SAVE_CART_ID_SIG](state, {
		cart_id,
		sig
	}) {
		state.cart_id = cart_id;
		state.sig = sig;
	},
	//保存下单参数，用户验证页面调用
	[SAVE_ORDER_PARAM](state, orderParam) {
		state.orderParam = orderParam;
	},
	//修改下单参数
	[CHANGE_ORDER_PARAM](state, newParam) {
		state.orderParam = Object.assign({}, state.orderParam, newParam);
	},
	//下单成功，保存订单返回信息
	[ORDER_SUCCESS](state, order) {
		state.cartPrice = null;
		state.orderMessage = order;
	},
	//进入订单详情页前保存该订单信息
	[SAVE_ORDER](state, orderDetail) {
		state.orderDetail = orderDetail;
	},
	//会员卡价格纪录
	[BUY_CART](state, price) {
		state.cartPrice = price;
	},
}
