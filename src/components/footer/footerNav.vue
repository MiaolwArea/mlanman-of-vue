<template>
	<nav class="footer-nav" :class="{buyBtn: buyBtn}">
		<div class="nav-service nav-item" @click="isService = !isService">
	        <i class="iconfont icon-fixed-service fz16"></i>
	        <p class="fz14">客服</p>
            <div class="service-wrapper" v-show="isService">
                <p>扫描二维码联系客服</p>
                <img src="http://image.lanman.cn/2016/12/13/63375aee3f9c1daa48425c5d3e6e3d7c.jpg">
            </div>
	    </div> 
        <ul class="item-list" v-if="buyBtn">
            <li @click="gotoAddress({path: '/home'})">
                <a class="nav-itme">
                    <i class="iconfont fz20 icon-tabbar-index"></i>
                    <p>首页</p>
                </a>
            </li>
            <li @click="gotoAddress({path: (cartNum ? '/shoppingCart/?num=' + cartNum : '/shoppingCart')})" class="pr footer-cart">
                <a class="nav-itme">
                    <i class="iconfont fz20 icon-fixed-shopcar"></i>
                    <p>购物车</p>
                    <div class="cart-num">{{ cartNum }}</div>
                </a>
            </li>
            <li @click="" :class="{cant: !isCanJoin}">
                <a class="nav-itme fz16" @click="joinCart">
                    {{ cartText }}
                </a>
            </li>
            <li @click="joinOrder((cartNum ? '/shoppingCart/?num=' + cartNum : '/shoppingCart'))">
                <a class="nav-itme fz16">
                    立即下单
                </a>
            </li>
        </ul>
	    <ul class="item-list" v-else="buyBtn">
	    	<li :class="{active: /\/home$/g.test($route.path)}" @click="gotoAddress({path: '/home'})">
	    		<a class="nav-itme">
	    			<i class="iconfont fz20 icon-tabbar-index"></i>
                	<p>口红</p>
	    		</a>
	    	</li>
	    	<li :class="{active: /\/myCode$/g.test($route.path)}" @click="gotoAddress({path: '/myCode'})">
	    		<a class="nav-itme">
	    			<i class="iconfont fz20 icon-tabbar-qrcode"></i>
                	<p>二维码</p>
	    		</a>
	    	</li>
	    	<li :class="{active: /\/pointUser$/g.test($route.path)}" @click="gotoAddress({path: '/pointUser'})" class="pr">
	    		<a class="nav-itme">
	    			<i class="iconfont fz20 icon-tabbar-point"></i>
                    <p>积分</p>
                    <!-- <div :class="{'red-spot': userInfo.isTask}"></div> -->
	    		</a>
	    	</li>
	    	<li :class="{active: /\/user$/g.test($route.path)}" @click="gotoAddress({path: '/user'})">
	    		<a class="nav-itme">
	    			<i class="iconfont fz20 icon-tabbar-user"></i>
                	<p>个人中心</p>
	    		</a>
	    	</li>
	    </ul>
        <div class="shopcart pa tac" v-if="isShopcart" v-show="autoHide" @click="gotoAddress({path: (cartNumSide ? '/shoppingCart/?num=' + cartNumSide : '/shoppingCart')})">
            <a class="iconfont icon-fixed-shopcar fz20"></a>
            <div class="cart-num">{{ cartNumSide }}</div>
        </div>
	</nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

    export default {
    	data(){
            return{
                isService: false,       // 是否显示联系客服二维码
                cartNumSide: 0,         // 悬浮购物车商品数量
                autoHide: true,
            }
        },
        props: {
            isShopcart: {
                default: true
            },
            buyBtn: {
                default: false
            },
            cartText: {
                default: ''
            },
            isCanJoin: {
                default: true
            },
            cartNum: {
                default: 0
            }
        },
        created(){
            this.INIT_BUYCART();
        },
        mounted(){
            // 获取用户信息
            this.getUserInfo();
            this.initCartNum();
            this._autoHideShopCart();
        },
        computed: {
            ...mapState([
                'userInfo', 'cartList'
            ])
        },
        methods: {
            ...mapMutations([
                'INIT_BUYCART'
            ]),
            // 获取登入信息
            ...mapActions([
                'getUserInfo'
            ]),
            // 地址跳转
        	gotoAddress(path){
        		this.$router.push(path)
        	},
            // 加入购物车
            joinCart(){
                this.$emit('joinCart');
            },
            // 购物车商品数量
            initCartNum(){
                Object.keys(this.cartList).forEach(itemid => {
                    let goodsInfo = this.cartList[itemid];

                    this.cartNumSide += goodsInfo.num;
                })
            },
            // 立即下单
            joinOrder(path){
                this.$emit('joinOrder', path);
            },
            // 
            _autoHideShopCart(){
                if(!this.isShopcart){
                    this._unbindScroll();
                    return;
                }
                window.addEventListener('scroll', this._scrollHandler, false)
            },
            _scrollHandler(){
                
            },
            _unbindScroll(){
                window.removeEventListener('scroll', this._scrollHandler, false);
            }
        },
    }
