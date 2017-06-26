import App from '../App' 

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
// const community = r => require.ensure([], () => r(require('../page/community/community')), 'community')
const mycode = r => require.ensure([], () => r(require('../page/mycode/mycode')), 'mycode')
const pointUser = r => require.ensure([], () => r(require('../page/pointUser/pointUser')), 'pointUser')
const user = r => require.ensure([], () => r(require('../page/user/user')), 'user')
const goods = r => require.ensure([], () => r(require('../page/goods/goods')), 'goods')
const shoppingCart = r => require.ensure([], () => r(require('../page/shoppingCart/shoppingCart')), 'shoppingCart')

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
            path: '/mycode',
            component: mycode
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
    ]
}]
