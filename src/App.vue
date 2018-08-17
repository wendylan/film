<template>
	<div id="app">
        <x-header 
            style="background-color:#409eff;color:#fff;"
            @on-click-back="clickBack" 
            :left-options="{preventGoBack: true, showBack: isShowBack, backText: ''}">电影资讯
        </x-header>
        <search v-show="!isShowBack"></search>
		<router-view></router-view>
		<navbar v-show="!isShowBack"></navbar>
	</div>
</template>

<script>
import navbar from "./components/navbar.vue";
import search from "./components/search.vue";
import { mapState } from 'vuex';
import { XHeader } from 'vux';
export default {
    name: "app",
    components: {
        navbar,
        search,
        XHeader,
    },
    computed:{
        ...mapState({
            isShowBack: state => state.isShowBack
        })
    },
    methods:{
        clickBack(){
            this.$store.commit('updateBackStatus', {isShowBack: false});
            window.history.go(-1);
        },
    },
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
    background-color: #fbf9fe;
}
#showing, #ready {
  position: absolute;
//   top: 90px;
}
</style>
