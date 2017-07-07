import {
	getUser,
	getUserByNull
} from '../service/getData'
import {
	GET_USERINFO,
} from './mutation-types.js'
import { getStore, } from '../assets/config/mUtils'

export default {
	async getUserInfo({
		commit,
		state
	}) {
		let res;
		if(getStore('login') == 'true'){
			res = await getUser();
		}else{
			res = await getUserByNull();
		}
		commit(GET_USERINFO, res)
	},
}