<template>
	<nav class="footer-nav">
		<div class="nav-service nav-item">
	        <i class="iconfont icon-fixed-service fz16"></i>
	        <p class="fz16">客服</p>
	    </div> 
	    <ul class="item-list">
	    	<li :class="{active: $route.path.indexOf('home') !== -1}" @click="gotoAddress({path: '/home'})">
	    		<a class="nav-itme">
	    			<i class="iconfont icon-tabbar-index"></i>
                	<p>口红</p>
	    		</a>
	    	</li>
	    	<li :class="{active: $route.path.indexOf('community') !== -1}" @click="gotoAddress({path: '/community'})">
	    		<a class="nav-itme">
	    			<i class="iconfont icon-tabbar-community"></i>
                	<p>口红社</p>
	    		</a>
	    	</li>
	    	<li :class="{active: $route.path.indexOf('point') !== -1}" @click="gotoAddress({path: '/pointUser'})">
	    		<a class="nav-itme">
	    			<i class="iconfont icon-tabbar-point"></i>
                    <p>积分</p>
	    		</a>
	    	</li>
	    	<li :class="{active: $route.path.indexOf('user') !== -1}" @click="gotoAddress({path: '/user'})">
	    		<a class="nav-itme">
	    			<i class="iconfont icon-tabbar-user"></i>
                	<p>个人中心</p>
	    		</a>
	    	</li>
	    </ul>
        <div class="shopcart pa">
            <a class="iconfont icon-fixed-shopcar pr" href="">
                <!-- <span class="cart-num" id="cart_num">0</span> -->
            </a>
        </div>
	</nav>
</template>

<script>
    export default {
    	data(){
            return{
                
            }
        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	}
        },
    }
</script>
<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';

    .footer-nav{
    	position: fixed;
    	background-color: #4c4c4c;
    	bottom: 0;
    	width: 100%;
    	@include fj('center');
    	@include remCalc('height', 60);
    	.nav-service{
    		@include fj('center');
    		flex-direction: column;
    		background-color: #fff;
    		@include remCalc('width', 66);
    		@include remCalc('padding', 13);
    		height: 100%;
    		i,p{
    			color: #000;
    		}
    	}
    	.item-list{
    		@include fj('center');
    		width: calc(100% - 66px);
    		text-align: center;
    		li{
    			width: 25%;
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
        }
    }
</style>