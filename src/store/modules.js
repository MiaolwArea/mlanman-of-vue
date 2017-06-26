// 全局请求loading模块
const loadingModule = {
	state: {
	    isLoading: false
	},
	mutations: {
		updateLoadingStatus (state, payload) {
			state.isLoading = payload.isLoading
		}
	}
}

export default {
    loading:loadingModule
}