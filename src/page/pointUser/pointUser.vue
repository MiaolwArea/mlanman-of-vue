<template>
	<div id="point-user" class="footer-height">
		<div class="parent-page" v-show="isChildren">
			<section class="point-info-box">
			    <div class="point-info-header">
			        <div class="my-money-item-point txt-align-l pr">
			            <i class="iconfont icon-point ft-34">&#xe61e;</i>
			            <span class="fz14">我的积分</span>
			            <span class="point-num fz18">{{ num }}</span>
			        </div>
			        <div class="my-money-item-log txt-align-r" @click="gotoAddress({path: '/user/myPoint'})">
			            <i class="iconfont icon-point ft-34">&#xe61f;</i>
			            <span class="fz14">积分记录</span>
			        </div>
			    </div>
			    <div class="point-info-drawing">
			        <div class="dial-container-wrapper">
			            <div class="drawing-info">
			                <p>已获口红</p>
			                <p class="perc">{{ percenNum }}%</p>
			                <p>差积分{{ difNum }}</p>
			            </div>
			            <div class="svg-box">
						    <svg width="100%" height="100%" viewBox="0 0 100 100" >
						        <circle cx="50" cy="50" r="45" stroke-width="2" stroke="#fff"></circle>
						        <circle cx="50" cy="50" r="45" stroke-width="8" ref="donut__svg__circle" class="donut__svg__circle--one" stroke="#fff" stroke-linejoin="round" stroke-linecap="round" transform="rotate(90, 50 50)"></circle>
						    </svg>
						</div>
			        </div>
			    </div>
			    <div class="point-info-footer">
			        <div class="exchange-num txt-align-l pr">
			            <p>当前可兑换口红数量：<span class="exchange-num-word">{{ goodsNum }}</span></p>
			        </div>
			        <div class="exchange-btn txt-align-r">
			            <a @click="gotoAddress({path: '/pointUser/point/list'})">兑换口红</a>
			        </div>
			    </div>
			    <div class="divide-line"></div>
			</section>
			<section class="link-info">
			    <a class="link-info-word fz14" :href="newsLinkTo">{{ newsLinkTitle }}</a>
			</section>
			<div class="divide-line"></div>
			<section class="myfamily">
			    <div class="header">
			        <font class="iconfont icon-title-embellish"></font>
			        <span>我的家族</span>
			    </div>
			    <div class="content">
			        <div class="family-man">
			            <p class="title">我的家族成员</p>
			            <p>{{ familyMan }}</p>
			        </div>
			        <div class="family-order">
			            <p class="title">家族订单</p>
			            <p>{{ familyOrder }}</p>
			        </div>
			    </div>
			    <div class="ins">
			        <p class="mb1r fz14">家族成员每增加1人，可获得1个积分（上限30分）</p>
			        <p class="fz14">家族订单每增加1单，可获得20个积分</p>
			    </div>
			</section>
			<div class="divide-line"></div>
			<section class="mission">
			    <div class="header">
			        <font class="iconfont icon-title-embellish"></font>
			        <span>积分任务</span>
			    </div>
			    <div class="content">
			        <ul class="mission-list">
			            <li class="list-item" v-if="!isShowOfPic">
			                <div class="mission-info col-8">
			                    <div class="info mb1r">转发“LANMAN烂熳口红”公众号并晒单公众号并晒单</div>
			                    <div class="point">
			                        <i class="iconfont ft-28">&#xe61e;</i>
			                        <span>10</span>
			                    </div>
			                </div>
			                <div class="misstion-btn col-2" @click="showMyPic(true)">
			                    <a>晒单</a>
			                </div>
			            </li>
			            <li class="list-item">
			                <div class="mission-info col-7">
			                    <div class="info mb1r">积分周：每月25、26、27号购买口红，积分翻倍</div>
			                    <div class="point">
			                        <i class="iconfont ft-28">&#xe61e;</i>
			                    </div>
			                </div>
			                <div class="misstion-btn col-3" @click="subReminder" :class="{active: reminderTxt == '已订阅'}">
			                    <a>{{ reminderTxt }}</a>
			                </div>
			            </li>
			            <li class="list-item" v-for="item in missionList" :key="item.task_id" v-if="item.status != 3">
			            	<div class="mission-info col-7">
			                    <div class="info mb1r">{{ item.desc }}</div>
			                    <div class="point">
			                        <i class="iconfont ft-28">&#xe61e;</i>
			                        <span>{{ item.val }}</span>
			                    </div>
			                </div>
			                <div class="misstion-btn col-3" @click="showMyPic(false, item.remark)" v-if="item.status == 1">
			                    <a>查看</a>
			                </div>
			                <div class="misstion-btn col-3" @click="reward(item.id)" v-if="item.status == 2">
			                    <a>领取</a>
			                </div>
			            </li>
			        </ul>
			    </div>
			</section>
			<alert-tip :isShow="showAlert" @closeTip="showAlert = false" @sureTip="sureTip" :isConfirm="isConfirm" :isUpload="isUpload" :alertText="alertText"></alert-tip>
			<footer-nav></footer-nav>
			<loading v-show="isLoading"></loading>
		</div>
		<!-- 兑换积分页 -->
        <transition name="ud-slid" mode="out-in">
            <router-view></router-view>
        </transition>
	</div>
