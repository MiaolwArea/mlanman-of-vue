<template>
<transition name="lf-slid" mode="out-in">
    <div id="login-in" class="header-height children-view">
        <template v-if="!this.isLogin">
            <head-top head-title="用户登入/注册" go-back='true'></head-top>
            <form class="loginForm">
                <section class="input_container">
                    <input class="fz14" type="text" placeholder="账号" v-model.lazy="userAccount">
                </section>
                <section class="input_container">
                    <input class="fz14" type="password" placeholder="密码"  v-model="passWord">
                </section>
                <section class="input_container captcha_code_container">
                    <input type="text" class="fz14" placeholder="验证码" maxlength="4" v-model="codeNumber">
                    <div class="img_change_img">
                        <img v-show="captchaCodeImg" :src="captchaCodeImg">
                        <div class="change_img" @click="getCaptchaCode">
                            <p>看不清</p>
                            <p>换一张</p>
                        </div>
                    </div>
                </section>
            </form>
            <p class="login_tips">
                温馨提示：未注册过的账号，登录时将自动注册
            </p>
            <p class="login_tips">
                注册过的用户可凭账号密码登录
            </p>
            <div class="login_container fz14" @click="mobileLogin">登录</div>
            <alert-tip :isShow="showAlert" @closeTip="showAlert = false" @sureTip="showAlert = false" :alertText="alertText"></alert-tip>
            <loading v-show="isLoading"></loading>
        </template>
        <template v-else>
            <div class="login_container fz14">退出并登录</div>
        </template>
    </div>
</transition>
</template>

<script>
import headTop from '@/components/header/head'
import { getcaptchas, accountLogin } from '@/service/getData'
import { mapState, mapMutations, mapGetters } from 'vuex'
import alertTip from '@/components/common/alertTip'

    export default {
    	data(){
            return{
                captchaCodeImg: null,   // 验证码地址
                userAccount: null,      // 用户名
                passWord: null,         // 密码
                codeNumber: null,       // 验证码
                showAlert: false,       // 是否显示弹窗
                alertText: '',          // 弹窗内容
            }
        },
        created(){
            this.getCaptchaCode();
        },
        mounted(){

        },
	    components: {
	        headTop,
            alertTip
	    },
        computed: {
            ...mapGetters([ 'isLoading' ]),
            ...mapState([ 'isLogin' ]),
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            //获取验证码
            async getCaptchaCode(){
                let res = await getcaptchas();
                this.captchaCodeImg = res.code;
            }, 
            //发送登录信息
            async mobileLogin(){
                if (!this.userAccount) {
                    this.showAlert = true;
                    this.alertText = '请输入手机号/邮箱/用户名';
                    return
                }else if(!this.passWord){
                    this.showAlert = true;
                    this.alertText = '请输入密码';
                    return
                }else if(!this.codeNumber){
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    return
                }
                //用户名登录
                this.infos = this._ajaxDoSomething(await accountLogin(this.userAccount, this.passWord, this.codeNumber)).data;

                if(this.infos.user_id){
                    this.RECORD_USERINFO(this.infos);
                    this.$router.go(-1);
                }else{
                    // TODO 返回错误之后的操作
                    // this.getCaptchaCode();
                }
            },
        },

    }

</script>

<style lang="scss" scoped>
    @import '~assets/style/mixin.scss';
    
    .loginForm{
        background-color: #fff;
        margin-top: strip-rem(10px);
        .input_container{
            @include fj();
            @include remCalc('padding', 12, 16);
            border-bottom: 1px solid #f1f1f1;
            input{
                width: 100%;
                color: #666;
            }
            button{
                color: #fff;
                font-family: Helvetica Neue,Tahoma,Arial;
                @include remCalc('padding', 15, 8);
                border: 1px;
                border-radius: strip-rem(5px);
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
        .phone_number{
            @include remCalc('padding', 6, 16);
        }
        .captcha_code_container{
            height: strip-rem(40px);
            .img_change_img{
                @include fj(center);
                img{
                    @include wh(70px, 30px);
                    margin-right: strip-rem(5px);
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: strip-rem(40px);
                    justify-content: center;
                    p{
                        color: #666;
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: strip-rem(5px);
                    }
                }
            }
        }
    }
    .login_tips{
        color: red;
        @include remCalc('padding', 8, 12);
        line-height: strip-rem(10px);
        a{
            color: #3b95e9;
        }
    }
    .login_container{
        @include remCalc('margin', 0, 10, 20);
        color: #fff;
        background-color: #4a4a4a;
        padding: strip-rem(10px) 0;
        border: 1px;
        border-radius: strip-rem(5px);
        text-align: center;
    }
</style>
