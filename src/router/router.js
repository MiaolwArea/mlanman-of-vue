import App from '../App' 

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
// const community = r => require.ensure([], () => r(require('../page/community/community')), 'community')
const myCode = r => require.ensure([], () => r(require('../page/myCode/myCode')), 'myCode')
const pointUser = r => require.ensure([], () => r(require('../page/pointUser/pointUser')), 'pointUser')
const pointList = r => require.ensure([], () => r(require('../page/pointUser/point/list')), 'pointList')
const pointListDetail = r => require.ensure([], () => r(require('../page/pointUser/point/listDetail')), 'pointListDetail')
const user = r => require.ensure([], () => r(require('../page/user/user')), 'user')
const myPoint = r => require.ensure([], () => r(require('../page/user/myPoint/myPoint')), 'myPoint')
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
            path: '/myCode',
            component: myCode
        },
        // 积分
        {
            path: '/pointUser', 
            component: pointUser,
            children: [{
                // 积分兑换页
                path: 'point/list',
                component: pointList,
                children: [{
                    // 兑换详情页
                    path: 'detail',
                    component: pointListDetail
                }]
            }]
        },
        // 个人中心
        {
            path: '/user',
            component: user
        },
        // 我的积分/积分纪录
        {
            path: '/user/myPoint',
            component: myPoint
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
