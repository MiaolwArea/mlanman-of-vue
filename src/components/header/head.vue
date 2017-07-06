<template>
    <header id='head_top'>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        <section class="title_head ellipsis fz16" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
    </header>
</template>

<script>

    export default {
    	data(){
            return{

            }
        },
        mounted(){

        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            
        },
        methods: {
           
        },

    }

</script>

<style lang="scss" scoped>
    @import '~assets/style/mixin.scss';

    #head_top{
        background-color: #6f6f6f;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: strip-rem(40px);
    }
    .head_goback{
        height: strip-rem(40px);
        padding: strip-rem(10px);
    }
    .head_login{
        
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        .title_text{
            color: #fff;
            text-align: center;
            font-weight: bold;
        }
    }
</style>
