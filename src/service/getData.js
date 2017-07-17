import {getStore} from '../assets/config/mUtils'
import axios from 'axios'
import {
	baseUrl
} from '@/assets/config/env'

function axiosToDo(url, paramObj, type = 'GET', prefix = true){ 
	let urlInfo = url;

	if(type === 'POST'){
		return axios.post(urlInfo, paramObj).then((res) => {
			return res.data;
		}).catch(error => {
			console.log(error);
		});
	}else{
		return axios.get(urlInfo, {
			params: paramObj
		}).then((res) => {
			return res.data;
		}).catch(error => {
			console.log(error);
		});
	}
}

/**
 * 首页信息
 */
export const home = () => axiosToDo('/api/home');

/**
 * 当季新品
 */
export const newGoodsList = () => axiosToDo('/api/newGoodsList');
/**
 * 全部商品
 * @param {Number} counts   显示总数
 * @param {String} skin   肤质信息
 * @param {String} scene   适用场景
 */
export const allGoodsList = (counts, skin, scene) => axiosToDo('/api/allGoodsList', {
	counts,
	skin,
	scene,
});

/**
 * 设置订阅提醒
 */
export const addsubscribe = () => axiosToDo('/api/addsubscribe');

/**
 * 积分页初始数据
 */
export const pointUser = () => axiosToDo('/api/pointUser', {user_id: getStore('user_id')});

/**
 * 推荐列表
 */
export const recommendList = () => axiosToDo('/api/recommendList');

/**
 * 我的二维码图片
 */
export const qrcodeimg = () => axiosToDo('/api/qrcodeimg');

/**
 * 获取二维码数据组
 */
export const getQrcodeimgs = () => axiosToDo('/api/getQrcodeimgs');

/**
 * 选择二维码样式
 * @param {Number} userId   用户ID
 * @param {Number} styleId   样式ID
 */
export const selectedQrcodeimg = (userId, styleId) => axiosToDo('/api/selectedQrcodeimg', {user_id: userId, style_id: styleId});

/**
 * 获取用户信息, 两个请求是根据后台登入纪录状态返回不同结果
 */
 export const getUser = () => axiosToDo('/api/getUser', {user_id: getStore('user_id')}); 	
 export const getUserByNull = () => axiosToDo('/api/getUserByNull', {user_id: getStore('user_id')}); 	

/**
 * 商品详情
 * @param {Number} order_id   商品ID
 */
export const goodsDetial = (order_id) => axiosToDo('/api/goodsDetial', {order_id: order_id});

/**
 * 最受欢迎、热门商品
 */
export const popularGoods = () => axiosToDo('/api/popularGoods');

/**
 * 评论列表
 */
export const commentList = () => axiosToDo('/api/commentList');

/**
 * 获取积分兑换商品
 */
export const pointGoods = () => axiosToDo('/api/pointGoods');

/**
 * 积分兑换商品描述
 */
export const pointGoodsDetail = () => axiosToDo('/api/pointGoodsDetail');

/**
 * 我的积分
 */
export const myPoint = () => axiosToDo('/api/myPoint');

/**
 * 订单将要获取到积分纪录页
 */
export const orderPointList = () => axiosToDo('/api/orderPointList');

/**
 * 获取图片验证码
 */
export const getcaptchas = () => axiosToDo('http://cangdu.org:8001/v1/captchas', {}, 'POST', false);

/**
 * 用户登入验证(POST)
 * @param {String} userAccount   用户名
 * @param {String} passWord   密码
 * @param {Number} codeNumber   验证码
 */
export const accountLogin = (userAccount, passWord, codeNumber) => axiosToDo('/api/accountLogin', {
	user_account: userAccount, 
	pass_word: passWord,
	code_number: codeNumber,
});

/**
 * 地址列表数据
 */
export const getAdress = () => axiosToDo('/api/getAdress');

/**
 * 设置默认地址(POST)
 * @param {String} userAccount   用户名
 */
export const setDefaultAdress = (id) => axiosToDo('/api/setDefaultAdress');

/**
 * 获取编辑地址
 */
export const getAdressInfo = () => axiosToDo('/api/getAdressInfo');

/**
 * 订单列表数据
 */
export const getOrderList = () => axiosToDo('/api/getOrderList');

/**
 * 售后纪录列表数据
 */
export const getPayfeedbackList = () => axiosToDo('/api/getPayfeedbackList');





