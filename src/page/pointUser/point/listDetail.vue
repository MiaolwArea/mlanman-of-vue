<template>
	<div id="point-goods-detail" class="children-view">
		<div class="goods-detail-box">
			<section class="goods-info" ref="goodsInfoDOM">
				<router-link tag="p" class="get-point fz14 fw tac" :to="{path: '/pointUser'}">如何获得更多积分</router-link>
				<img :src="picView">
				<p class="fz16 fw padd-all-2010">{{ title }}</p>
				<div class="point-box lr-col">
					<div class="need-point col-5 tac fz14">
						<p class="color-ft-a3">所需积分</p>
						<p class="fz16 fw">{{ point }}</p>
					</div>
					<div class="point-limit col-5 tac fz14">
						<p class="color-ft-a3">价值 ¥{{ price }}</p>
						<p class="color-ft-a3">限量{{ stock }}件</p>
					</div>
				</div>
				<div class="point-exchange-box color-bg-gray">
					<a class="exchange tac fz16" @click="exchange">{{ btninfo }}</a>
				</div>
			</section>
			<section class="goodes-description">
				<div class="fz0">
					<img :src="item" v-for="item in pointGoodsArr">
				</div>
			</section>
		</div>
		<div class="point-exchange-box tac fixed" :class="isShowBtn ? 'show' : 'hide'" @click="exchange">
			<a class="exchange fz16">{{ btninfo }}</a>
		</div>
        <alert-tip :isShow="showAlert" :confirmModel="2" @isShowAuto="isShowAuto" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
    import { pointGoodsDetail } from '@/service/getData'
    import alertTip from '@/components/common/alertTip'
    import { mapState } from 'vuex'

    let isBeginExchange = true;
    
    export default {
    	data(){
    		return {
    			pointGoodsArr: [],		// 商品介绍
    			isShowBtn: false,		// 是否显示底部兑换按钮
    			title: null,			// 商品名称
    			picView: null,			// 商品图片
    			point: null,			// 所需积分
    			price: null,			// 商品价格
    			stock: null,			// 商品库存
    			btninfo: "",			// 兑换按钮文本信息
                showAlert: false,       // 是否显示弹窗
                alertText: '',          // 弹窗内容
    		}
    	},
    	compute: {
    		...mapState([
    			'userInfo'
			])
    	},
    	mounted(){
    		
    	},
        components: { alertTip },
    	methods: {
    		async initData(){
    			const _this = this;
    			let pointGoodsDetailRes = await pointGoodsDetail(this.userInfo)
    				, goodsInfo = pointGoodsDetailRes.data;

                _this.orderId = goodsInfo.order_id;
    			_this.title = goodsInfo.goods_name;
    			_this.pointGoodsArr = goodsInfo.picture_desc;
    			_this.picView = goodsInfo.outside_view;
    			_this.point = goodsInfo.point;
    			_this.price = goodsInfo.price;
    			_this.stock = goodsInfo.stock;

    			_this._scrollAction();
    			_this._checkOutTime(goodsInfo.start_time, goodsInfo.end_time);
    		},
    		_scrollAction(){
    			var _this = this;
    			window.addEventListener('scroll', this._scrollHandler, false);
    		},
    		_scrollHandler: function(){
				// let scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
    			let scrollTop = window.scrollY;
    			if(!isBeginExchange){
    				return;
    			}
    			try{
    				if(scrollTop > this.$refs.goodsInfoDOM.clientHeight){
    					this.isShowBtn = true;
    				}else{
    					this.isShowBtn = false;
    				}
    			}catch(err){
                    // 如果用了transition, 可以用@after-leave="unbind"钩子解除绑定，具体参考官网：过渡效果
    				window.removeEventListener('scroll', this._scrollHandler, false);
    			}
    		},
    		_checkOutTime(start, end){
    			let nowTime = Math.round(new Date().getTime()/1000)
    			    , isStarted = Math.ceil((start - nowTime)/3600/24)
    			    , isOver = Math.ceil((end - nowTime)/3600/24);

    			if(isStarted > 0){
    				this.btnInfo = "尚未开始";
    				isBeginExchange = false;
    			}else if(isStarted <= 0){
    				this.btninfo = "立即兑换";
    			}
    			if(isOver <= 0){
    				this.btninfo = "已经结束"
    				isBeginExchange = false;
    			}
    		},
    		async exchange(){
    			// let exchangeGoodsRes = await exchangeGoods(this.userInfo, this.orderId);
                this.showAlert = true;
                this.alertText = '兑换成功！'
    		},
            isShowAuto(data){
                this.showAlert = false;
            }
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
	
	.goods-detail-box{ padding-bottom: strip-rem(40px); }
	.goods-info{
		.point-box{
			padding-bottom: strip-rem(10px);
		}
		.get-point{
			@include remCalc('padding', 20, 15);
		}
		.point-exchange-box{
			@include remCalc('padding', 20, 15);
			.exchange{
			    display: block;
			    height: strip-rem(40px);
			    line-height: strip-rem(40px);
			    background-color: #000;
			}
		}
	}
	.point-exchange-box.fixed{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: strip-rem(40px);
		line-height: strip-rem(40px);
		background-color: #000;
	}
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: scale(2, 2);
        opacity: 0;
    }
</style>