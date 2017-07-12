<template>
    <div id="member" class="footer-height">
        <section class="about-me">
            <a class="member-photo" href="">
                <img :src="avatar">
            </a>
            <div class="member-info">
                <p class="fz14">{{ userName }}</p>
                <p class="point">
                    <span class="member-id">会员ID: {{ userId }}</span>
                    <span @click="gotoAddress({path: '/user/myPoint'})">
                        <i class="iconfont icon-point ft-34">&#xe61e;</i>
                        我的积分: <a>{{ point }} ></a>
                    </span>
                </p>
                <p class="fz14">家族族长: {{ patriarch }}</p>
            </div>
        </section>
        <section class="menu">
            <ul class="menu-list">
                <li class="list-item">
                    <a @click="gotoAddress({path: '/user/order'})">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的订单</span>
                    </a>
                </li>
                <li class="list-item">
                    <a @click="gotoAddress({path: '/user/logistics'})">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的物流</span>
                    </a>
                </li>
                <li class="list-item">
                    <a @click="gotoAddress({path: '/user/payfeedback'})">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的售后</span>
                    </a>
                </li>
                <li class="list-item">
                    <a @click="gotoAddress({path: '/user/comment'})">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的评价</span>
                    </a>
                </li>
                <li class="list-item">
                    <a @click="gotoAddress({path: '/user/adress'})">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的地址</span>
                    </a>
                </li>
                <li class="list-item">
                    <a @click="outLogin">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">{{ loginState ? '退出登入' : '登入/注册' }}</span>
                    </a>
                </li>
            </ul>
        </section>
        <section class="new-goods">
            <div class="lr-col fz14 lr-info">
                <div class="col-6">
                    <span class="iconfont icon-newGoods-schedule"></span>
                    距离下次新品发布还有1天
                </div>
                <div class="col-4 tar">
                    <a class="link-known" @click="subRemind">订阅新品提醒</a>
                </div>
            </div>
        </section>
        <section class="recommend padd-lr" v-show="recommendList">
            <p class="title fz14">LANMAN向您推荐</p>
            <ul class="item-list fl">
                <router-link v-for="item in recommendList" :key="item.id" :to="{path: 'goods', query: {id: item.id}}" tag="li" class="list-item" >
                    <img class="item-view" :src="item.outside_view">
                    <p class="item-content">{{ item.goods_name }}</p>
                    <p class="item-pirce">¥{{ item.shop_price }}</p>
                </router-link>
            </ul>
        </section>
        <alert-tip :isShow="showAlert" @closeTip="showAlert = false" :isConfirm="false" @sureTip="sureTip" :alertText="alertText"></alert-tip>
        <footer-nav></footer-nav>   
    </div>
</template>

<script>
	import footerNav from '@/components/footer/footerNav'
    import { recommendList, addsubscribe } from '@/service/getData'
    import { removeStore } from '@/assets/config/mUtils'
    import { mapState, mapMutations } from 'vuex'
    import alertTip from '@/components/common/alertTip'

    export default {
    	data(){
            return{
                showAlert: false,       // 是否显示弹窗
                alertText: null,        // 弹框文本内容
                loginState: false,      // 登入状态
                avatar: '',             // 会员头像
                userName: '',           // 会员名
                userId: null,           // 会员ID
                point: 0,               // 会员积分
                patriarch: '',          // 家族族长
                recommendList: null,    // 推荐商品列表
            }
        },
        components: {
        	footerNav,
            alertTip,
        },
        mounted(){
            // this.initData();
        },
        computed: {
            ...mapState([
                'userInfo',
            ])
        },
        methods: {
            ...mapMutations([
                'OUT_LOGIN'
            ]),
            async initData(){
                const _this = this;

                _this.avatar = _this.userInfo.avatar;
                _this.userName = _this.userInfo.user_name;
                _this.userId = _this.userInfo.user_id;
                _this.point = _this.userInfo.point;
                _this.patriarch = _this.userInfo.patriarch;
                let recommendListRes = _this._ajaxDoSomething(await recommendList());

                _this.recommendList = recommendListRes.data;
            },
            gotoAddress(path){
                this.$router.push(path);
            },
            outLogin(){
                if(this.loginState){
                    this.OUT_LOGIN();
                    removeStore('user_id');
                }
                this.$router.push('/user/login');
            },
            // 订阅提醒
            subRemind(){
                this.showAlert = true;
                if(!this.loginState){
                    this.alertText = "(。・`ω´・)你还没登录，点击确认开始登录！";
                    return;
                }
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

    // 会员信息 
    .about-me{
        @include fj('flex-start');
        @include remCalc('padding', 16, 20);
        background: url(~assets/images/member/bg-my.jpg) no-repeat center;
        background-size: cover;
        .member-photo{
            width: strip-rem(70px);
            height: strip-rem(70px);
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid #fff;
            margin-right: strip-rem(20px);
        }
        .member-info{
            .point{
                font-size: 1.0833em;
                @include remCalc('margin', 5, 0);
                color: #000;
            }
            span, i{
                color: #989898;
            }        
        }
        .member-id{
            margin-right: 5px;
        }
    }
    @media screen and (max-width: 320px) {
        .about-me{
            .member-info{
                .point{
                    margin: 0 auto;
                }
                span{
                    display: block;
                }
            } 
        }
    }
    .icon-sub{
        font-size: 16px;
    } 
    .menu-list{
        .list-item{
            width: 100%;
            border-top: 1px solid #676767;
            margin-bottom: 0px;
            padding: 0;
            &:first-child{
                border-top: 0;
            }
            a{
                @include remCalc('padding', 15);
                display: block;
            }
            span, i{
                vertical-align: middle;
            }
        }
    }
    .recommend{
        overflow: hidden;
        .title{
            @include remCalc('margin', 15, auto);
        }
    }
</style>