<template>
    <div id="goods-detial">
        
        <alert-tip v-show="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <footer-nav :isShopcart="false"></footer-nav>   
    </div>
</template>

<script>
	import footerNav from '../../components/footer/footerNav'
    import alertTip from '../../components/common/alertTip'
    import {  } from '../../service/getData'
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
            // this.initData();
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
        },
        watch: {
            userInfo: function (value){
                this.initData();
            }
        }
    }
</script>
<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';

    
</style>