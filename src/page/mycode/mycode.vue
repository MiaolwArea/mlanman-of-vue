<template>
    <div id="mycode">
        <div id="qrcode-show-view" v-show="!isSelect">
            <img :src="qrcodeimgSrc" width="100%">
            <a id="qrcode_menu" class="fz16" @click="isSelect = true">更多样式 ></a>
        </div>
        <div id="qrcode-select-view" class="fz16" v-show="isSelect">
            <p class="tac qrcode-title">选择二维码样式</p>
            <a class="iconfont icon-arrow-left" href="javascript:void(0)">&#xe61d;</a> 
            <a class="iconfont icon-arrow-right" href="javascript:void(0)">&#xe61b;</a>
            <div class="qrcode-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" data-type="<?php echo $rows['type'] ?>">
                        <img src="<?php echo $rows['default'] ?>"/>
                    </div>
                </div>
            </div>
            <a id="select_qrcode" class="btn-qrcode-select">确定选择</a>
        </div>
        <footer-nav></footer-nav>   
    </div>
</template>

<script>
	import footerNav from '../../components/footer/footerNav'
    import {qrcodeimg} from '../../service/getData'
    import '../../assets/plugins/swiper.min.js'
    // import '../../assets/style/swiper.min.css'

    export default {
    	data(){
            return{
                qrcodeimgSrc: null,     // 生成二维码预览图    
                isSelect: false,        // 是否开启更换样式页  
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
                let qrcodeimgRes = await qrcodeimg();
                this.qrcodeimgSrc = qrcodeimgRes.data
            }
        },
    }
</script>
<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';

    #qrcode_menu{
        position: fixed;
        top: strip-rem(10px);
        right: strip-rem(10px);
        text-align: center;
        background-color: #fff;
        color: #000;
        padding: strip-rem(10px);
        border-radius: strip-rem(5px);
    }
    #qrcode-select-view{
        .qrcode-title{
            margin-top: strip-rem(30px);
        }
    }
</style>