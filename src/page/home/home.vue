<template>
  <div id="home" class="footer-height">
    <section class="top-logo">
    	<div class="small-logo" @click="showChangeBlock = true">
    		<img src="~assets/images/common/small_logo.png" />
    		<span class="fz14">关注公众号</span>
    	</div>
    	<div class="slogn">
    		<a href="javascript:void(0);">
    			<img src="~assets/images/common/slogn.png" alt="">
    		</a>
    	</div>
    </section>
    <section class="news">
    	<a :href="news.link_to">
    		<p class="news-title"><span>{{ news.title }}</span></p>
    	</a>
    	<video id="news_video" preload="none" src="http://apps.mushu.cn/lanman_20161205.mp4" poster=""></video>
    </section>
    <section class="lr-col fz14 lr-info">
    	<div class="col-6">
    		<p>免费获得4支口红，我是怎么做到的？</p>
    	</div>
    	<div class="col-4 tar">
    		<a class="link-known" href="http://mp.weixin.qq.com/s?__biz=MzI0NjUwOTEzNA==&mid=2247484274&idx=1&sn=db8fe78700a35a5100f155f81a9d9d20&chksm=e9bf7853dec8f145afe50c8f5787449fdb235c12adddff3e98d224054e2153f8a1987c092893#rd">了解代言人模式</a>
    	</div>
    </section>
    <section class="new-goods">
    	<h2 class="section-title fz16"><font class="iconfont icon-title-embellish"></font>当季新品</h2>
    	<ul class="padd-lr">
            <router-link v-for="item in newGoodsListArr" :key="item.order_id" :to="{path: 'goods', query: {id: item.order_id}}" tag="li">
                <img :src="item.img_url">
            </router-link>
        </ul>
    </section>
    <section class="lr-col fz14 lr-info">
        <div class="col-6">
            <span class="iconfont icon-newGoods-schedule"></span>
            {{ onLineInfo }}
        </div>
        <div class="col-4 tar">
            <a class="link-known" @click="subRemind">{{ reminderTxt }}</a>
        </div>
    </section>
    <section class="introduce-area">
        <div class="user-avatar" v-show="avatar">
            <img :src="avatar">
        </div>
    	<div class="introduce-box tac fz14">
    		<div class="introduce-header">
    			<label class="select-type">肤质：</label>
                <span>
                    <input type="radio" name="skin" id="skinA" value="1" v-model="skin">
                    <label for="skinA">偏白</label>
                </span>
                <span>
                    <input type="radio" name="skin" id="skinB" value="2" v-model="skin">
                    <label for="skinB">偏黄</label>
                </span>
                <span>
                    <input type="radio" name="skin" id="skinC" value="3" v-model="skin">
                    <label for="skinC">偏黑</label>
                </span>
    		</div>
    		<div class="introduce-footer">
    			<label class="select-type">场合：</label>
                <span>
                    <input type="checkbox" id="sceneA" value="13" v-model="scene">
                    <label for="sceneA">约会</label>
                </span>
                <span>
                    <input type="checkbox" id="sceneB" value="11" v-model="scene">
                    <label for="sceneB">休闲</label>
                </span>
                <span>
                    <input type="checkbox" id="sceneC" value="12" v-model="scene">
                    <label for="sceneC">通勤</label>
                </span>
    		</div>
    	</div>
    	<a class="setting-confirm" @click="screen">推荐适合的口红</a>
    </section>
    <hr class="divide-line">
    <section class="new-goods">
    	<h2 class="section-title fz16"><font class="iconfont icon-title-embellish"></font>全部商品</h2>
    	<ul class="goods-list" v-load-more="loaderMore" type="1">
            <li class="goods-item" v-for="item in goodsListArr" :key="item.order_id">
                <router-link :to="{path: 'goods', query: {id: item.order_id}}" tag="a" class="padd-lr">
                    <img class="item-view" :src="item.outside_view">
                    <p class="item-content fz14">{{ item.goods_name }}</p>
                    <div class="item-p-c">
                        <p class="item-pirce tar fz14">¥{{ item.shop_price }}</p>
                        <p class="item-comment">{{ item.cmt_count }}条评价</p>
                    </div>
                </router-link>
                <div class="item-footer lr-col padd-lr fz14">
                    <div class="goods-property col-6">
                        <p>适合肤质：<span>{{ item.skin }}</span></p>
                        <p>推荐场景：<span>{{ item.scenes }}</span></p>
                    </div>
                    <router-link :to="{path: 'goods', query: {id: item.order_id}}" tag="a" class="col-4 btn-buy tac">立即购买</router-link>
                </div>
            </li>
        </ul>
    </section>
    <section class="after-sale-service">
	    <img src="~assets/images/home/service.png">
	</section>
    <hr class="divide-line">
    <!-- 关注公众号弹窗 -->
    <transition name="fade">
        <div class="specs_cover" @click="showChangeBlock = false" v-if="showChangeBlock"></div>
    </transition>
    <transition name="fadeBounce">
        <div class="specs_list" v-show="showChangeBlock">
            <header class="specs_list_header">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1"class="specs_cancel" @click="showChangeBlock = false">
                    <line x1="0" y1="0" x2="16" y2="16"  stroke="#666" stroke-width="1.2"/>
                    <line x1="0" y1="16" x2="16" y2="0"  stroke="#666" stroke-width="1.2"/>
                </svg>
            </header>
            <section class="specs_details">
                <div class="pic-box">
                    <img src="http://image.lanman.cn/2016/m.lanman.cn/images/index/qrcode.png" />
                </div>
            </section>
            <footer class="specs_footer">
                <p class="fz16">确认</p>
            </footer>
        </div>
    </transition>
    <alert-tip :isShow="showAlert" @closeTip="showAlert = false" :isConfirm="false" @sureTip="sureTip" :alertText="alertText"></alert-tip>
    <loading v-show="isLoading"></loading>
    <footer-bottom></footer-bottom>		
  	<footer-nav></footer-nav>
  </div>
