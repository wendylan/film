<script>
import TopItem from '../components/topItem.vue';
import formatTime from '../utils/formatTime.js';
import { mapState } from 'vuex';
import { AjaxPlugin, Tab, TabItem, Loading, Divider } from 'vux';

export default {
    components: {
        TopItem,
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
            count: 25
        }
    },
    computed: {
        ...mapState({
            isLoading: state =>state.isLoading
        })
    },
    methods:{
        getInitData(){
            console.log(this.count);
            var _this = this
            AjaxPlugin.$http.get('https://api.douban.com/v2/movie/top250?' + 'start=' + this.start + '&count=' + this.count).then((res) => {
                _this.films = res.data.subjects
                _this.$store.commit('updateLoadingStatus', {isLoading: false})
            })
        },
        onItemClick (index) {
            console.log('on item click:', index);
            this.films = [];
            this.$store.commit('updateLoadingStatus', {isLoading: true});
            this.count = 25;
            switch (index) {
                case 0:
                    this.start = 0
                    this.max = 50
                    break
                case 1:
                    this.start = 50
                    this.max = 50
                    break
                case 2:
                    this.start = 100
                    this.max = 50
                    break
                case 3:
                    this.start = 150
                    this.max = 50
                    break
                case 4:
                    this.start = 200
                    this.max = 50
                    break
            }
            this.getInitData();
        },
        loadMore: function () {
            var mbody = document.documentElement || document.body;
            var mScrollTop = mbody.scrollTop;
            var mClientHeight = mbody.clientHeight;
            var mScrollHeight = mbody.scrollHeight;
            // console.log(mScrollTop, mClientHeight, mScrollHeight)
            // console.log(mScrollTop + mClientHeight === mScrollHeight)
            if (this.count < this.max && mScrollTop + mClientHeight === mScrollHeight) {
                this.$store.commit('updateLoadingStatus', {isLoading: true});
                this.count += 25;
                console.log(this.count, this.max);
                this.getInitData();
            }
        },
    },
    mounted(){
        this.$store.commit('updateLoadingStatus', {isLoading: true});
        this.getInitData();
    },
    created: function () {
        window.addEventListener('scroll', this.loadMore, false);
    },
    destroyed: function () {
        window.removeEventListener('scroll', this.loadMore, false);
    }
}
</script>
<template>
    <div>
        <tab :line-width="1">
            <tab-item selected  @on-item-click="onItemClick"><img src="../assets/top.png" >1~50</tab-item>
            <tab-item  @on-item-click="onItemClick">51~100</tab-item>
            <tab-item  @on-item-click="onItemClick">101~150</tab-item>
            <tab-item  @on-item-click="onItemClick">151~200</tab-item>
            <tab-item  @on-item-click="onItemClick">201~250</tab-item>
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
<style lang='less'>
ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    padding: 1rem 0.7rem 0;
    margin-bottom: 54px;
    .top-li {
        width: 100%;
    }
}
</style>

