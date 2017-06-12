<template>
    <div id="member">
        <section class="about-me">
            <a class="member-photo" href="">
                <img src="http://image.lanman.cn/2017/05/09/8d0714d67537db87fdc67c967166ceed.jpg" alt="">
            </a>
            <div class="member-info">
                <p class="fz14">碎魄零星</p>
                <p class="point">
                    <span class="member-id">会员ID: 123455</span>
                    <span>
                        <i class="iconfont icon-point ft-34">&#xe61e;</i>
                        我的积分: <a href="">13652 ></a>
                    </span>
                </p>
                <p class="fz14">家族族长: 无名</p>
            </div>
        </section>
        <section class="menu">
            <ul class="menu-list">
                <li class="list-item">
                    <a href="">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的订单</span>
                        <span class="info-num fr">3</span>
                    </a>
                </li>
                <li class="list-item">
                    <a href="">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的物流</span>
                        <span class="info-num fr">3</span>
                    </a>
                </li>
                <li class="list-item">
                    <a href="">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的售后</span>
                        <span class="info-num fr">3</span>
                    </a>
                </li>
                <li class="list-item">
                    <a href="">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的评价</span>
                        <span class="info-num fr">3</span>
                    </a>
                </li>
                <li class="list-item">
                    <a href="">
                        <i class="iconfont icon-sub">&#xe605;</i>
                        <span class="menu-name">我的地址</span>
                        <span class="info-num fr">3</span>
                    </a>
                </li>
            </ul>
        </section>
        <section class="new-goods">
            <div class="lr-col fz14 lr-info">
                <div class="col-6">
                    <span class="iconfont icon-newGoods-schedule"></span>
                    免费获得4支口红，我是怎么做到的？
                </div>
                <div class="col-4 tar">
                    <a class="link-known" href="">了解代言人模式</a>
                </div>
            </div>
        </section>
        <section class="recommend">
            <p class="title fz14">LANMAN向您推荐</p>
            <ul class="item-list fl">
                <li class="list-item">
                    <a href="">
                        <img class="item-view" src="http://image.lanman.cn/2017/05/18/82d2a6304ee79df861941deb61e3b0a5.jpg" alt="">
                        <p class="item-content">LANMAN #104 巧克力初心系列-摩洛哥王妃</p>
                        <p class="item-pirce">¥120.00</p>
                    </a>
                </li>
                <li class="list-item">
                    <a href="">
                        <img class="item-view" src="http://image.lanman.cn/2017/05/18/82d2a6304ee79df861941deb61e3b0a5.jpg" alt="">
                        <p class="item-content">LANMAN #104 巧克力初心系列-摩洛哥王妃</p>
                        <p class="item-pirce">¥120.00</p>
                    </a>
                </li>
                <li class="list-item">
                    <a href="">
                        <img class="item-view" src="http://image.lanman.cn/2017/05/18/82d2a6304ee79df861941deb61e3b0a5.jpg" alt="">
                        <p class="item-content">LANMAN #104 巧克力初心系列-摩洛哥王妃</p>
                        <p class="item-pirce">¥120.00</p>
                    </a>
                </li>
                <li class="list-item">
                    <a href="">
                        <img class="item-view" src="http://image.lanman.cn/2017/05/18/82d2a6304ee79df861941deb61e3b0a5.jpg" alt="">
                        <p class="item-content">LANMAN #104 巧克力初心系列-摩洛哥王妃</p>
                        <p class="item-pirce">¥120.00</p>
                    </a>
                </li>
            </ul>
        </section>
        <footer-nav></footer-nav>   
    </div>
</template>

<script>
	import footerNav from '../../components/footer/footerNav'

    export default {
    	data(){
            return{
                
            }
        },
        components: {
        	footerNav,
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