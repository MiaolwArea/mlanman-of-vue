<template>
    <div id="goods-detial" class="footer-height">
    	<section class="goods-banner fz14">
    		<img :src="bannerPic" />
    		<div class="padding-all">
    			<h3>色号</h3>
	    		<div class="attr-list">
	    			<span>{{ colorName }}</span>
	    		</div>
    		</div>
    	</section>
    	<div class="divide-line"></div>
    	<section class="goods-info padding-all">
    		<h4 class="name fz16">{{ goodsName }}</h4>
    		<p class="desc fz14">{{ simpleDesc }}</p>
    		<p class="price fw fz16">¥{{ shopPrice }}</p>
    	</section>
    	<div class="divide-line"></div>
    	<section class="statement">
    		<div class="statement-box padding-all">
    			<span class="circular-small"></span>
    			<span class="statement-info fz14">七天无理由退换　全场包邮　安全检测</span>
    			<span class="circular-small"></span>
    		</div>
    	</section>
    	<div class="divide-line"></div>
    	<section class="tab-info-introduce">
    		<tab :line-width=2 active-color='#fff' defaultColor="#6f6f6f" v-model="index">
		        <tab-item class="vux-center" selected >商品详情</tab-item>
		        <tab-item class="vux-center" >用户评价</tab-item>
		    </tab>
		    <swiper 
		    	v-model="index" 
		    	:show-dots="false" 
		    	@on-index-change="onIndexChange">
		    	<swiper-item>
		    		<div class="tab-swiper vux-center">
		    			<div class="padding-all" ref="imgBox0">
			    			<img v-for="item in pictureDesc" :src="item" @load="successLoadImg" /> 
			    		</div>
		    		</div>
		    	</swiper-item>
		    	<swiper-item>
		    		<div class="tab-swiper vux-center">
		    			<div class="padding-all" ref="imgBox1">
			    			<ul class="comment-list">
			    				<li class="comment-item" v-for="item in commentList" :key="item.id">
			    					<div class="comment-header">
			    						<div class="avatar inline-block fz0">
			    							<img :src="item.avatar">
			    						</div>
			    						<div class="comment-info inline-block">
			    							<div class="info">
			    								<span>{{ item.user_name }}</span>
			    								<span class="fr">{{ item.buy_date | formatDate('yyyy-MM-dd') }}</span>
			    							</div>
			    							<ul class="star">
			    								<li class="iconfont star active inline-block fz14" v-for="starItem in item.star"></li>
			    							</ul>
			    						</div>
			    					</div>
			    					<div class="comment-body">
			    						<p class="fz14">{{ item.content }}</p>
			    					</div>
			    				</li>
			    			</ul>
			    			<div class="load-more tac fz16" @click="loadMore">加载更多</div>
			    		</div>
		    		</div>
		    	</swiper-item>
		    </swiper>
    	</section>
        <div class="divide-line"></div>
    	<section class="hot-goods">
    		<div class="hot-box padd-lr">
    			<h3 class="title fz14">大家最喜欢的LANMAN口红</h3>
    			<ul class="item-list fl">
    				<router-link tag="li" v-for="item in popularGoodsInfo" :key="item.order_id" :to="{path: 'goods', query: {id: item.order_id}}" class="list-item">
    					<img class="item-view" :src="item.outside_view">
	                    <p class="item-content fz14">{{ item.goods_name }}</p>
                        <p class="item-pirce tal fz14">¥{{ item.shop_price }}</p>
    				</router-link>	
    			</ul>
    		</div>
    	</section>
        <alert-tip :isShow="showAlert" @closeTip="showAlert = false" :isConfirm="false" @sureTip="sureTip" :alertText="alertText"></alert-tip>
        <footer-nav ref="footerNavObj"
            :class = "{scaleaction: isAdd}" 
            :isShopcart = "false" 
            :buyBtn = "true" 
            :cartText = "cartText" 
            :isCanJoin = "isCanJoin" 
            :cartNum = "cartNum"
            @joinCart = "joinCart"
            @joinOrder = "joinOrder"></footer-nav>   
    </div>
</template>

