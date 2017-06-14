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
 * 首页初始数据
 */
export const home = () => fetch('/home');

/**
 * 积分页初始数据
 */
export const pointUser = () => fetch('/pointUser');

/**
 * 个人中心页初始数据
 */
export const user = () => fetch('/user');

/**
 * 我的二维码图片
 */
export const qrcodeimg = () => fetch('/qrcodeimg');


