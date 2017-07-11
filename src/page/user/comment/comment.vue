<template>
<transition name="lf-slid" mode="out-in">
    <div id="comment" class="header-height children-view">
        <head-top head-title="我的评价" go-back='true'></head-top>
        
        <loading v-show="isLoading"></loading>
        <alert-tip :isShow="showAlert" @closeTip="showAlert = false" @sureTip="sureTip" :alertText="alertText"></alert-tip>
    </div>
</transition>
</template>

<script>
import headTop from '@/components/header/head'
import {  } from '@/service/getData'
import { mapState } from 'vuex'
import alertTip from '@/components/common/alertTip'

    export default {
        data(){
            return{
                showAlert: false,           // 是否显示弹窗
                alertText: null,            // 弹框文本内容
            }
        },
        components: {
            headTop,
            alertTip,
        },
        mounted(){
            
        },
        computed: {
            ...mapState({
                isLoading: state => state.loading.isLoading
            }),
            ...mapState([
                'userInfo',
            ]),
        },
        methods: {
            async initData(){
                
            },
            sureTip(){
                this.$router.go(-1);
            },

        },
        watch: {
            userInfo(val){
                this.loginState = !this._isEmptyObject(val);
                if (this.loginState) {
                    this.initData()
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '~assets/style/mixin.scss';

    
</style>