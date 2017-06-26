<template>
    <div id="mycode">
        <div id="qrcode-show-view" v-show="!isSelect">
            <img :src="qrcodeimgSrc" width="100%">
            <a id="qrcode_menu" class="fz16" @click="isSelect = true">更多样式 ></a>
        </div>
        <div id="qrcode-select-view" class="fz16" v-show="isSelect">
            <p class="tac qrcode-title">选择二维码样式</p>
            <a class="iconfont pa-t icon-arrow-left" @click="swiperAction('prev')">&#xe61d;</a> 
            <a class="iconfont pa-t icon-arrow-right" @click="swiperAction('next')">&#xe61b;</a>
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
        <alert-tip v-show="showAlert" @sureTip="sureTip" :alertText="alertText"></alert-tip>
        <footer-nav :isShopcart="false"></footer-nav>   
    </div>
</template>

<script>
	import footerNav from '../../components/footer/footerNav'
    import alertTip from '../../components/common/alertTip'
    import { qrcodeimg, getQrcodeimgs, selectedQrcodeimg } from '../../service/getData'
    import { Swiper, SwiperItem } from 'vux'
    import { mapState, mapMutations } from 'vuex'

    export default {
    	data(){
            return{
                showAlert: false,       // 是否显示弹窗
                alertText: null,        // 弹框文本内容
                qrcodeimgSrc: null,     // 生成二维码预览图    
                isSelect: false,        // 是否开启更换样式页  
                qrcodeimgAry: [],       // 可选生成二维码图数组
            }
        },
        components: {
        	footerNav,
            alertTip,
            Swiper,
            SwiperItem,
        },
        mounted(){
            this.initData();
        },
        computed: {
            ...mapState([
                'userInfo', 'picIndex'
            ])
        },
        methods: {
            ...mapMutations([
                'SWIPER_ACTION'
            ]),
            // 初始化数据
            async initData(){
                let qrcodeimgRes = await qrcodeimg();
                this.qrcodeimgSrc = qrcodeimgRes.data;

                let getQrcodeimgsRes = await getQrcodeimgs();
                this.qrcodeimgAry = getQrcodeimgsRes.data;
            },
            // 滑动动作
            onIndexChange(index){
                this.SWIPER_ACTION({
                    index: index
                });
            },
            // 滚图动作
            swiperAction(position){
                this.SWIPER_ACTION({
                    actionNum: position,
                    picItem: this.qrcodeimgAry.length
                });
            },
            // 选择样式
            async selected(){
                let selectedQrcodeimgRes = await selectedQrcodeimg(this.userInfo.user_id, this.qrcodeimgAry[this.picIndex].id);

                if(selectedQrcodeimgRes.data = "success"){
                    this.showAlert = true;
                    this.alertText = "选择成功！"
                }
            },
            sureTip(){
                this.isSelect = false;
                this.showAlert = false;
                this.initData();
            }
        },
        watch: {
            userInfo: function (value){
                // this.initData();
            }
        }
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