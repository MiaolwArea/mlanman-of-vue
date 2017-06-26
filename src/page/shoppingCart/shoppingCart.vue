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
            <section class="order-list-box padding-1">
                <ul class="order-list">
                    <li class="goods-item lr-col" v-for="item in cartList" :key="item.id">
                        <router-link tag="div" :to="{path: 'goods', query: {id: item.id}}" class="order-my-pic">
                            <img :src="item.shopPic"/>
                        </router-link>
                        <div class="order-goods-info">
                            <p>{{ item.name }}</p>
                            <p>{{ item.price }}</p>
                            <div class="order-goods-num">
                                <div class="num">
                                    <span>数量：</span>
                                    <span>-</span>
                                    <span>{{ item.num }}</span>
                                    <span>+</span>   
                                </div>
                                <i class="iconfont icon-delete"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
        <footer-nav :isShopcart="false"></footer-nav>   
    </div>
</template>

<script>
import footerNav from '../../components/footer/footerNav'
import { mapState, mapActions, mapMutations } from 'vuex'

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
        created(){
            this.INIT_BUYCART();
            console.log(this.cartList)
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

    .padding-1{ padding: strip-rem(10px); }
    .color-cart-gray{ color: #a3a3a3; }
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
        @include wh(65px, 65px);
    }
</style>