</script>
<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';

    $footerNavHeight: 60px;
    .footer-nav{
    	position: fixed;
    	background-color: #4c4c4c;
    	bottom: 0;
    	width: 100%;
    	@include fj('center');
    	@include remCalc('height', $footerNavHeight);
    	.nav-service{
    		@include fj('center');
    		flex-direction: column;
    		background-color: #fff;
    		@include remCalc('width', 66);
    		@include remCalc('padding', 10);
    		height: 100%;
    		i,p{
    			color: #000;
    		}
    	}
        &.buyBtn{
            .nav-service{
                width: strip-rem(50px);
                color: #000;
                background-color: #bfbfbf;
                border-right: 1px solid #808080;
            }
            .item-list{
                background-color: #bfbfbf;
                width: calc(100% - #{strip-rem(50px)});
                li:nth-child(1){
                    border-right: 1px solid #808080;
                }
                li:nth-child(1), li:nth-child(2){
                    width: 20%;
                }
                li:nth-child(3){
                    background-color: #5f5f5f;
                    line-height: strip-rem(50px);
                }
                li.cant{
                    background-color: #a0a0a0;
                }
                li:nth-child(4){
                    background-color: #000;
                    line-height: strip-rem(50px);
                }
                li:nth-child(3), li:nth-child(4){
                    width: 30%;
                    padding: 0;
                    color: #fff;
                }
            }
        }
    	.item-list{
    		@include fj('center');
    		width: calc(100% - 66px);
            height: 100%;
    		text-align: center;
    		li{
    			width: 25%;
                height: strip-rem(50px);
                @include remCalc('padding', 6, 0);
    		}
    		i,p{
    			color: #000;
    		}
    	}
    	li.active{
			i,p{
				color: #fff;
			}
		}
        .shopcart{
            right: strip-rem(10px);
            top: strip-rem(-70px);
            border-radius: 50%;
            width: strip-rem(48px);
            height: strip-rem(48px);
            line-height: strip-rem(45px);
            border: 1px solid #fff;
        }
        .cart-num{
            position: absolute;
            top: strip-rem(-2px);
            right: strip-rem(-2px);
            background-color: red;
            width: strip-rem(15px);
            height: strip-rem(15px);
            line-height: strip-rem(15px);
            border-radius: 50%;
            text-align: center;
        }
        .footer-cart{
            .cart-num{
                top: strip-rem(-5px);
                right: strip-rem(-5px);
            }
        }
        .red-spot{
            position: absolute;
            top: strip-rem(5px);
            left: strip-rem(15px);
            background-color: red;
            width: strip-rem(10px);
            height: strip-rem(10px);
            border-radius: 50%;
        }
        .service-wrapper{
            position: absolute;
            left: strip-rem(10px);
            bottom: strip-rem($footerNavHeight + 10);
            width: strip-rem(150px);
            height: strip-rem(180px);
            background-color: #fff;
            text-align: center;
            border-radius: 5px;
            overflow: hidden;
            padding-top: strip-rem(10px);
        }
    }
    .footer-nav.scaleaction .cart-num{
        -webkit-animation: scale .5s;
        animation: scale .5s;
    }
    @keyframes scale{
        0%{
            -webkit-transform: scale(1.3);
            transform: scale(1.3);
        }
        50%{
            -webkit-transform: scale(.8);
            transform: scale(.8);
        }
        100%{
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
</style>