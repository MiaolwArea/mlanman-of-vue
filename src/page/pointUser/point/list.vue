<template>
	<div id="point-list" class="children-view">
		<div class="parent-page" v-show="isChildren">
			<head-top head-title="商品积分列表" go-back='true'></head-top>
			<section class="point-info tac">
				<p class="point-count fz16">当前积分：{{ integral }}</p>
				<p class="point-soon color-ft-a3">即将获得积分：{{ freezeIntegral }}</p>
				<div class="rate-border">
					<div class="rate-rouge" ref="rateRouge"></div>
				</div>
				<p class="point-progress fz14">你已经获得这支LANMAN口红的{{ percenNum }}%</p>
				<div class="rouge-box">
					<p class="tal color-ft-a3">当前可兑换口红数量：{{ goodsNum }}</p>
					<ul class="rouge-num clear">
						<li v-if="goodsNum" v-for="item in goodsNum" class="fl">
							<img src="http://image.lanman.cn/2016/m.lanman.cn/images/point/rouge.png" alt="">
						</li>
						<li v-if="!goodsNum" class="fl">
							<img src="http://image.lanman.cn/2016/m.lanman.cn/images/point/rouge_border_small.png" alt="">
						</li>
					</ul>
				</div>
				<router-link tag="a" :to="{path: '/pointUser'}" class="get-point-btn tac fz16 color-bg-gray">如何获得更多积分</router-link>
			</section>
			<section class="point-goods">
				<ul class="point-goods-list clear">
					<router-link tag="li" v-for="item in pointGoodsList" :key="item.id" :to="{path: '/pointUser/point/list/detail', query: {point_id: item.id}}" class="list-item">
						<img class="item-view" :src="item.outside_view">
	                    <p class="item-content fz14">{{ item.goods_name }}</p>
	                    <p class="item-pirce tal fz14">
	                    	<i class="iconfont fz14 color-ft-a3">&#xe61e;</i>
	                    	兑换积分：{{ item.point }}
	                    </p>
					</router-link>
				</ul>
			</section>
		</div>
		<!-- 兑换积分页 -->
        <transition name="router-children-slid">
            <router-view></router-view>
        </transition>
	</div>
</template>

<script>
    import { pointGoods } from '@/service/getData'
    import { mapState } from 'vuex'
    import headTop from '@/components/header/head'

    export default {
    	data(){
    		return {
    			isChildren: true,	// 是否有子路由
    			integral: 0,		// 积分数据
    			freezeIntegral: 0,	// 即将获得的积分
    			pointGoodsList: [],	// 积分兑换商品
    			percenNum: 0,		// 积分百分比
    			goodsNum: 0,		// 可兑换口红个数
    		}
    	},
    	computed: {
    		...mapState([
    			'userInfo'
			])
    	},
    	components: { headTop },
    	mounted(){
    		
    	},
    	methods: {
    		async initData(){
    			const _this = this;
    			let pointGoodsRes = await pointGoods()
    				, pointGoodsData = pointGoodsRes.data;

    			_this.integral = pointGoodsData.integral;
    			_this.freezeIntegral = pointGoodsData.freezeIntegral;
    			_this.pointGoodsList = pointGoodsData.pointGoodsList;
    			_this.percenNum = _this.integral % 100;
    			_this.goodsNum = parseInt(_this.integral / 100);

    			_this._countHeight();
    		},
    		_countHeight(){
    			let nowHeight = this.$refs.rateRouge.getBoundingClientRect().height;

    			this.$refs.rateRouge.style.paddingTop = (nowHeight * (1 - this.percenNum / 100)) + 'px';
    		},
    	},
    	watch: {
    		userInfo(val){
	            this.loginState = !this._isEmptyObject(val);
	            if (this.loginState) {
	                this.initData()
	            }
	        },
    		$route: function(to, from) {
		    	this.isChildren = !this.isChildren;
		    }
    	},
    }
</script>

<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';
	
	#point-list{ @include remCalc('padding', 20, 10); }
	.point-info{
		margin-top: strip-rem(30px);
		.point-count, .point-soon{
			margin-bottom: strip-rem(15px);
		}
		.rate-border{
			margin: 0 auto;
			background: url(~assets/images/point/rouge_border.png)center no-repeat;
			background-size: 100% 100%;
			height: strip-rem(300px);
			width: strip-rem(80px);
			.rate-rouge{
				width: 100%;
				height: 100%;
				background: url(~assets/images/point/rate_rouge.png) center no-repeat;
				background-size: 100% 100%;
				padding-top: strip-rem(300px);
				background-clip: content-box;
				transition: all 2s ease 0.5s;
			}
		}
		.point-progress{
			@include remCalc('padding', 15, 0, 30);
		}
		.rouge-num{
			img{
				width: strip-rem(20px);
				@include remCalc('padding', 10, 15);
			}
		}
        .get-point-btn{
            display: block;
            height: strip-rem(40px);
            line-height: strip-rem(40px);
            margin-bottom: strip-rem(40px);
        }
	}
    .router-children-slid-enter-active, .router-children-slid-leave-active {
        transition: all .4s;
    }
    .router-children-slid-enter, .router-children-slid-leave-active {
        transform: scale(2, 2);
        opacity: 0;
    }
</style>