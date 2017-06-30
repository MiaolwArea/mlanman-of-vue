import App from '../App' 

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
// const community = r => require.ensure([], () => r(require('../page/community/community')), 'community')
const myCode = r => require.ensure([], () => r(require('../page/myCode/myCode')), 'myCode')
const pointUser = r => require.ensure([], () => r(require('../page/pointUser/pointUser')), 'pointUser')
const user = r => require.ensure([], () => r(require('../page/user/user')), 'user')
const goods = r => require.ensure([], () => r(require('../page/goods/goods')), 'goods')
const shoppingCart = r => require.ensure([], () => r(require('../page/shoppingCart/shoppingCart')), 'shoppingCart')
const pointList = r => require.ensure([], () => r(require('../page/point/list')), 'pointList')

export default [{
    path: '/',
    component: App, 
    children: [ 
        // 地址为空时跳转home页面 
        {
            path: '',
            redirect: '/home'
        },
        // 首页
        {
            path: '/home',
            component: home
        },
        // 口红社
        // {
        //     path: '/community',
        //     component: community
        // },
        // 二维码
        {
            path: '/myCode',
            component: myCode
        },
        // 积分
        {
            path: '/pointUser',
            component: pointUser
        },
        // 个人中心
        {
            path: '/user',
            component: user
        },
        // 商品详情页
        {
            path: '/goods',
            component: goods
        },
        // 购物车页
        {
            path: '/shoppingCart',
            component: shoppingCart
        },
        // 积分兑换页
        {
            path: '/point',
            component: pointList
        },
    ]
}]
