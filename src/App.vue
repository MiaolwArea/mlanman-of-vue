<template>
	<div id="main">
		<router-view></router-view>
		<loading v-if="isLoading"></loading>
	</div>
</template>

<script>
import loading from './components/common/loading'
import { mapState } from 'vuex'

export default {
	components: {
	    loading
	},
	computed: {
	    ...mapState({
	    	isLoading: state => state.loading.isLoading
	    })
	}
}
</script>

<style lang="scss">
  @import './assets/style/common';
</style>
