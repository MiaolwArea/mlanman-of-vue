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
            <li :class="{active: $route.path.indexOf('home') !== -1}" @click="gotoAddress({path: '/home'})">
                <a class="nav-itme">
                    <i class="iconfont fz20 icon-tabbar-index"></i>
                    <p>首页</p>
                </a>
            </li>
            <li :class="{active: $route.path.indexOf('mycode') !== -1}" @click="gotoAddress({path: '/mycode'})">
                <a class="nav-itme">
                    <i class="iconfont fz20 icon-fixed-shopcar"></i>
                    <p>购物车</p>
                </a>
            </li>
            <li :class="{active: $route.path.indexOf('point') !== -1}" @click="gotoAddress({path: '/pointUser'})">
                <a class="nav-itme fz16">
                    加入购物车
                </a>
            </li>
            <li :class="{active: $route.path.indexOf('user') !== -1}" @click="gotoAddress({path: '/user'})">
                <a class="nav-itme fz16">
                    立即下单
                </a>
            </li>
        </ul>
	    <ul class="item-list" v-else="buyBtn">
	    	<li :class="{active: $route.path.indexOf('home') !== -1}" @click="gotoAddress({path: '/home'})">
	    		<a class="nav-itme">
	    			<i class="iconfont fz20 icon-tabbar-index"></i>
                	<p>口红</p>
	    		</a>
	    	</li>
	    	<li :class="{active: $route.path.indexOf('mycode') !== -1}" @click="gotoAddress({path: '/mycode'})">
	    		<a class="nav-itme">
	    			<i class="iconfont fz20 icon-tabbar-qrcode"></i>
                	<p>二维码</p>
	    		</a>
	    	</li>
	    	<li :class="{active: $route.path.indexOf('point') !== -1}" @click="gotoAddress({path: '/pointUser'})">
	    		<a class="nav-itme">
	    			<i class="iconfont fz20 icon-tabbar-point"></i>
                    <p>积分</p>
	    		</a>
	    	</li>
	    	<li :class="{active: $route.path.indexOf('user') !== -1}" @click="gotoAddress({path: '/user'})">
	    		<a class="nav-itme">
	    			<i class="iconfont fz20 icon-tabbar-user"></i>
                	<p>个人中心</p>
	    		</a>
	    	</li>
	    </ul>
        <div class="shopcart pa" v-show="isShopcart" @click="gotoAddress({path: '/cart'})">
            <a class="iconfont icon-fixed-shopcar"></a>
            <div class="cart-num" id="cart_num">0</div>
        </div>
	</nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'

    export default {
    	data(){
            return{
                isService: false,       // 是否显示联系客服二维码
            }
        },
        props: {
            isShopcart: {
                default: true
            },
            buyBtn: {
                default: false
            }
        },
        mounted(){
            // 获取用户信息
            this.getUserInfo();
        },
        computed: {
            ...mapState([
                'userInfo'
            ])
        },
        methods: {
            // 获取登入信息
            ...mapActions([
                'getUserInfo'
            ]),
            // 地址跳转
        	gotoAddress(path){
        		this.$router.push(path)
        	},
        },
    }
</script>
<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';

    $footerNavHeight: 50px;
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
            }
            .item-list{
                background-color: #bfbfbf;
                width: calc(100% - #{strip-rem(50px)});
                li:nth-child(1), li:nth-child(2){
                    width: 20%;
                }
                li:nth-child(3){
                    background-color: #5f5f5f;
                    line-height: strip-rem(50px);
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
            top: strip-rem(-50px);
            border-radius: 50%;
            width: strip-rem(35px);
            height: strip-rem(35px);
            padding: strip-rem(9px);
            border: 1px solid #fff;
            .cart-num{
                position: absolute;
                top: 0;
                right: 0;
                background-color: red;
                width: 15px;
                height: 15px;
                line-height: 15px;
                border-radius: 50%;
                text-align: center;
            }
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
</style>