</template>

<script>
	import footerNav from '@/components/footer/footerNav'
	import {pointUser} from '@/service/getData'
	import alertTip from '@/components/common/alertTip'
	import { mapState, mapGetters } from 'vuex'
	import { mVerification } from '@/components/common/mixin'

	const boolerInfo = {false: '已订阅', true: '订阅提醒'};
	
    export default {
    	data(){
            return{
            	isChildren: true,		// 是否有子路由
            	showAlert: false,		// 是否显示弹窗
                alertText: null,		// 弹框文本内容
                isShowOfPic: false,		// 是否显示晒单任务
                num: 0,					// 总积分
                difNum: 0,				// 差值积分
                percenNum: 0,			// 百分比积分
                goodsNum: 0,			// 可获得商品数
                newsLinkTitle: '',		// 软链文本信息
                newsLinkTo: '',			// 软链地址
                familyMan: 0,			// 家族成员
                familyOrder: 0,			// 家族订单
                isConfirm: true,		// 弹框是否只显示确定按钮
                isUpload: false,		// 弹框是否有上传功能
                reminderTxt: "订阅提醒", // 订阅按钮文本
                subBooler: 1,			// 默认是否显示订阅提醒文本
                missionList: null,		// 任务列表
            }
        },
        components: {
        	footerNav,
        	alertTip,
        },
        mixins: [ mVerification ],
	    mounted: function(){
	        // this.initData();        
	    },
	    computed: {
	        ...mapGetters([ 'isLoading' ]),
	        ...mapState([ 'userInfo' ]),
	    },
        methods: {
	        // 初始化获取数据
	        async initData(){
	        	const _this = this;
	        	// 进入页面根据积分值, 执行动画以及数据初始化
	            let res = await pointUser();
	            let resData = res.data;
	            if(resData){
	            	var dataInfo = resData
		        		, percen = dataInfo.member_info.integral 
		        		, valNum = percen / 100
			            , valNumAry = valNum.toString().split('.')
			            , num = valNumAry[0]
			            , vals = percen % 100
			            , radius = 45
			            , curProcess = vals / 100
			            , circumference = 2 * radius * Math.PI;

			        _this.num = dataInfo.member_info.integral;
			        _this.difNum = 100 - vals;
			        _this.percenNum = vals;
			        _this.goodsNum = num;
			        _this.newsLinkTitle = dataInfo.newsLink.link_title;
			        _this.newsLinkTo = dataInfo.newsLink.link_to;
			        _this.familyMan = dataInfo.family;
			        _this.familyOrder = dataInfo.familyOrderCount;
			        _this.isShowOfPic = dataInfo.times;
			        _this.missionList = dataInfo.task_list;
			        // 修改圆环进度条进度
			        _this.$refs.donut__svg__circle.style.strokeDashoffset = Math.floor(circumference - curProcess * circumference);
	            }
	        },
        	// 显示弹窗
        	showMyPic(isUpload, remark){
        		const _this = this;
        		
        		_this.isConfirm = !isUpload;
        		if(!this._verification()){
	        	    return false;
	        	}
        		_this.isUpload = isUpload;
        		_this.showAlert = true;
        		if(isUpload){
	                _this.alertText = '一、在朋友圈完成晒单<br>朋友圈晒单要求：<br>1、晒出来的图不得少于3张图片<br>2、含LANMAN烂熳LOGO图片<br>3、含个人专属二维码图片4、至少含一张产品拍照图<br>二、截图朋友圈状态上传即可';
        		}else{
        			_this.alertText = remark;
        		}
        	},
        	// 上传确定按钮
        	uploadCommit(){
        		// TODO 上传图片成功点击确定需要执行的判断。。。
        	},
        	sureTip(){
        		if(!this.loginState){
	                this.showAlert = false;
	                this.$router.push('/user/login');
	                return;
	            }
				if(this.isUpload){
					this.uploadCommit();
				}
				this.showAlert = false;
        	},
        	// 订阅提醒
        	subReminder(){
        		if(!this._verification()){
	        	    return false;
	        	}
        		// this.$http.get('http://localhost:3000/subReminder').then(res => {
	    			this.subBooler = !this.subBooler;
	        		this.reminderTxt = boolerInfo[this.subBooler];
        		// })
        	},
        	// 领取奖励
        	reward(taskId){
        		this.$http.get('http://localhost:3000/pointUser', {taskId: taskId}).then(res => {
        			// 
        		});
        	},
        	// 地址跳转
        	gotoAddress(path){
        		if(!this._verification()){
	        	    return false;
	        	}
        		this.$router.push(path)
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
		    	/*
				* 这里因为子路由相当于一个内嵌iframe, 会导致父级高度大于子级，滚动到一定会显示父层，这里做切换隐藏;
				* 注意：这里主要是方法实现，真实情况父路由嵌套路由不应该高于一屏或者说不高于子路由（特殊需求除外）
		    	*/
		    	this.isChildren = !this.isChildren;
		    }
        }
    }
