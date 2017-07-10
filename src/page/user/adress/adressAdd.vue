<template>
	<div id="adress-list" class="children-view">
		<head-top :head-title="headerTitile" go-back='true'></head-top>
		12
		<loading v-show="isLoading"></loading>
		<alert-tip :isShow="showAlert" @closeTip="showAlert = false" :isConfirm="false" @sureTip="sureTip" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
import headTop from '@/components/header/head'
import {  } from '@/service/getData'
import { mapState } from 'vuex'
import alertTip from '@/components/common/alertTip'

    export default {
    	data(){
            return{
                adressList: [],			// 地址列表
	            showAlert: false,       // 是否显示弹窗
	            alertText: null,        // 弹框文本内容
            }
        },
        components: {
        	headTop,
            alertTip,
        },
        computed: {
	        ...mapState({
	            isLoading: state => state.loading.isLoading
	        }),
        	...mapState([
        		'userInfo',
    		]),
    		headerTitile(){
    			return this._isEmptyObject(this.$route.query) ? '添加地址信息' : '编辑地址信息';
    		}
        },
        methods: {
        	async initData(){
                
        	},
        	sureTip(){
        		
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