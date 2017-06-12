import fetch from '../assets/config/fetch'
import {getStore} from '../assets/config/mUtils'

/**
 * 全部商品
 * @param {Number} counts   显示总数
 */
export const newsGoodsList = counts => fetch('/newsGoodsList', {
	counts,
}, 'POST');

/**
 * 积分页初始数据
 */
export const pointUser = () => fetch('/pointUser');