</template>

<script>
import footerBottom from '@/components/footer/footer'
import footerNav from '@/components/footer/footerNav'
import { allGoodsList, newGoodsList, home, addsubscribe } from '@/service/getData'
import { loadMore } from '@/components/common/mixin'
import alertTip from '@/components/common/alertTip'
import { mapState } from 'vuex'
import { mVerification } from '@/components/common/mixin'

const reminderMap = {"1": "已订阅提醒", "0": "订阅新品提醒"};

export default {
    // TODO 立即购买、购物车、订阅提醒都要登录验证
	data() {
		return{
            avatar: '',             // 用户头像
            counts: 0,              // 单次请求商品数目
            showAlert: false,       // 是否显示弹窗
            alertText: null,        // 弹框文本内容
            goodsListArr: null,     // 全部商品列表
            newGoodsListArr: null,  // 当季新品列表
            totalNum: 0,            // 商品总数
            reminderTxt: reminderMap[0],      // 订阅按钮文本
            skin: '',               // 肤质
            scene: [],              // 场合
            showChangeBlock: false, // 是否显示关注公众号弹框
            news: {},               // 外链信息
            onLineInfo: null,       // 上线时间
        }
	},
    components: {
        footerBottom,
        footerNav,
        alertTip,
    },
    mixins: [ loadMore, mVerification ],
    mounted: function(){
        this.initData();
    },
    computed: {
        ...mapState({
            isLoading: state => state.loading.isLoading
        }),
        ...mapState([ 'userInfo' ]),
    },
    methods: {
        // 初始化获取数据
        async initData(){
            const _this = this;
            let newGoodsListRes = await newGoodsList();
            _this.newGoodsListArr = newGoodsListRes.data;

            let res = await allGoodsList(_this.counts, _this.skin || null, _this.scene.length != 0 ? _this.scene : null);
            let resData = res.data.info;

            _this.totalNum = res.data.total;
            _this.goodsListArr = [...resData];
            // 根据是否登入判断是否开启提醒，无登入默认未提醒
            if(_this.loginState){
                _this.reminderTxt = reminderMap[_this.userInfo.subscribe];
                _this.avatar = _this.userInfo.avatar;
            }
            
            let homeRes = await home();
            _this.news = homeRes.data.news;
            _this._onLineTimeOfDay(homeRes.data.newGoodsOnline);
        },
        _onLineTimeOfDay(onLineTime){
            let nowTime = Math.round(new Date().getTime()/1000)
                , onLineDay = Math.ceil((onLineTime - nowTime)/3600/24);

            if(onLineDay > 0){
                this.onLineInfo = `距离下次新品发布还有${onLineDay}天`
            }else if(onLineDay == 0){
                this.onLineInfo = "LANMAN烂熳新品今日上线！"
            }else if(onLineDay < 0){
                this.onLineInfo = "LANMAN烂熳本季新品上线了！"
            }
        },
        // 到达底部加载更多数据
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
            
            let res = _this._ajaxDoSomething(await allGoodsList(_this.counts, _this.skin || null, _this.scene.length != 0 ? _this.scene : null));
            let resData = res.data.info;

            _this.goodsListArr = [..._this.goodsListArr, ...resData];
            //当获取数据小于总数，说明没有更多数据，不需要再次请求数据
            if (resData.length >= _this.totalNum) {
                _this.touchend = true;
                return
            }
            _this.preventRepeatReuqest = false;
        },
        // 订阅提醒
        subRemind(){
            this.showAlert = true;
            this._verification();
            this.alertText = "有新品上市，您将会收到公众号推送的消息";
        },
        async sureTip(){
            if(!this.loginState){
                this.showAlert = false;
                this.$router.push('/user/login');
                return;
            }
            let addsubscribeRes = this._ajaxDoSomething(await addsubscribe());
            this.reminderTxt = reminderMap[addsubscribeRes.data.subscribe];
            this.showAlert = false;
        },
        // 口红推荐
        async screen(){
            this.counts = 0;
            let res = this._ajaxDoSomething(await allGoodsList(this.counts, this.skin, this.scene));
            let resData = res.data.info;

            this.goodsListArr = [...this.goodsListArr, ...resData];
        }, 
    },
    watch: {
        userInfo(val){
            this.loginState = !this._isEmptyObject(val);
        }
    },
}
</script>

