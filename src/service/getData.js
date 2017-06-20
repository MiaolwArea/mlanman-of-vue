import fetch from '../assets/config/fetch'
import {getStore} from '../assets/config/mUtils'

/**
 * 当季新品
 */
export const newGoodsList = () => fetch('/newGoodsList');

/**
 * 全部商品
 * @param {Number} counts   显示总数
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
export const pointUser = () => fetch('/pointUser');

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
 */
export const selectedQrcodeimg = (userId, styleId) => fetch('/selectedQrcodeimg', {user_id: userId, style_id: styleId});


/**
 * 获取用户信息
 */

export const getUser = () => fetch('/getUser', {user_id: getStore('user_id')});


