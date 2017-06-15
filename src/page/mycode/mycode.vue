<template>
    <div id="mycode">
        <div id="qrcode-show-view" v-show="!isSelect">
            <img :src="qrcodeimgSrc" width="100%">
            <a id="qrcode_menu" class="fz16" @click="isSelect = true">更多样式 ></a>
        </div>
        <div id="qrcode-select-view" class="fz16" v-show="isSelect">
            <p class="tac qrcode-title">选择二维码样式</p>
            <a class="iconfont pa-t icon-arrow-left" @click="prev">&#xe61d;</a> 
            <a class="iconfont pa-t icon-arrow-right" @click="next">&#xe61b;</a>
            <swiper 
                height="11rem" 
                v-model="picIndex"
                direction="horizontal" 
                class="pic-swiper" 
                @on-index-change="onIndexChange"
                loop
                :show-dots="false">
                <swiper-item v-for="item in qrcodeimgAry" :key="item.id">
                    <img :src="item.img_url">
                </swiper-item>
            </swiper>
            <div class="btn-qrcode-select tac" @click="selected">确定选择</div>
        </div>
        <footer-nav :isShopcart="false"></footer-nav>   
    </div>
</template>

<script>
	import footerNav from '../../components/footer/footerNav'
    import { qrcodeimg, getQrcodeimgs, selectedQrcodeimg } from '../../service/getData'
    import { Swiper, SwiperItem } from 'vux'

    export default {
    	data(){
            return{
                qrcodeimgSrc: null,     // 生成二维码预览图    
                isSelect: false,        // 是否开启更换样式页  
                qrcodeimgAry: [],       // 可选生成二维码图数组
                picIndex: 0,            // 切换图片索引值
            }
        },
        components: {
        	footerNav,
            Swiper,
            SwiperItem,
        },
        mounted(){
            this.initData();
        },
        methods: {
            // 初始化数据
            async initData(){
                let qrcodeimgRes = await qrcodeimg();
                this.qrcodeimgSrc = qrcodeimgRes.data;

                let getQrcodeimgsRes = await getQrcodeimgs();
                this.qrcodeimgAry = getQrcodeimgsRes.data;
            },
            // 滑动切图
            onIndexChange(index){
                this.picIndex = index;
            },
            // 上一张
            prev(){
                if(this.picIndex == 0){
                    this.picIndex = this.qrcodeimgAry.length - 1;
                }else{
                    this.picIndex--;
                }
            },
            // 下一张
            next(){
                if(this.picIndex == (this.qrcodeimgAry.length - 1)){
                    this.picIndex = 0;
                }else{
                    this.picIndex++;
                }
            },
            // 选择样式
            async selected(){
                let selectedQrcodeimgRes = await selectedQrcodeimg(useId, this.qrcodeimgAry[this.picIndex].id);
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
        .pa-t{
            position: absolute;
            top: 35%;
        }
        .pic-swiper{
            width: strip-rem(200px);
            margin: strip-rem(20px) auto;
        }
        .icon-arrow-left{
            left: strip-rem(30px);
        }
        .icon-arrow-right{
            right: strip-rem(30px);
        }
        .btn-qrcode-select{
            width: strip-rem(250px);
            height: strip-rem(40px);
            border: 1px solid #fff;
            margin: 0 auto;
            line-height: strip-rem(40px);
        }
    }
</style>