<style lang="scss" scoped>	
    @import '~assets/style/mixin.scss';

	.small-logo{
		@include fj('flex-start');
		@include remCalc('padding', 10);
		img{
			@include remCalc('height', 30);
			@include remCalc('width', 30);
			@include remCalc('margin-right', 10);
		}
	}
	.news a{
		display: block;
		@include remCalc('margin', 15);
		.news-title{ 
			@include remCalc('font-size', $newsFZ);
			position: relative;
			> span{
				@include remCalc('padding-left', 10);
			}
			&:before{
				@include remCalc('border', 5, 'solid', 'transparent');
				@include remCalc('border-left', 5, 'solid', '#fff');
				width: 0;
				height: 0;
				@include remCalc('top', $newsFZ / 3);
				position: absolute;
				content: '';
			}
		}
	}
	#news_video{
		width: 100%;
		height: 100%;
	}
	.new-goods{
		.section-title{
			@include remCalc('padding', 15, 15);
		}
        .item-footer{
            margin-top: strip-rem(10px);
        }
        .item-p-c{
            @include fj();
        }
        .goods-property{
            p{
                color: #747474;
                &+p{
                    margin-top: strip-rem(10px);
                }
            }
        }
	}
	.introduce-area{
		@include remCalc('padding', 10);
        .user-avatar{
            width: strip-rem(80px);
        }
	}
	.introduce-box{
		@include remCalc('padding', 20, 0);
		.introduce-header{
			@include remCalc('margin-bottom', 15);
		}
		span{
			@include remCalc('margin-left', 20);
		}
	}
	.setting-confirm{
	    display: block;
	    width: 100%;
	    background-color: #999;
	    color: #000;
	    text-align: center;
	    @include remCalc('font-size', $newsFZ);
	    @include remCalc('line-height', 41);
	}
	.after-sale-service{
		@include remCalc('margin', 20, 15, 15, 25);
	}
    .specs_list{
        width: 80%;
        left: 10%;
    }
</style>