<script>
	import footerNav from '@/components/footer/footerNav'
    import alertTip from '@/components/common/alertTip'
    import { goodsDetial, popularGoods, commentList } from '@/service/getData'
    import { formatDate } from '@/components/common/mixin'
    import { mapState, mapMutations } from 'vuex'
    import { Tab, TabItem, Swiper, SwiperItem } from 'vux'

    /* 
     * 此页面切换标签用了动态计算滑动区块高度，来达到内容切换；
     * 注意：不建议使用动态高度！Swiper用固定高度最佳！
     * 页面虽然达到目的，不过是针对图片多情况实现的（主要针对图片多的情况，会造成加载延迟计算高端不准的解决方案）
    */

    var swiperDOM = null                // swiper的DOM
    	, firstListComment = null       // 缓存第一次获取的评论列表
    	, pictureAryLength = 0;			// 图片总数量

    const saleStatusMap = {
        0: "已下架",
        1: "加入购物车",
        2: "已售磐"
    }

    export default {
    	data(){
            return{
                showAlert: false,       // 是否显示弹窗
                alertText: null,        // 弹框文本内容
                qrcodeimgAry: [],       // 可选生成二维码图数组
                goodsId: null,			// 商品ID
                bannerPic: null,		// 头图
                colorName: null, 		// 色号
                goodsName: null,		// 商品名称
                simpleDesc: null,		// 商品介绍
                shopPrice: null,		// 商品价格
                pictureDesc: null,		// 商品详细介绍
                index: 0,				// 标签页索引值
                popularGoodsInfo: null,	// 热门商品列表	
                commentList: null,		// 评论列表
                cartText: null,         // 购物车按钮文本
                isCanJoin: true,        // 购物车按钮是否可点击样式
                cartNum: 0,             // 底部导航栏购物车商品数量
                isAdd: false,           // 是否执行购物车红点动画
            }
        },
        components: { footerNav, alertTip, Tab, TabItem, Swiper, SwiperItem },
        mixins: [ formatDate ],
        created(){
        	this.goodsId = this.$route.query.id;
            this.INIT_BUYCART();
        },
        mounted(){
            this.initData();
            // 计算加载完成图片数量
            this.countForImg = 1;
        },
        computed: {
            ...mapState([
                'cartList', 'userInfo'
            ])
        },
        methods: {
            ...mapMutations([
                'ADD_CART', 'INIT_BUYCART'
            ]),
            // 初始化数据
            async initData(){
                const _this = this;

            	// 获取商品详情
                let goodsDetialRes = await goodsDetial(_this.goodsId)
                	, goodsDetialInfo = goodsDetialRes.data;

                _this.orderId = goodsDetialInfo.order_id;
            	_this.bannerPic = goodsDetialInfo.outside_view;
            	_this.colorName = goodsDetialInfo.color_name;
            	_this.goodsName = goodsDetialInfo.goods_name;
            	_this.simpleDesc = goodsDetialInfo.simple_desc;
            	_this.shopPrice = goodsDetialInfo.shop_price;
            	_this.pictureDesc = goodsDetialInfo.picture_desc;
            	_this.commentList = goodsDetialInfo.commentList;
                _this.cartText = saleStatusMap[goodsDetialInfo.saleStatus];
                if(goodsDetialInfo.saleStatus != 1){
                    _this.isCanJoin = false;
                }

            	firstListComment = goodsDetialInfo.commentList;
            	pictureAryLength = _this.pictureDesc.length;

                // 获取热门商品
                let popularGoodsRes = await popularGoods();
                
                _this.popularGoodsInfo = popularGoodsRes.data;

                _this._initCartNum();
            },
            // 计算购物车商品数目
            _initCartNum(){
                Object.keys(this.cartList).forEach(itemid => {
                    let goodsInfo = this.cartList[itemid];

                    this.cartNum += goodsInfo.num;
                })
            },
            // 计算区块高度
            successLoadImg(){
            	this.countForImg++;
            	if(this.countForImg == pictureAryLength){
            		swiperDOM = document.querySelectorAll("div[class='vux-swiper']")[0];
            		swiperDOM.style.cssText = 'overflow: scroll;';
            		swiperDOM.style.height = `${this.$refs.imgBox0.clientHeight}px`;
            	}
            },
            // 滑动内容区块重新计算高度
            onIndexChange(index){
            	if(index == 0){
            		this.commentList = firstListComment;
            		swiperDOM.style.height = `${this.$refs.imgBox0.clientHeight}px`;
            	}else{
            		swiperDOM.style.height = `${this.$refs.imgBox1.clientHeight}px`;
            	}
            },
            async loadMore(){
            	// 获取热门商品
                let commentListRes = await commentList();
                
                this.commentList = this.commentList.concat(commentListRes.data);
            },
            // 加入购物车
            joinCart(){
                const _this = this;

                // 判断是否允许点击
                if(!_this.isCanJoin){
                    return;
                }
                if (!_this.loginState) {
                    _this.ADD_CART({shopId: _this.orderId, shopPrice: _this.shopPrice, goodsName: _this.goodsName, colorName: _this.color_name, shopPic: _this.bannerPic });
                }else{
                    // 存到后端API地址中
                }
                _this.cartNum++;
            },
            // 立即下单
            joinOrder(url){
                if (!this.loginState) {
                    this.showAlert = true;
                    this.alertText = `(≖ ‿ ≖)✧你还没登入，登入知晓更多福利哦～`;
                    return;
                }
                // TODO 下单业务逻辑 ...
                this.$router.push(url);
            },
            sureTip(){
                this.$router.push('/user/login');
            }
        },
        watch: {
            userInfo(val){
                this.loginState = !this._isEmptyObject(val);
            },
            // 购物车数量变化执行动画
            cartNum(){
                const _this = this;

                _this.isAdd = true;
                _this.$refs.footerNavObj.$el.addEventListener("animationend", e => {
                    _this.isAdd = false;
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';

	.vux-tab{
		background-color: #000;
		height: strip-rem(45px);
	}
	.padding-all{
		@include remCalc('padding', 10, 10, 15);
	}
	.circular-small{
		background-color: #808080;
		@include wh(5px, 5px);
		border-radius: 5px;
	}
	.statement-box{
		@include fj(center);
		.statement-info{
			@include remCalc('padding', 0, 5);
		}
	}
	.goods-info{
		.desc{
			@include remCalc('padding', 10, 0);
		}
	}
	.hot-goods{
		overflow: hidden;
		.title{
            @include remCalc('margin', 15, auto);
        }
	}
    .attr-list{
    	span{
    		display: inline-block;
    		text-align: center;
    		@include remCalc('padding', 10, 5);
    		margin-top: strip-rem(10px);
    		background-color: #808080;
    	}
    }
    .comment-header{
    	margin-bottom: strip-rem(10px);
    }
    .comment-body{
    	margin-bottom: strip-rem(15px);
    	p{
    		color: #909090;
    	}
    }
    .comment-list{
    	.avatar{
    		width: strip-rem(35px);
    		img{
    			border-radius: 50%;
    		}
    	}
    	.comment-info{
    		line-height: 1.5;
    		vertical-align: top;
    		margin-left: strip-rem(5px);
    		width: calc(100% - #{strip-rem(45px)});
    	}
    	.star.active:after {content: "\e635"}
    }
    .load-more{
		color: #909090;
    }
</style>