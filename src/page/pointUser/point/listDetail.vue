<template>
	<div id="point-list-detail" class="children-view">
		<section>
			<router-link tag="p" class="get-point fz14 tac" :to="{path: '/pointUser'}">如何获得更多积分</router-link>
		</section>
	</div>
</template>

<script>
    import { pointGoods } from '../../../service/getData'
    import { mapState } from 'vuex'

    export default {
    	data(){
    		return {
    			
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
    			const _this = this;
    			let pointGoodsRes = await pointGoods(this.userInfo)
    				, pointGoodsData = pointGoodsRes.data;

    			
    		},
    	},
    	watch: {
    		userInfo: function(){
    			// this.initData();
    		}
    	},
    }
</script>

<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';
	
	.get-point{
		@include remCalc('padding', 10, 15);
	}
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: scale(2, 2);
        opacity: 0;
    }
</style>