<template>
<transition name="lf-slid" mode="out-in">
	<div id="order-list" class="header-height children-view">
		<head-top head-title="订单列表" go-back='true'></head-top>
		<template v-if="orderList.length == 0">
            <div class="blank-cont color-bg-gray">
                <img src="~assets/images/user/order/bg_order_blank.png">
                <p class="fz16 fw">您还没有订单</p>
                <router-link class="fz14 link-home" :to="{path: '/home'}">去逛逛 ></router-link>
            </div>
        </template>
        <template v-else>
            <section class="order-list-warp">
                <ul class="lits-box">
                    <li class="goods-list" v-for="item in orderList" :key="item.order_id"></li>
                </ul>
            </section>
        </template>
		<loading v-show="isLoading"></loading>
		<alert-tip :isShow="showAlert" @closeTip="showAlert = false" @sureTip="sureTip" :alertText="alertText"></alert-tip>
	</div>
</transition>
</template>

<script>
import headTop from '@/components/header/head'
import { getOrderList } from '@/service/getData'
import { mapState, mapGetters } from 'vuex'
import alertTip from '@/components/common/alertTip'

    export default {
    	data(){
            return{
	            showAlert: false,           // 是否显示弹窗
                alertText: null,            // 弹框文本内容
                orderList: [],
            }
        },
        components: {
        	headTop,
            alertTip,
        },
        mounted(){
            
        },
        computed: {
	        ...mapGetters([ 'isLoading' ]),
        	...mapState([
        		'userInfo',
    		]),
        },
        methods: {
        	async initData(){
                let getOrderListRes = this._ajaxDoSomething(await getOrderList());

                this.orderList = getOrderListRes.data;
        	},
        	sureTip(){
                this.$router.go(-1);
        	},
        },
        watch: {
        	userInfo(val){
        	    this.loginState = !this._isEmptyObject(val);
        	    if (this.loginState) {
        	        this.initData()
        	    }
        	}
        }
    }
</script>
<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';

    .blank-cont{
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: 0 auto;
        z-index: -1;
        @include fj($type: center, $direction: column);
        img{
            width: strip-rem(80px);
            margin-bottom: strip-rem(10px);
        }
        .link-home{
            color: red;
            margin-top: strip-rem(10px);
        }
    }
</style>