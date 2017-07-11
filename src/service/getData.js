import fetch from '../assets/config/fetch'
import {getStore} from '../assets/config/mUtils'

/**
 * 当季新品
 */
export const home = () => fetch('/home');

/**
 * 当季新品
 */
export const newGoodsList = () => fetch('/newGoodsList');

/**
 * 全部商品
 * @param {Number} counts   显示总数
 * @param {String} skin   肤质信息
 * @param {String} scene   适用场景
 */
export const allGoodsList = (counts, skin, scene) => fetch('/allGoodsList', {
	counts,
	skin,
	scene,
});

/**
 * 设置订阅提醒
 */
export const addsubscribe = () => fetch('/addsubscribe');

/**
 * 积分页初始数据
 */
export const pointUser = () => fetch('/pointUser', {user_id: getStore('user_id')});

/**
 * 推荐列表
 */
export const recommendList = () => fetch('/recommendList');

/**
 * 我的二维码图片
 */
export const qrcodeimg = () => fetch('/qrcodeimg');

/**
 * 获取二维码数据组
 */
export const getQrcodeimgs = () => fetch('/getQrcodeimgs');

/**
 * 选择二维码样式
 * @param {Number} userId   用户ID
 * @param {Number} styleId   样式ID
 */
export const selectedQrcodeimg = (userId, styleId) => fetch('/selectedQrcodeimg', {user_id: userId, style_id: styleId});

/**
 * 获取用户信息, 两个请求是根据后台登入纪录状态返回不同结果
 */
 export const getUser = () => fetch('/getUser', {user_id: getStore('user_id')}); 	
 export const getUserByNull = () => fetch('/getUserByNull', {user_id: getStore('user_id')}); 	

/**
 * 商品详情
 * @param {Number} order_id   商品ID
 */
export const goodsDetial = (order_id) => fetch('/goodsDetial', {order_id: order_id});

/**
 * 最受欢迎、热门商品
 */
export const popularGoods = () => fetch('/popularGoods');

/**
 * 最受欢迎、热门商品
 */
export const commentList = () => fetch('/commentList');

/**
 * 获取积分兑换商品
 */
export const pointGoods = () => fetch('/pointGoods');

/**
 * 积分兑换商品描述
 */
export const pointGoodsDetail = () => fetch('/pointGoodsDetail');

/**
 * 我的积分
 */
export const myPoint = () => fetch('/myPoint');

/**
 * 订单将要获取到积分纪录页
 */
export const orderPointList = () => fetch('/orderPointList');

/**
 * 获取图片验证码
 */
export const getcaptchas = () => fetch('http://cangdu.org:8001/v1/captchas', {},'POST', 'fetch', false);

/**
 * 用户登入验证(POST)
 * @param {String} userAccount   用户名
 * @param {String} passWord   密码
 * @param {Number} codeNumber   验证码
 */
export const accountLogin = (userAccount, passWord, codeNumber) => fetch('/accountLogin', {
	user_account: userAccount, 
	pass_word: passWord,
	code_number: codeNumber,
});

/**
 * 地址列表数据
 */
export const getAdress = () => fetch('/getAdress');

/**
 * 设置默认地址(POST)
 * @param {String} userAccount   用户名
 */
export const setDefaultAdress = (id) => fetch('/setDefaultAdress');

/**
 * 地址列表数据
 */
export const getAdressInfo = () => fetch('/getAdressInfo');

/**
 * 订单列表数据
 */
export const getOrderList = () => fetch('/getOrderList');





