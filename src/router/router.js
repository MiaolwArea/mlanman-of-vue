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
const orderPointList = r => require.ensure([], () => r(require('../page/user/myPoint/orderPointList')), 'orderPointList')
const login = r => require.ensure([], () => r(require('../page/user/login/login')), 'login')
const adress = r => require.ensure([], () => r(require('../page/user/adress/adressList')), 'adress')
const editAdress = r => require.ensure([], () => r(require('../page/user/adress/adressAdd')), 'editAdress')
const order = r => require.ensure([], () => r(require('../page/user/order/orderList')), 'order')
const logistics = r => require.ensure([], () => r(require('../page/user/logistics/logistics')), 'logistics')
const payfeedback = r => require.ensure([], () => r(require('../page/user/payfeedback/payfeedback')), 'payfeedback')
const comment = r => require.ensure([], () => r(require('../page/user/comment/comment')), 'comment')

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
            component: myPoint,
            children: [{
                // 商品积分列表页
                path: 'orderPointList',
                component: orderPointList
            }]
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
        // 用户登入注册页
        {
            path: '/user/login',
            component: login
        },
        // 用户收货地址页
        {
            path: '/user/adress',
            component: adress,
            children: [{
                // 添加地址
                path: 'add',
                component: editAdress
            },{
                // 编辑地址
                path: 'edit',
                component: editAdress
            }]
        },
        // 我的订单页
        {
            path: '/user/order',
            component: order
        },
        // 我的物流页
        {
            path: '/user/logistics',
            component: logistics
        },
        // 我的售后页
        {
            path: '/user/payfeedback',
            component: payfeedback
        },
        // 我的评价页
        {
            path: '/user/comment',
            component: comment
        }
    ]
}]
