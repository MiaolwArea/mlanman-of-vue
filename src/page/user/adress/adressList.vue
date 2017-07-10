<template>
<transition name="lf-slid" mode="out-in">
	<div id="adress-list" class="header-height bg-gray children-view">
        <template v-show="isChildren">
    		<head-top head-title="地址管理" go-back='true'></head-top>
    		<section class="address-list-block color-bg-black">
    			<ul class="padd-lr">
    				<li v-for="(item, index) in adressList" :key="item.id" class="goods-item">
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
    							<input type="radio" name="isDefault" @click="setDefault(item.id, index)" :checked="item.isDefault" :value="item.id" class="set-default-address"/>
                                <label class="fz14">{{ index == 0 ? '默认地址' : '设为默认地址' }}</label>
    						</div>
    						<div class="control lr-col">
    							<router-link :to="{path: '/user/adress/edit', query: {id: item.id}}" class="mr5">
    								<label class="iconfont icon icon-bg ft-26">&#xe611;</label>
                                	<label class="fz14">编辑</label>
    							</router-link>
    							<a @click="delAdress(item.id, item.isDefault)">
    								<label class="iconfont icon icon-bg ft-26">&#xe60f;</label>
                                	<label class="fz14">删除</label>
    							</a>
    						</div>
    					</div>
    				</li>
    			</ul>
    		</section>
    		<section class="add-adress">
    			<router-link class="add-btn fz14 color-bg-black" :to="{path: '/user/adress/add'}">添加</router-link>	
    			<router-link class="add-btn fz14 color-bg-lightgray" :to="{path: ''}">导入微信地址</router-link>
    		</section>
    		<loading v-show="isLoading"></loading>
    		<alert-tip 
                :isShow="showAlert" 
                :confirmModel="confirmModel"
                @closeTip="showAlert = false" 
                :isConfirm="false" 
                @sureTip="sureTip" 
                :alertText="alertText"></alert-tip>
        </template>
        <!-- 编辑/添加地址 -->
        <transition name="lf-slid">
            <router-view></router-view>
        </transition>
	</div>
</transition>
</template>

<script>
import headTop from '@/components/header/head'
import { getAdress, setDefaultAdress } from '@/service/getData'
import { mapState } from 'vuex'
import alertTip from '@/components/common/alertTip'

    export default {
    	data(){
            return{
                confirmModel: 1,        // 弹框模式
                isChildren: true,       // 是否有子路由
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
        	setDefault(id, index){
                let adressList = this.adressList;

                for(let i in adressList){
                    if(id == adressList[i].id){
                        adressList[i].isDefault = true
                    }else{
                        adressList[i].isDefault = false
                    }
                }
                this.adressList[0] = this.adressList.splice(index, 1, this.adressList[0])[0]
        		// TODO 根据传进来的ID请求后台设置默认地址, 返回成功可以是新地址列表数据来更新this.adressList，上面是前端更新方式
                // let setDefaultAdressRes = this._ajaxDoSomething(await setDefaultAdress(id)).data;
        		// this.adressList = [...setDefaultAdressRes];
        	},
        	sureTip(){
                // TODO 删除地址
                this.showAlert = false;
        		console.log(this.delAdressID)
        	},
            delAdress(id, isDefault){
                let _this = this;

                if(isDefault){
                    _this.confirmModel = 2;
                    _this.showAlert = !_this.showAlert;
                    _this.alertText = `默认地址不允许删除！`;
                    return ;
                }
                _this.confirmModel = 1;
                _this.showAlert = true;
                _this.alertText = `确定要删除所选地址吗？`;
                _this.delAdressID = id;
            }
        },
        watch: {
        	userInfo(val){
        	    this.loginState = !this._isEmptyObject(val);
        	    if (this.loginState) {
        	        this.initData()
        	    }
        	},
            $route: function(to, from) {
                this.isChildren = !this.isChildren;
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