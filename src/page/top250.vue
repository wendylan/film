<script>
import formatTime from '../utils/formatTime.js';
import { mapState } from 'vuex';
import { AjaxPlugin, Tab, TabItem, Loading, Divider } from 'vux';

export default {
    components: {
        Tab,
        TabItem,
        Loading,
        Divider,
    },
    computed:{
        ...mapState({
            isLoading: state => state.isLoading
        })
    },
    data(){
        return {
            films: [],
            start: 0,
            max: 50,
            count: 50
        }
    },
    methods:{
        getInitData(){
            this.$store.commit('updateLoadingStatus', {isLoading: true});
            let isLoad = true;
            let oldDate = '';
            let data = localStorage.getItem('top250');
            let date = formatTime.toDate(new Date(), '/');
            
            if(data){
                oldDate = data.substring(0, 10);
                data = JSON.parse(data.substring(11));
            }
            if(data && oldDate == date){
                isLoad = false;
            }
            if(isLoad){
                let _this = this;
                AjaxPlugin.$http.get(this.HOME+'/movie/top250?'+ 'start=' + start + '&count=' + count).then((res) => {
                    let result = date+'='+ JSON.stringify(res.data.subjects);
                    localStorage.setItem('top250', result);
                    _this.films = res.data.subjects;
                    _this.$store.commit('updateLoadingStatus', {isLoading: false});
                });
            }else{
                this.films = data;
                console.log(data);
                this.$store.commit('updateLoadingStatus', {isLoading: false});
            }
        },
        onItemClick (index) {
            console.log('on item click:', index)
        },
    },
    mounted(){
        // this.getInitData();
    },
}
</script>
<template>
    <div>
        <tab :line-width="1">
            <tab-item selected><img src="../assets/top.png" >1~50</tab-item>
            <tab-item>51~100</tab-item>
            <tab-item>101~150</tab-item>
            <tab-item>151~200</tab-item>
            <tab-item>201~250</tab-item>
        </tab>
        <ul>
            <li class="top-li" v-for="(film, i) in films" :key="i">
                <TopItem :film="film" :num="i" :start="start"></TopItem>
            </li>
            <Divider v-show="count==max&&!isLoading">已经到底部啦</Divider>
        </ul>
        <loading v-model="isLoading"></loading>
        <!-- <Divider v-show="!isLoading">已经到底部啦</Divider> -->
    </div>
</template>
<style>

</style>

