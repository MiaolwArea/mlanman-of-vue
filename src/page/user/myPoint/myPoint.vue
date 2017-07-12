<template>
	<div id="my-point" class="footer-height">
		<section class="point-header color-bg-gray">
            <div class="point-icon tac">
                <i class="iconfont">&#xe621;</i>
            </div>
            <div class="point-integral">
                <p class="fz14">可用积分: {{ point }}</p>
                <router-link tag="p" :to="{path: '/user/myPoint/orderPointList'}" class="fz14">即将获得订单积分: {{ freezeIntegral }}<i class="iconfont"> &#xe60e;</i></router-link>
            </div>
        </section>
        <section class="point-record">
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
        <footer-nav :isShopcart="false"></footer-nav> 
        <transition name="lf-slid">
            <router-view></router-view>
        </transition>
	</div>
</template>

<script>
    import { myPoint } from '@/service/getData'
    import { mapState, mapGetters } from 'vuex'
    import footerNav from '@/components/footer/footerNav'
    import { formatDate } from '@/components/common/mixin'

    export default {
    	data(){
    		return {
    			point: 0,		    // 拥有积分
                freezeIntegral: 0,  // 将要获得积分
                recordList: null,   // 积分纪录
    		}
    	},
    	computed: {
    		...mapGetters([ 'isLoading' ]),
            ...mapState([ 'userInfo' ]),
    	},
        components: {
            footerNav,
        },
        mixins: [ formatDate ],
    	mounted(){
            
    	},
    	methods: {
    		async initData(){
                let _this = this;
    			let myPointRes = _this._ajaxDoSomething(await myPoint()).data;

                _this.point = myPointRes.integral;
                _this.freezeIntegral = myPointRes.freezeIntegral;
                _this.recordList = myPointRes.listdata;
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
	
	.point-header{
        @include remCalc('padding', 20, 15);
        @include fj(left);
        .point-icon{
            background-color: #838383;
            border-radius: 50%;
            width: strip-rem(50px);
            height: strip-rem(50px);
            i{
                font-size: strip-rem(24px);
                line-height: 2;
            }
        }
        .point-integral{
            margin-left: strip-rem(10px);
            line-height: 1.5;
            i{
                vertical-align: middle;
            }
        }
    }
    .goods-item{
        @include fj(space-around);
        .point-info-box{
            line-height: 2;
        }
    }
</style>