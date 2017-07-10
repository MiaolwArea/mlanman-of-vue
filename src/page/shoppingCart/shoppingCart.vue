<template>
	<div id="shopping-cart" class="footer-height">
        <template v-if="!isHaveOrder">
            <div class="blank-cont color-bg-gray">
                <img src="~assets/images/shoppingCart/bg_shoppingcart_blank.png">
                <p class="fz16 fw">您购物车中没任何商品</p>
                <a class="fz14 link-home" href="">去逛逛 ></a>
            </div>
        </template>
        <template v-else>
            <router-link tag="section" v-if="userId" :to="{path: '/user/adress', query: {id: userId}}" class="address padding-1">
                <div class="receive-info">
                    <div class="receive fz16">
                        <span class="color-ft-a3">收货人：{{ receiveName }} {{ phone }}</span>
                    </div>
                    <div class="receive-address fz14">
                        <span class="color-ft-a3">收货地址：{{ adress }}</span>
                    </div>    
                </div>
                <i class="color-ft-a3 icon-right-arrow iconfont">&#xe60e;</i>
            </router-link>
            <router-link tag="section" v-else :to="{path: '/user/login'}" class="padding-1">
                <p class="fz16 tac">点击登入获取地址信息</p>
            </router-link>
            <div class="divide-line"></div>
            <section class="order-list-box">
                <ul class="order-list">
                    <li class="goods-item lr-col padding-1" v-for="(item, index) in cartList" :key="item.id">
                        <router-link tag="div" :to="{path: 'goods', query: {id: item.id}}" class="order-my-pic">
                            <img :src="item.shopPic"/>
                        </router-link>
                        <div class="order-goods-info col-8">
                            <p class="fz14 color-ft-a3">{{ item.name }}</p>
                            <p class="tar color-ft-a3">¥{{ item.price | subNumber }}</p>
                            <div class="order-goods-num lr-col">
                                <div class="num lr-col" @click="changeNumAlert(item.id, listNum[item.id] || item.num)">
                                    <span>数量：</span>
                                    <span class="box">-</span>
                                    <span class="box">{{ listNum[item.id] || item.num }}</span>
                                    <span class="box">+</span>   
                                </div>
                                <i class="iconfont icon-delete color-bg-gray color-ft-a3" @click="clearGoods(item.id)"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
            <div class="divide-line"></div>
            <section class="order-info">
                <ul class="list-info">
                    <li class="order-item lr-col fz14">
                        <span class="fw">商品金额</span>
                        <span class="color-ft-a3">¥{{ countTotal | subNumber }}</span>
                    </li>
                    <li class="order-item lr-col fz14">
                        <span class="fw">抵用金额</span>
                        <span class="color-ft-a3">¥{{ voucher | subNumber }}</span>
                    </li>
                    <li class="order-item lr-col fz14">
                        <span class="fw">运费</span>
                        <span class="color-ft-a3">{{ freight | subNumber }}</span>
                    </li>
                    <li class="order-item fz14">
                        <span class="fw">我要留言</span>
                        <textarea class="remark" v-model="remark"></textarea>
                    </li>
                    <li class="order-item lr-col fz14">
                        <span class="fw" @click="goBack"><i class="iconfont">&#xe610;</i>继续购物</span>
                        <span class="color-ft-a3 fz16">实付¥{{ finalPirce | subNumber }}</span>
                    </li>
                </ul>
            </section>
            <section class="pay-btn-box color-bg-gray">
                <a class="pay-btn tac fz16" @click="payByWechat">微信支付</a>
            </section>
            <footer class="lanman-footer color-bg-gray">
                <div class="lanman-footer-logo">
                    <img src="http://image.lanman.cn/2016/m.lanman.cn/images/my/lanman-footer-logo.png">
                </div>
                <p class="contact-tel tac">
                    <font class="fz14 color-ft-a3">全球服务联系电话：400－700－0825</font>    
                </p>
            </footer>
            <!-- 数量选择弹窗 -->
            <transition name="fade">
                <div class="specs_cover" @click="showChangeBlock = false" v-if="showChangeBlock"></div>
            </transition>
            <transition name="fadeBounce">
                <div class="specs_list" v-show="showChangeBlock">
                    <header class="specs_list_header">
                        <h4 class="ellipsis fz14 tac color-cart-black">修改购买数量</h4>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1"class="specs_cancel" @click="showChangeBlock = false">
                            <line x1="0" y1="0" x2="16" y2="16"  stroke="#666" stroke-width="1.2"/>
                            <line x1="0" y1="16" x2="16" y2="0"  stroke="#666" stroke-width="1.2"/>
                        </svg>
                    </header>
                    <section class="specs_details">
                        <div class="num-box">
                            <i class="iconfont icon-num-minus color-cart-black" @click="changeNumTxt--"></i>
                            <input class="dialog-num fz16 tac color-cart-black" type="number" v-model.number="changeNumTxt" >
                            <i class="iconfont icon-num-plus color-cart-black" @click="changeNumTxt++"></i>
                        </div>
                    </section>
                    <footer class="specs_footer">
                        <div class="update_num fz16" @click="changeNumAlertSure(changeNumTxt)">确认</div>
                    </footer>
                </div>
            </transition>
        </template>
        <alert-tip :isShow="showAlert" @closeTip="showAlert = false" :isConfirm="false" :alertText="alertText" @sureTip="sureTip()"></alert-tip>
        <footer-nav :isShopcart="false"></footer-nav>   
    </div>
