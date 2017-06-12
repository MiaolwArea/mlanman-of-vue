<template>
  <div id="home">
    <section class="top-logo">
    	<div class="small-logo">
    		<img src="~assets/images/common/small_logo.png" />
    		<span class="fz14">关注公众号</span>
    	</div>
    	<div class="slogn">
    		<a href="">
    			<img src="~assets/images/common/slogn.png" alt="">
    		</a>
    	</div>
    </section>
    <section class="news">
    	<a href="https://mp.weixin.qq.com/s?__biz=MzI0NjUwOTEzNA==&mid=2247485512&idx=1&sn=fb96ed05e42fa393c7a83ffafca54f7d&chksm=e9bf7369dec8fa7fe55f52feaf50a87ad99e309a1c9bec3114e07298bcfc1f951da1320e2e63#rd">
    		<p class="news-title"><span>LANMAN烂熳天使之吻水润唇膏上市</span></p>
    	</a>
    	<video id="news_video" preload="none" src="http://apps.mushu.cn/lanman_20161205.mp4" poster=""></video>
    </section>
    <section class="lr-col fz14 lr-info">
    	<div class="col-6">
    		<p>免费获得4支口红，我是怎么做到的？</p>
    	</div>
    	<div class="col-4 tar">
    		<a class="link-known" href="">了解代言人模式</a>
    	</div>
    </section>
    <section class="new-goods">
    	<h2 class="section-title fz16"><font class="iconfont icon-title-embellish"></font>当季新品</h2>
    	<ul class="padd-lr">
            <li>
                <a href="http://m.lanman.cn/sp/49.html"><img src="http://image.lanman.cn/2017/05/18/c62ec58205415801ca555794c01a285c.jpg"></a>
            </li>
        </ul>
    </section>
    <section class="lr-col fz14 lr-info">
        <div class="col-6">
            <span class="iconfont icon-newGoods-schedule"></span>
            LANMAN烂熳本季新品上线了！
        </div>
        <div class="col-4 tar">
            <a class="link-known" href="">订阅新品提醒</a>
        </div>
    </section>
    <section class="introduce-area">
        <div class="user-avatar">
            <img src="http://image.lanman.cn/2017/05/09/8d0714d67537db87fdc67c967166ceed.jpg">
        </div>
    	<div class="introduce-box tac fz14">
    		<div class="introduce-header">
    			<label class="select-type">肤质：</label>
                <span>
                    <input type="radio" name="skin" id="skinA" value="1">
                    <label for="skinA">偏白</label>
                </span>
                <span>
                    <input type="radio" name="skin" id="skinB" value="2">
                    <label for="skinB">偏黄</label>
                </span>
                <span>
                    <input type="radio" name="skin" id="skinC" value="3">
                    <label for="skinC">偏黑</label>
                </span>
    		</div>
    		<div class="introduce-footer">
    			<label class="select-type">想要：</label>
                <span>
                    <input type="checkbox" name="scene" id="sceneA" value="13">
                    <label for="sceneA">约会</label>
                </span>
                <span>
                    <input type="checkbox" name="scene" id="sceneB" value="11">
                    <label for="sceneB">休闲</label>
                </span>
                <span>
                    <input type="checkbox" name="scene" id="sceneC" value="12">
                    <label for="sceneC">通勤</label>
                </span>
    		</div>
    	</div>
    	<a class="setting-confirm" href="javascript:void(0)">推荐适合的口红</a>
    </section>
    <hr class="divide-line">
    <section class="new-goods">
    	<h2 class="section-title fz16"><font class="iconfont icon-title-embellish"></font>全部商品</h2>
    	<ul class="goods-list" v-load-more="loaderMore">
            <li class="goods-item">
                <a class="padd-lr" href="">
                    <img class="item-view" src="http://image.lanman.cn/2017/04/06/9707a8c0487e36f823a1f60fbaea3a7f.jpg">
                    <p class="item-content fz14">LANMAN #104 巧克力初心系列-摩洛哥王妃</p>
                    <div class="item-p-c">
                        <p class="item-pirce tar fz14">¥120.00</p>
                        <p class="item-comment">11条评价</p>
                    </div>
                </a>
                <div class="item-footer lr-col padd-lr fz14">
                    <div class="goods-property col-6">
                        <p>适合肤质：<span>偏白、偏黄、偏黑</span></p>
                        <p>推荐场景：<span>休闲、通勤、约会</span></p>
                    </div>
                    <a href="" class="col-4 btn-buy tac">立即购买</a>
                </div>
            </li>
            <li class="goods-item">
                <a class="padd-lr" href="">
                    <img class="item-view" src="http://image.lanman.cn/2017/02/28/58e14c1483492b375c49e8fca85cefa5.jpg">
                    <p class="item-content fz14">LANMAN #104 巧克力初心系列-摩洛哥王妃</p>
                    <div class="item-p-c">
                        <p class="item-pirce tar fz14">¥120.00</p>
                        <p class="item-comment">11条评价</p>
                    </div>
                </a>
                <div class="item-footer lr-col padd-lr fz14">
                    <div class="goods-property col-6">
                        <p>适合肤质：<span>偏白、偏黄、偏黑</span></p>
                        <p>推荐场景：<span>休闲、通勤、约会</span></p>
                    </div>
                    <a href="" class="col-4 btn-buy tac">立即购买</a>
                </div>
            </li>
            <li class="goods-item">
                <a class="padd-lr" href="">
                    <img class="item-view" src="http://image.lanman.cn/2017/02/09/8a8909dfbcb7facce12678c69eb5552b.jpg">
                    <p class="item-content fz14">LANMAN #104 巧克力初心系列-摩洛哥王妃</p>
                    <div class="item-p-c">
                        <p class="item-pirce tar fz14">¥120.00</p>
                        <p class="item-comment">11条评价</p>
                    </div>
                </a>
                <div class="item-footer lr-col padd-lr fz14">
                    <div class="goods-property col-6">
                        <p>适合肤质：<span>偏白、偏黄、偏黑</span></p>
                        <p>推荐场景：<span>休闲、通勤、约会</span></p>
                    </div>
                    <a href="" class="col-4 btn-buy tac">立即购买</a>
                </div>
            </li>
        </ul>
    </section>
    <section class="after-sale-service">
	    <img src="~assets/images/home/service.png">
	</section>
    <hr class="divide-line">
    <loading v-show="showLoading"></loading>
    <footer-bottom></footer-bottom>		
  	<footer-nav></footer-nav>
  </div>
