<template>
    <div id="member">
        <section class="about-me">
            <a class="member-photo" href="">
                <img :src="avatar">
            </a>
            <div class="member-info">
                <p class="fz14">{{ userName }}</p>
                <p class="point">
                    <span class="member-id">会员ID: {{ userId }}</span>
                    <span>
                        <i class="iconfont icon-point ft-34">&#xe61e;</i>
                        我的积分: <a href="">{{ point }} ></a>
                    </span>
                </p>
                <p class="fz14">家族族长: {{ patriarch }}</p>
            </div>
        </section>
        <section class="menu">
            <ul class="menu-list">
                <li class="list-item">
                    <a @click="gotoAddress({path: '/home'})">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的订单</span>
                    </a>
                </li>
                <li class="list-item">
                    <a @click="gotoAddress({path: '/logistics'})">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的物流</span>
                    </a>
                </li>
                <li class="list-item">
                    <a @click="gotoAddress({path: '/payfeedback'})">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的售后</span>
                    </a>
                </li>
                <li class="list-item">
                    <a @click="gotoAddress({path: '/mycomment'})">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的评价</span>
                    </a>
                </li>
                <li class="list-item">
                    <a @click="gotoAddress({path: '/address'})">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的地址</span>
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
                    <a class="link-known" href="">订阅新品提醒</a>
                </div>
            </div>
        </section>
        <section class="recommend">
            <p class="title fz14">LANMAN向您推荐</p>
            <ul class="item-list fl">
                <router-link v-for="item in recommendList" :key="item.id" :to="{path: 'goods', query: {id: item.id}}" tag="li" class="list-item" >
                    <img class="item-view" :src="item.outside_view">
                    <p class="item-content">{{ item.goods_name }}</p>
                    <p class="item-pirce">¥{{ item.shop_price }}</p>
                </router-link>
            </ul>
        </section>
        <footer-nav></footer-nav>   
    </div>
</template>

<script>
	import footerNav from '../../components/footer/footerNav'
    import {user} from '../../service/getData'

    export default {
    	data(){
            return{
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
        },
        mounted(){
            this.initData();
        },
        methods: {
            async initData(){
                let userRes = await user();
                let userData = userRes.data;

                this.avatar = userData.avatar;
                this.userName = userData.user_name;
                this.userId = userData.user_id;
                this.point = userData.point;
                this.patriarch = userData.patriarch;
                this.recommendList = userData.recommend;
            },
            gotoAddress(path){
                this.$router.push(path);
            },
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
            width: 75px;
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
            }        }
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
            padding: 0;
            &:first-child{
                border-top: 0;
            }
            a{
                @include remCalc('padding', 15);
                display: block;
            }
        }
    }
    .recommend{
        padding-right: strip-rem(15px);
        overflow: hidden;
        .title{
            @include remCalc('margin', 15, auto, 15, 15);
        }
    }
</style>