</template>

<script>
import footerNav from '@/components/footer/footerNav'
import { mapState, mapActions, mapMutations } from 'vuex'
import { subNumber } from '@/components/common/mixin'
import alertTip from '@/components/common/alertTip'

    var thisId = null;

    export default {
    	data(){
            return{
                showAlert: false,           // 是否显示提醒框
                alertText: '',              // 提醒框内容
                isHaveOrder: true,          // 购物车是否为空
                adress: null,               // 收货地址
                receiveName: null,          // 收货人姓名
                phone: null,                // 收货人手机
                userId: null,               // 用户ID
                showChangeBlock: false,     // 是否显示数量输入框
                changeNumTxt: 1,            // 修改商品数目
                listNum: {},                // 暂存商品修改数目信息
                remark: '',                 // 留言，备注
            }
        },
        components: { footerNav, alertTip },
        mixins: [ subNumber ],
        created(){
            this.isHaveOrder = (this.$route.query.num ? true : false);
            this.INIT_BUYCART();
        },
        mounted(){
            
        },
        computed: {
            ...mapState([
                'userInfo', 'cartList'
            ]),
            // 计算总价
            countTotal: function(){
                let total = 0;
                Object.keys(this.cartList).forEach(itemid => {
                    let goodsInfo = this.cartList[itemid];

                    total += goodsInfo.num * goodsInfo.price;
                })
                return total;
            },
            // 抵用券
            voucher: function(){
                // TODO 看用户是否有抵用券，有的话选择改变金额
                return 0;
            },
            // 计算运费
            freight: function(){
                // TODO 运费计算规则...
                return '免运费';
            },
            // 需要支付金额
            finalPirce: function(){
                let countNum = this.countTotal + ( parseInt(this.freight) ? this.freight : 0 ) - this.voucher;

                return ( countNum > 0 ? countNum : 0 );
            },
        },
        methods: {
            // 获取登入信息
            ...mapActions([
                'userInfo'
            ]),
            ...mapMutations([
                'ADD_CART', 'INIT_BUYCART', 'ADD_CART_NUM', 'CLEAR_CART'
            ]),
            async initData(){
                const _this = this;

                if(_this.userInfo){
                    let userInfo = _this.userInfo;

                    _this.adress = userInfo.adress;
                    _this.receiveName = userInfo.user_name;
                    _this.phone = userInfo.phone_num;
                }
            },
            // 弹出数量修改框
            changeNumAlert(id, num){
                this.showChangeBlock = true;
                this.changeNumTxt = num;
                thisId = id;
                this.aa = 3
            },
            // 确认修改
            changeNumAlertSure(num){
                const _this = this;

                _this.showChangeBlock = false;
                _this.listNum[thisId] = num;
                _this.ADD_CART_NUM({shopId: thisId, num});
                thisId = null;
            },
            // 清空商品
            clearGoods(id){
                this.showAlert = true;
                this.alertText = '确认删除商品吗？';
                thisId = id;
            },
            sureTip(){
                this.CLEAR_CART(thisId);
                this.showAlert = false;
                thisId = null;
            },
            // 返回上一页
            goBack(){
                this.$router.go(-1);
            },
            payByWechat(){
                if(!this.loginState){
                    this.showAlert = true;
                    this.alertText = "(。・`ω´・)你还没登录，点击确认开始登录！";
                    return;
                }
                // TODO 微信接口以及支付前逻辑判断
            },
        },
        watch: {
            userInfo(val){
                this.loginState = !this._isEmptyObject(val);
                this.userId = val.user_id
                if (this.loginState) {
                    this.initData()
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';

    .padding-1{ padding: strip-rem(10px); }
    .color-cart-black{ color: #000; }
    .blank-cont{
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
            padding: strip-rem(3px);
        }
    }
    .specs_list{
        h4{
            padding: strip-rem(10px);
        }
        .icon-num-minus, .icon-num-plus{
            @include wh(30px, 30px);
            border: 1px solid #eef;
            text-align: center;
            line-height: strip-rem(30px);
        }
        .dialog-num{
            width: strip-rem(70px);
            height: strip-rem(30px);
            border-top: 1px solid #eef;
            border-bottom: 1px solid #eef;
        }
        .num-box{
            @include fj(center);
        }
        .update_num{
            background-color: #000;
            width: 50%;
            height: strip-rem(30px);
            line-height: strip-rem(30px);
            text-align: center;
            margin: strip-rem(20px) auto;
        }
    }
    .order-info{
        .order-item{
            @include remCalc('padding', 15, 10);
            border-bottom: 1px solid #3c3c3c;
            .remark{
                width: 100%;
                background-color: #3c3c3c;
                margin-top: strip-rem(10px);
                @include remCalc('padding', 2, 5);
            }
        }
    }
    .pay-btn-box{
        @include remCalc('padding', 20, 10);
        .pay-btn{
            display: block;
            height: strip-rem(40px);
            line-height: strip-rem(40px);
            background-color: #000;
        }
    }
    .lanman-footer{
        .lanman-footer-logo{
            width: strip-rem(150px);
            margin: 0 auto;
        }
        .contact-tel{
            padding: strip-rem(10px);
        }
    }
</style>