</template>

<script>
import footerBottom from '../../components/footer/footer'
import footerNav from '../../components/footer/footerNav'
import {newsGoodsList} from '../../service/getData'
import {loadMore} from '../../components/common/mixin'
import loading from '../../components/common/loading'

export default {
	data() {
		return{
            counts: 0,
            showLoading: true,
            goodsListArr: null,
        }
	},

    components: {
        footerBottom,
        footerNav,
        loading,
    },
    mixins: [loadMore],
    mounted: function(){
        this.initData();        
    },
    methods: {
        // 初始化获取数据
        async initData(){
            let res = await newsGoodsList(counts)
            let resData = res.data;

            // this.goodsListArr = [...resData];
            console.log(this.goodsListArr);
            this.showLoading = false;
        },

        // 到达底部加载更多数据
        async loaderMore(){
            if (this.touchend) {
                return
            }
            //防止重复请求
            if (this.preventRepeatReuqest) {
                return 
            }
            this.showLoading = true;
            this.preventRepeatReuqest = true;

            //数据的定位加20位
            this.offset += 3;
            
            //当获取数据小于20，说明没有更多数据，不需要再次请求数据
            if (res.length < 20) {
                this.touchend = true;
                return
            }
            this.preventRepeatReuqest = false;
        },
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
</style>
