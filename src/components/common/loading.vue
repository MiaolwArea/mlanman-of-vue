<template>
	<div class="loading_container">
	    <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<g id="circle" class="g-circles g-circles--v1">
				<circle id="12" transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) " cx="35" cy="16.6987298" r="10"></circle>
				<circle id="11" transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) " cx="16.6987298" cy="35" r="10"></circle>
				<circle id="10" transform="translate(10, 60) rotate(-90) translate(-10, -60) " cx="10" cy="60" r="10"></circle>
				<circle id="9" transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) " cx="16.6987298" cy="85" r="10"></circle>
				<circle id="8" transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) " cx="35" cy="103.30127" r="10"></circle>
				<circle id="7" cx="60" cy="110" r="10"></circle>
				<circle id="6" transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) " cx="85" cy="103.30127" r="10"></circle>
				<circle id="5" transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) " cx="103.30127" cy="85" r="10"></circle>
				<circle id="4" transform="translate(110, 60) rotate(-90) translate(-110, -60) " cx="110" cy="60" r="10"></circle>
				<circle id="3" transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) " cx="103.30127" cy="35" r="10"></circle>
				<circle id="2" transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) " cx="85" cy="16.6987298" r="10"></circle>
				<circle id="1" cx="60" cy="10" r="10"></circle>
			</g>

	    	<use xlink:href="#circle" class="use"/>
	  	</svg>
	</div>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        mounted(){
        	
        }
    }
</script>

<style lang="scss" scoped>
    @import '~assets/style/mixin';

	$max: 12;
	$size: 120px;
	$fill: #fff;
	svg {
		position: absolute;
		height: strip-rem(30px);
		width: strip-rem(30px);
		overflow: visible;
    	top: 50%;
    	left: 50%;
    	transform: translate(-50%, -50%);
  	}
    .loading_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background-color: rgba(255, 255, 255, .3);
    }
  	.g-circles {
		transform: scale(.9) translate(7px, 7px);
	}
	circle {
		fill: $fill;
		fill-opacity: 0;
		animation: opacity 1.2s linear infinite;
		
		@for $item from 1 through $max {
			&:nth-child(#{$max}n + #{$item}){
				animation-delay: -#{$item/10}s;
			}
		}
	}
	@keyframes opacity {
	  3% {
	    fill-opacity: 1;
	  }
	  75% {
	    fill-opacity: 0;
	  }
	  
	}
</style>