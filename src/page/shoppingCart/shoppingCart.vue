<template>
	<div class="shopping-cart">
        <div v-if="!isHaveOrder">
            <div class="blank-cont">
                <img src="~assets/images/shoppingCart/bg_shoppingcart_blank.png">
                <p class="fz16 fw">您购物车中没任何商品</p>
                <a class="fz14 link-home" href="">去逛逛 ></a>
            </div>
        </div>
        <div v-if="isHaveOrder">
            <router-link tag="section" v-if="userId" :to="{path: 'address', query: {id: userId}}" class="address padding-1">
                <div class="receive-info">
                    <div class="receive fz16">
                        <span class="color-cart-gray">收货人：{{ receiveName }} {{ phone }}</span>
                    </div>
                    <div class="receive-address fz14">
                        <span class="color-cart-gray">收货地址：{{ adress }}</span>
                    </div>    
                </div>
                <i class="color-cart-gray icon-right-arrow iconfont">&#xe60e;</i>
            </router-link>
            <router-link tag="section" v-else="userId" :to="{path: 'login'}" class="padding-1">
                <p class="fz16 tac">点击登入获取地址信息</p>
            </router-link>
            <div class="divide-line"></div>
            <section class="order-list-box">
                <ul class="order-list">
                    <li class="goods-item lr-col padding-1" v-for="item in cartList" :key="item.id">
                        <router-link tag="div" :to="{path: 'goods', query: {id: item.id}}" class="order-my-pic">
                            <img :src="item.shopPic"/>
                        </router-link>
                        <div class="order-goods-info col-8">
                            <p class="fz14 color-cart-gray">{{ item.name }}</p>
                            <p class="tar color-cart-gray">¥{{ item.price | subNumber }}</p>
                            <div class="order-goods-num lr-col">
                                <div class="num lr-col">
                                    <span>数量：</span>
                                    <span class="box">-</span>
                                    <span class="box">{{ item.num }}</span>
                                    <span class="box">+</span>   
                                </div>
                                <i class="iconfont icon-delete color-cart-gray"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
            <div class="divide-line"></div>
        </div>
        <footer-nav :isShopcart="false"></footer-nav>   
    </div>
</template>

<script>
import footerNav from '../../components/footer/footerNav'
import { mapState, mapActions, mapMutations } from 'vuex'
import { subNumber } from '../../components/common/mixin'

    export default {
    	data(){
            return{
                isHaveOrder: true,          // 购物车是否为空
                adress: null,
                receiveName: null,
                phone: null,
                userId: null,
            }
        },
        components: { footerNav, },
        mixins: [ subNumber ],
        created(){
            this.isHaveOrder = (this.$route.query.num ? true : false);
            this.INIT_BUYCART();
        },
        mounted(){
            // 获取用户信息
            // this.getUserInfo();
            this.initData();
        },
        computed: {
            ...mapState([
                'userInfo', 'cartList'
            ])
        },
        methods: {
            // 获取登入信息
            ...mapActions([
                'getUserInfo'
            ]),
            ...mapMutations([
                'ADD_CART', 'INIT_BUYCART'
            ]),
            async initData(){
                if(this.userInfo){
                    let userInfo = this.userInfo;

                    this.adress = userInfo.adress;
                    this.receiveName = userInfo.user_name;
                    this.phone = userInfo.phone_num;
                }
            }
        },
        watch: {
            userInfo: function (value){
                // this.initData();
            }
        },
    }
</script>
<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';

    $color-a3: #a3a3a3;
    .padding-1{ padding: strip-rem(10px); }
    .color-cart-gray{ color: $color-a3; }
    .blank-cont{
        background-color: #333;
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: 0 auto;
        @include fj($type: center, $direction: column);
        img{
            width: strip-rem(80px);
            margin-bottom: strip-rem(10px);
        }
        .link-home{
            color: red;
            margin-top: strip-rem(10px);
        }
    }
    .address{
        @include fj();
        color: #3a3a3a;
        .receive{
            margin-bottom: strip-rem(10px);
        }
    }
    .order-my-pic{
        @include wh(70px, 70px);
    }
    .order-goods-info{
        margin-left: strip-rem(10px);
    }
    .order-goods-num{
        margin-top: strip-rem(5px);
        span{
            color: $color-a3;
        }
        .box{
            @include wh(20px, 20px);
            text-align: center;
            line-height: 2;
            border: 1px solid $color-a3;
            &:nth-child(3){
                border-left: 0;
                border-right: 0;
                width: strip-rem(25px);
            }
        }
        .icon-delete{
            padding: strip-rem(2px);
            background-color: #333;
        }
    }
</style>