<template>
	<div id="adress-list" class="header-height children-view">
		<head-top head-title="订单列表" go-back='true'></head-top>
		
		<loading v-show="isLoading"></loading>
		<alert-tip :isShow="showAlert" @closeTip="showAlert = false" @sureTip="sureTip" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
import headTop from '@/components/header/head'
import { getOrderList } from '@/service/getData'
import { mapState } from 'vuex'
import alertTip from '@/components/common/alertTip'

    export default {
    	data(){
            return{
	            
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
                let getOrderListRes = this._ajaxDoSomething(await getOrderList()).data;

                this.userAdress = getOrderListRes;
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