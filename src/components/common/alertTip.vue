<template>
    <div class="alet-container-box">
        <!-- 模式1: 含有确认弹框 -->
        <section v-show="isShow" v-if="confirmModel == 1" class="alet-container">
            <div class="tip-text-container">
                <div class="tip-text" :class="{tal: isUpload === true}">
                    <div v-html="alertText" style="color: #000;"></div>
                    <div v-if="isUpload" class="upload-wrapper">
                        <div class="upload">
                            <img src="http://image.lanman.cn/2016/m.lanman.cn/images/comment/add.png">
                        </div>
                    </div>
                </div>
                <div v-if="isConfirm" class="confrim" @click="sureTip">确认</div>
                <div class="confrim-box" v-else="isConfirm">
                    <div class="confrim" @click="closeTip">取消</div>
                    <div class="confrim" @click="sureTip">确认</div>
                </div>
            </div>    
        </section>
        <!-- 模式2: 简单提示弹框 -->
        <transition name="downToUp">
            <section v-show="isShow" class="simpleTip-text-container" v-if="confirmModel == 2">
                <div class="simpleTip-box">
                    <p class="fz16 tac color-ft-black">更新成功<span class="color-ft-black" v-if="isCountDown">({{ timeDown }})</span></p>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1"class="specs_cancel" v-if="isCancel" @click="closeTip">
                        <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2"/>
                        <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2"/>
                    </svg>
                </div>
            </section>
        </transition>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                timeDown: 0
            }
        },
        mounted(){

        },
        props: {
            // 弹出框显示模式，默认1
            confirmModel: {
                default: 1
            },
            // 弹出框内容
            alertText: {
                default: ''
            },
            isShow: {
                default: false
            },
            /*------模式1: 含有确认弹框--------*/
            // 是否只显示确认？0: 显示取消；1: 不显示取消
            isConfirm: {
                default: true
            },
            // 是否显示上传按钮
            isUpload: {
                default: false
            },
            /*------模式2: 简单提示弹框--------*/
            // 是否显示关闭按钮
            isCancel: {
                default: false
            },
            // 是否显示倒计时
            isCountDown: {
                default: true
            },
            // 是否自动消失
            isAutoHide: {
                default: true
            },
            // 倒计时秒数
            second: {
                default: 2
            }
        },
        methods: {
            countDown(){
                var _this = this;

                if(_this.timeDown > 0){
                    setTimeout(() => {
                        _this.timeDown--;
                        _this.countDown();
                    }, 1000);
                }else{
                    if(_this.isAutoHide){
                        _this.$emit('isShowAuto', false);
                    }
                }
            },
            closeTip(){
                this.$emit('closeTip')
            },
            sureTip(){
                this.$emit('sureTip')
            },
        },
        watch: {
            isShow(){
                if(this.isShow){
                    this.timeDown = this.second;
                    this.countDown();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~assets/style/mixin';

	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    @keyframes tipToUp{
        0%  { bottom: strip-rem(50px);opacity: 0 }
       100% { bottom: strip-rem(100px);opacity: 1 }
    }
    .downToUp-enter-active{
        animation: tipToUp .4s ;
    }
    .downToUp-leave-active{
        animation: tipToUp .4s reverse;
    }
    .alet-container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
    }
    .tip-text-container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50%;
        margin-left: strip-rem(-120px);
        width: strip-rem(240px);
        animation: tipMove .4s ;
        background-color: rgba(255,255,255,1);
        border: 1px;
        padding-top: strip-rem(12px);
        @include fj($direction: column);
        border: 1px;
        border-radius: strip-rem(5px);
        .tip-text{
            @include sc(14px, #333);
            line-height: strip-rem(18px);
            text-align: center;
            margin-top: strip-rem(16px);
            padding: 0 strip-rem(16px);
            &.tal{
            	text-align: left;
            }
        }
        .upload-wrapper{
        	width: strip-rem(60px);
        	margin: strip-rem(10px) auto auto;
        }
        .confrim-box{
        	@include fj();
        	width: 100%;
        	.confrim{
        		&:nth-of-type(1){
        			border-right: 1px solid #8e8e8e;
        			border-bottom-right-radius: 0;
        		}
        	}
        }
        .confrim{
            @include sc(16px, #000);
            border-top: 1px solid #8e8e8e;
            font-weight: bold;
            margin-top: strip-rem(16px);
            background-color: #fff;
            width: 100%;
            text-align: center;
            line-height: strip-rem(36px);
    		border-top: 1px solid #8e8e8e;
            border-bottom-left-radius: strip-rem(5px);
            border-bottom-right-radius: strip-rem(5px);
        }
    }
    .simpleTip-text-container{
        position: fixed;
        bottom: strip-rem(100px);
        left: 50%;
        margin-top: -50%;
        margin-left: strip-rem(-120px);
        width: strip-rem(240px);
        background-color: #fff;
        border-radius: strip-rem(5px);
        @include remCalc('padding', 10);
        .simpleTip-box{
            p{
                color: #000;
            }
        }
        .specs_cancel{
            position: absolute;
            top: strip-rem(12px);
            right: strip-rem(10px);
        }
    }
</style>
