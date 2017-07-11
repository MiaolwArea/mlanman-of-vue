<template>
	<div id="order-point-list" class="children-view">
		<head-top head-title="商品积分列表" go-back='true'></head-top>
		<section class="point-header" v-if="freezeIntegral == 0">
            <div class="blank-cont color-bg-gray">
                <img src="http://image.lanman.cn/2016/m.lanman.cn/images/blank/bg_order_blank.png">
                <p class="fz16 fw">您还未有积分</p>
            </div>
        </section>
        <section class="point-record" v-else>
            <ul class="record-list padd-all-1010">
                <li class="goods-item" v-for="item in recordList" :key="item.id">
                    <template v-if="item.type == 1">
                    <i class="iconfont icon-plus flex-order-0">&#xe622;</i>
                    <span class="point-info-integral fw fz14 flex-order-2">+{{ item.val }}</span>
                    </template>
                    <template v-else>
                    <i class="iconfont icon-minus flex-order-0">&#xe623;</i>
                    <span class="point-info-integral fw fz14 flex-order-2">-{{ item.val }}</span>
                    </template>
                    <div class="point-info-box flex-order-1">
                        <p class="fz14">{{ item.remark }}</p>
                        <p class="fz14">{{ item.add_time | formatDate('yyyy-MM-dd hh:mm:ss') }}</p>
                    </div>
                </li>
            </ul>
        </section>
        <loading v-show="isLoading_view"></loading>
	</div>
</template>

<script>
    import { orderPointList } from '@/service/getData'
    import { mapState } from 'vuex'
    import { formatDate } from '@/components/common/mixin'
    import headTop from '@/components/header/head'

    export default {
    	data(){
    		return {
    			point: 0,		    // 拥有积分
                freezeIntegral: 0,  // 将要获得积分
                recordList: null,   // 积分纪录
    		}
    	},
    	computed: {
    		...mapState({
                isLoading_view: state => state.loading.isLoading
            }),
            ...mapState([ 'userInfo' ]),
    	},
        components: { headTop },
        mixins: [ formatDate ],
    	mounted(){
    		// this.initData();
    	},
    	methods: {
    		async initData(){
                let _this = this;
    			let orderPointListRes = _this._ajaxDoSomething(await orderPointList()).data;

                _this.point = orderPointListRes.integral;
                _this.freezeIntegral = orderPointListRes.freezeIntegral;
                _this.recordList = orderPointListRes.listdata;
    		},
    	},
    	watch: {
    		userInfo(val){
                this.loginState = !this._isEmptyObject(val);
                if (this.loginState) {
                    this.initData()
                }
            }
    	},
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
    }
    .goods-item{
        @include fj(space-around);
        .point-info-box{
            line-height: 2;
        }
    }
</style>