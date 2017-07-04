<template>
	<div id="my-point">
		积分页
	</div>
</template>

<script>
    import { pointGoodsDetail } from '../../../service/getData'
    import { mapState } from 'vuex'

    let isBeginExchange = true;
    
    export default {
    	data(){
    		return {
    			pointGoodsArr: [],		// 商品介绍
    		}
    	},
    	compute: {
    		...mapState([
    			'userInfo'
			])
    	},
    	mounted(){
    		this.initData();
    	},
    	methods: {
    		async initData(){
    			
    		},
    	},
    	watch: {
    		userInfo: function(){
    			// this.initData();
    		},
    	},
    }
</script>

<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';
	
	
</style>