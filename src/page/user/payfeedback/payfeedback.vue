<template>
<transition name="lf-slid" mode="out-in">
	<div id="payfeedback" class="header-height children-view">
		<head-top head-title="售后纪录" go-back='true'></head-top>
		<section>
            <ul class="payfeedback-list">
                <li class="payfeedback-item" v-for="item in payfeedbackList" :key="item.id">
                    <div class="header padd-all-1010 fz14 color-bg-gray">
                        <span class="color-ft-a3">处理状态：</span>
                        <span>{{ item.status }}</span>
                    </div>
                    <div class="container lr-col padd-all-1010">
                        <div class="info fz14">
                            <p>订单编号：{{ item.order_No }}</p>
                            <p>售后类型：{{ item.type }}</p>
                            <p>申请时间：{{ item.date | formatDate('yyyy-MM-dd hh:mm:ss') }}</p>
                        </div>
                        <i class="iconfont link-icon fz20 color-ft-a3"> &#xe60e;</i>
                    </div>
                </li>
            </ul>      
        </section>
		<loading v-show="isLoading"></loading>
		<alert-tip :isShow="showAlert" @closeTip="showAlert = false" @sureTip="sureTip" :alertText="alertText"></alert-tip>
	</div>
</transition>
</template>

<script>
import headTop from '@/components/header/head'
import { getPayfeedbackList } from '@/service/getData'
import { mapState, mapGetters } from 'vuex'
import alertTip from '@/components/common/alertTip'
import { formatDate } from '@/components/common/mixin'

    export default {
    	data(){
            return{
	            showAlert: false,           // 是否显示弹窗
                alertText: null,            // 弹框文本内容
                payfeedbackList: null,
            }
        },
        components: {
        	headTop,
            alertTip,
        },
        mixins: [ formatDate ],
        mounted(){
            
        },
        computed: {
	        ...mapGetters([ 'isLoading' ]),
        	...mapState([
        		'userInfo',
    		]),
        },
        methods: {
        	async initData(){
                let getPayfeedbackListRes = this._ajaxDoSomething(await getPayfeedbackList()).data;

                this.payfeedbackList = [...getPayfeedbackListRes];
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

    .payfeedback-item{
        .info{
            line-height: 1.7;
        }
    }
</style>