<template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <div class="tip_text" :class="{tal: isUpload === true}">
            	<div v-html="alertText" style="color: #000;"></div>
            	<div v-if="isUpload" class="upload-wrapper">
            		<div class="upload">
            			<img src="http://image.lanman.cn/2016/m.lanman.cn/images/comment/add.png">
            		</div>
            	</div>
            </div>
            <div v-if="isConfirm" class="confrim" @click="closeTip">确认</div>
            <div class="confrim-box" v-else="isConfirm">
            	<div class="confrim" @click="closeTip">取消</div>
            	<div class="confrim" @click="sureTip">确认</div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){
      
        },
        props: {
            // 弹出框内容
        	alertText: {
        		default: ''
        	},
            // 是否只显示确认？0: 显示取消；1: 不显示取消
        	isConfirm: {
        		default: true
        	},
            // 是否显示上传按钮
        	isUpload: {
        		default: false
        	}
        },
        methods: {
            closeTip(){
                this.$emit('closeTip')
            },
            sureTip(){
                this.$emit('sureTip')
            },
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
    .alet_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
    }
    .tip_text_container{
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
        .tip_icon{
            @include wh(60px, 60px);
            border: strip-rem(1.5px) solid #f8cb86;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            span:nth-of-type(1){
                @include wh(2.4px, 30px);
                background-color: #f8cb86;
            }
            span:nth-of-type(2){
                @include wh(4px, 4px);
                border: 1px;
                border-radius: 50%;
                margin-top: strip-rem(4px);
                background-color: #f8cb86;
            }
        }
        .tip_text{
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
</style>
