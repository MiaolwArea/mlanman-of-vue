<template>
	<footer>
		<div class="footer-box tac fz14">
			<div class="contact-tel">
				<span>全球服务联系电话：400－700－0825</span>
			</div>
			<div class="lanman-footer-logo">
				<img src="~assets/images/common/lanman-footer-logo.png" alt="">	
			</div>
		</div>
	</footer>
</template>

<script>
    export default {
    	data(){
            return{
                
            }
        },
    }
</script>
<style lang="scss" scoped>
	@import '~assets/style/mixin.scss';

    .footer-box{
    	@include remCalc('padding-top', 25);
    	span{
    		color: #a3a3a3;
    	}
    	.lanman-footer-logo{
    		@include remCalc('width', 165);
    		@include remCalc('margin', 35, 'auto', 0);
    		@include remCalc('padding-bottom', 25);
    	}
    }
</style>