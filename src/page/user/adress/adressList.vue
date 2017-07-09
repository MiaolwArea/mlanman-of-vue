<template>
	<div id="adress-list" class="header-height bg-gray">
		<head-top head-title="地址管理" go-back='true'></head-top>
		<section class="address-list-block color-bg-black">
			<ul class="padd-lr">
				<li v-for="item in adressList" :key="item.id" class="goods-item">
					<div class="receive-info">
					    <div class="receive fz16">
					        <span class="color-ft-a3">收货人：{{ item.consignee }} 手机：{{ item.phone_num }}</span>
					    </div>
					    <div class="receive-address mt5 fz14">
					        <span class="color-ft-a3">收货地址：{{ item.adress }}</span>
					    </div>    
					</div>
					<div class="address-operate mt10 lr-col">
						<div class="set-default">
							<input type="radio" name="isDefault" @click="setDefault(item.id)" :checked="item.isDefault" :value="item.id" class="set-default-address"/>
                            <label class="fz14">默认地址</label>
						</div>
						<div class="control lr-col">
							<a class="mr5">
								<label class="iconfont icon icon-bg ft-26">&#xe611;</label>
                            	<label class="fz14">编辑</label>
							</a>
							<a>
								<label class="iconfont icon icon-bg ft-26">&#xe60f;</label>
                            	<label class="fz14">删除</label>
							</a>
						</div>
					</div>
				</li>
			</ul>
		</section>
		<section class="add-adress">
			<router-link class="add-btn fz14 color-bg-black" :to="{path: ''}">添加</router-link>	
			<router-link class="add-btn fz14 color-bg-lightgray" :to="{path: ''}">导入微信地址</router-link>	
		</section>
		<loading v-show="isLoading"></loading>
		<alert-tip :isShow="showAlert" @closeTip="showAlert = false" :isConfirm="false" @sureTip="sureTip" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
import headTop from '@/components/header/head'
import { getAdress } from '@/service/getData'
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
    		])
        },
        methods: {
        	async initData(){
                let getAdressRes = this._ajaxDoSomething(await getAdress()).data;

                this.adressList = [...getAdressRes];
        	},
        	setDefault(id){
        		// TODO 根据传进来的ID设置默认地址
        		console.log(id);
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

	.mr5{
		margin-right: strip-rem(15px);
	}
    .address-operate{
    	border-top: 1px solid #333;
    	padding-top: strip-rem(10px);
    	.set-default{
    		input, span{
    			vertical-align: middle;
    		}
    	}
    	.set-default-address{
    		@include wh(15px, 15px);
    		background-color: #ccc;
    		border: 0;
    		border-radius: 0;
    		margin-right: strip-rem(3px);
    	}
    	.icon{
    		display: inline-block;
    		@include wh(15px, 15px);
    		background-color: #474747;
    		text-align: center;
    		margin-right: strip-rem(3px);
    	}
    }
    .add-adress{
    	margin-top: strip-rem(20px);
    }
    .add-btn{
    	display: block;
    	text-align: center;
    	margin: strip-rem(10px);
    	height: strip-rem(40px);
    	line-height: strip-rem(40px);
    }
</style>