</script>
<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';

	/* svg圆环半径 */
	$radius: 45; 
	/* svg圆环周长 */
	$circumference: (3.1415 * (2 * $radius));
    /* 头尾部 */
	%point-info{
		@include remCalc('font-size', 14); 
		color: #B1B1B1;
		@include remCalc('padding', 15, 15, 0, 15);
	}
	.point-info-footer{@extend %point-info; color: #fff;@include remCalc('margin-bottom', 14);}
	.point-info-header, .point-info-footer, .content{
		@include fj();
	}
	.point-info-header {
		@extend %point-info;
		.point-num{
			color: #fff;
			position: absolute;
			@include remCalc('top', 30);
			@include remCalc('left', 20);
			font-size: strip-rem(20px);
		}
	}
	.exchange-btn a{
		border: 1px solid #fff;
		border-radius: 5px;
		@include remCalc('padding', 5, 10);
	}
	/* 条形圆图 */
	.point-info-drawing{
		@include remCalc('height', 120);
		@include remCalc('margin-top', 10);
	}
	.dial-container-wrapper {
		position: absolute; 
		@include remCalc('height', 120);
		@include remCalc('width', 120);
		left: calc(50% - #{strip-rem(60px)});
	}
	.donut__svg__circle--one{
		stroke-dasharray: $circumference;
		stroke-dashoffset: $circumference;
		transition: stroke-dashoffset 1s cubic-bezier(.99, .01, .62, .94);
	}   
	.drawing-info{
		position: absolute;
		top: 47%;
		width: strip-rem(60px); 
		left: 50%;
		margin-left: strip-rem(-27.5px); 
		margin-top: strip-rem(-30px); 
		z-index: 9;
		text-align: center;
		.perc{
			font-size: strip-rem(23px);
		}
	}
	.link-info{text-align: center;margin: #{strip-rem(15px)} auto;}
	.link-info-word{color: #fff;}
	/* 家族 */
	.myfamily .header, .mission .header{
		@include remCalc('padding', 10, 15);
		font-size: strip-rem(14px);
		border-bottom: 1px solid #3e3d3d;
	}
	.myfamily{
		.content{
			font-size: strip-rem(14px);color: #FCFCFC;border-bottom: 1px solid #3e3d3d;
		}
		.ins{
			@include remCalc('padding', 10, 15);
			font-size: strip-rem(12px);
			color: #FCFCFC;
			opacity: .5;
		}
	}
	.content{
		>div{
			@include remCalc('padding', 10, 0);
			text-align: center;
			flex: 1;
		}
		.family-man{
			border-right: 1px solid #3e3d3d;
		}
		.title{
			opacity: .5;
			margin-bottom: strip-rem(10px);
		}
	}
	.mb1r{margin-bottom: strip-rem(10px);}
	/* 积分任务 */
	.mission {
		.list-item{
			border-bottom: 1px solid #3e3d3d;
			@include remCalc('padding', 10, 10);
			@include fj();
			font-size: strip-rem(14px);
			width: 100%;
		}
		.mission-info{margin-bottom: strip-rem(5px);color: #FCFCFC;opacity: .5;}
		.misstion-btn{
			color: #fff;
			opacity: 1;
			border: 1px solid #fff;
			@include remCalc('padding', 3, 10);
			border-radius: strip-rem(15px);
			text-align: center;
			&.active{
				border: 1px solid #8e8e8e;
				a{
					color: #8e8e8e;
				}
			}
		}
	}
</style>