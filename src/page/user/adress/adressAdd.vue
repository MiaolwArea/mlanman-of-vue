<template>
	<div id="adress-list" class="header-height children-view">
		<head-top :head-title="headerTitile" go-back='true'></head-top>
		<form @submit.prevent="submit" class="padd-lr">
            <ul class="address-item-list">
                <li class="goods-item">
                    <label class="fz16 fw">收货人</label>
                    <input class="consignee color-bg-gray mt10 fz14" type="text" placeholder="必填" v-model="userAdress.consignee" />
                </li>
                <li class="goods-item">
                    <label class="fz16 fw">联系电话</label>
                    <input class="consignee color-bg-gray mt10 fz14" type="text" placeholder="必填" v-model="userAdress.phoneNum" />
                </li>
                <li class="goods-item">
                    <label class="fz16 fw">邮政编码</label>
                    <input class="consignee color-bg-gray mt10 fz14" type="text" placeholder="选填" v-model="userAdress.postcode" />
                </li>
                <li class="goods-item">
                    <label class="fz16 fw">所在城市</label>
                    <input class="consignee color-bg-gray mt10 fz14"  @click="showChangeBlock = true" type="text" v-model="userAdress.city" />
                </li>
                <li class="goods-item">
                    <label class="fz16 fw">详细地址</label>
                    <input class="consignee color-bg-gray mt10 fz14" type="text" placeholder="必填" v-model="userAdress.address" />
                </li>
            </ul>   
            
            <input class="add-btn fz14 color-bg-lightgray mt10" type="submit" value="保存">
        </form>
        <!-- 选择城市 -->
        <transition name="fade">
            <div class="specs_cover" @click="showChangeBlock = false" v-if="showChangeBlock"></div>
        </transition>
        <transition name="fadeBounce">
            <div class="specs_list" v-show="showChangeBlock">
                <header class="specs_list_header">
                    <h4 class="ellipsis fz16 tac color-ft-black">选择所在城市</h4>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1"class="specs_cancel" @click="showChangeBlock = false">
                        <line x1="0" y1="0" x2="16" y2="16"  stroke="#666" stroke-width="1.2"/>
                        <line x1="0" y1="16" x2="16" y2="0"  stroke="#666" stroke-width="1.2"/>
                    </svg>
                </header>
                <section class="specs_details">
                    <div class="city-box">
                        <picker :data="cityList" :columns=3 v-model="cityVal" @on-change="change" ref="picker1"></picker>
                    </div>
                </section>
                <footer class="specs_footer">
                    <div class="update_num fz16" @click="changeCityAlertSure()">确认</div>
                </footer>
            </div>
        </transition>
		<loading v-show="isLoading"></loading>
		<alert-tip :isShow="showAlert" @closeTip="showAlert = false" @sureTip="sureTip" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
import headTop from '@/components/header/head'
import { getAdressInfo } from '@/service/getData'
import { mapState, mapGetters } from 'vuex'
import { Picker } from 'vux'
import alertTip from '@/components/common/alertTip'
import { cityList } from '@/assets/applicationUtil/city'

    export default {
    	data(){
            return{
	            showAlert: false,           // 是否显示弹窗
                alertText: null,            // 弹框文本内容
                userAdress: {               // 地址信息map
                    consignee: '',          // 收货人
                    phoneNum: '',           // 手机号码
                    postcode: null,         // 邮政编码
                    city: '',               // 省份城市
                    address: ''             // 详细地址
                },
                cityVal: [],                // 选中城市数据
                cityList: cityList,         // 城市列表数据
                showChangeBlock: false,     // 是否显示数量输入框
            }
        },
        components: {
        	headTop,
            alertTip,
            Picker,
        },
        mounted(){
            
        },
        computed: {
	        ...mapGetters([ 'isLoading' ]),
        	...mapState([
        		'userInfo',
    		]),
    		headerTitile(){ 
    			return this._isEmptyObject(this.$route.query) ? '添加地址信息' : '编辑地址信息';
    		}
        },
        methods: {
        	async initData(){
                let getAdressInfoRes = this._ajaxDoSomething(await getAdressInfo()).data;

                this.userAdress = getAdressInfoRes;
                // TODO 做一个城市转化为['val1', 'val2', 'val3']
                // this.cityVal = ['fj', 'xm', 'huli']
                // this.sureCity = ['fj', 'xm', 'huli']
        	},
        	sureTip(){
                this.$router.go(-1);
        	},
            // 保存
            submit(){
                let adressInfo = JSON.stringify(this.userAdress);
                // TODO 传送给后台做保存
                this.showAlert = true;
                this.alertText = '保存成功！'
            },
            change (value) {
                this.sureCity = value[0] + value[1] + value[2];
            },
            changeCityAlertSure(){
                this.userAdress.city = this.$refs.picker1.getNameValues().replace(/\s/g, "");
                this.showChangeBlock = false;
            }
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

	.address-item-list{
        label{
            display: block;
        }
        input{
            width: 100%;
            height: strip-rem(35px);
            padding: 0 strip-rem(5px);
        }
    }
    .add-btn{
        display: block;
        text-align: center;
        height: strip-rem(40px);
        line-height: strip-rem(40px);
        width: 100%;
    }
    .specs_list{
        h4{
            padding: strip-rem(10px);
        }
        .specs_details{
            padding: 0;
        }
        .update_num{
            background-color: #000;
            width: 50%;
            height: strip-rem(30px);
            line-height: strip-rem(30px);
            text-align: center;
            margin: strip-rem(20px) auto;
        }
    }
</style>