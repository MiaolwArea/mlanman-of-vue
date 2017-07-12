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
            <section class="order-list-warp padd-all-1010">
                <ul class="lits-box" v-load-more="loaderMore" type="1">
                    <li class="goods-list padd10" v-for="item in orderList" :key="item.order_id">
                        <div class="header lr-col fz14">
                            <div class="order-status color-ft-a3">订单状态：<span>{{ orderStatus[item.order_states].status }}</span></div>
                            <div class="order-date color-ft-a3">{{ item.add_time | formatDate('yyyy.MM.dd') }}</div>
                        </div>
                        <div class="container">
                            <ul class="goods-list">
                                <router-link tag="li" v-for="childrenItem in item.goods" :key="childrenItem.id" :to="{path: '/goods', query: {id: childrenItem.id}}" class="goods-item lr-col" >
                                    <div class="order-my-pic">
                                        <img :src="childrenItem.outside_view"/>
                                    </div>
                                    <div class="order-goods-info">
                                        <p class="fz14 color-ft-a3">{{ childrenItem.goods_name }}</p>
                                        <p class="fz14 color-ft-a3">{{ childrenItem.color_name }}</p>
                                        <p class="fz14 color-ft-a3">数量：{{ childrenItem.num }}</p>
                                    </div>
                                    <p class="fz14">¥{{ childrenItem.shop_price | subNumber }}</p>
                                </router-link>
                            </ul>
                        </div>
                        <div class="footer lr-col">
                            <div class="col-5">
                                <p class="fz14 color-ft-a3">数量：{{ item.count_num }}</p>
                                <p class="fz14 color-ft-a3">订单金额：{{ item.count_price }}</p>
                            </div>
                            <div class="contact">
                                <router-link :to="{path: ''}" class="contact-btn color-ft-a3">{{ orderStatus[item.order_states].btnTxt }}</router-link>
                            </div>
                        </div>
                        <div class="divide-line"></div>
                    </li>
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
import { loadMore } from '@/components/common/mixin'
import { formatDate, subNumber } from '@/components/common/mixin'
// TODO 1、总列表和内部 限制个数，加载更多；2、暂无下单功能，所以无待付款状态
    export default {
    	data(){
            return{
	            showAlert: false,           // 是否显示弹窗
                alertText: null,            // 弹框文本内容
                orderList: [],
                counts: 0,              // 单次请求商品数目
                orderStatus: {
                    1: {
                        status: '已完成',
                        btnTxt: '申请售后'
                    },
                    2: {
                        status: '待付款',
                        btnTxt: '去付款'
                    }
                }
            }
        },
        components: {
        	headTop,
            alertTip,
        },
        mixins: [ formatDate, subNumber, loadMore ],
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
                let getOrderListRes = this._ajaxDoSomething(await getOrderList()).data;

                this.orderList = getOrderListRes.info;
                this.totalNum = getOrderListRes.total;
        	},
        	sureTip(){
                this.$router.go(-1);
        	},
            // 到达底部加载更多数据(自动)
            async loaderMore(){
                const _this = this;
                if (_this.touchend) {
                    return
                }
                //防止重复请求
                if (_this.preventRepeatReuqest) {
                    return 
                }
                _this.preventRepeatReuqest = true;

                //数据每次显示3条
                _this.counts += 3;
                
                let res = _this._ajaxDoSomething(await getOrderList());
                let resData = res.data.info;

                _this.orderList = [..._this.orderList, ...resData];
                //当获取数据小于总数，说明没有更多数据，不需要再次请求数据
                if (resData.length >= _this.totalNum) {
                    _this.touchend = true;
                    return
                }
                _this.preventRepeatReuqest = false;
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

    .padd10{ padding: strip-rem(10px) 0; }
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
    .order-my-pic{
        @include wh(70px, 70px);
    }
    .order-goods-info{
        margin-left: strip-rem(10px);
    }
    .goods-list{
        .footer{
            padding: strip-rem(10px) 0;
            .contact-btn{
                @include remCalc('padding', 5, 10);
                border: 1px solid #a3a3a3;
            }
        }
        .divide-line{
            height: strip-rem(5px);
        }
    }
    
</style>