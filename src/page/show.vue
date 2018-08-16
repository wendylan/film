<script>
    import formatTime from '../utils/formatTime.js';
    import ShowingItem from '../components/showingItem.vue';
    import { mapState } from 'vuex'
    import { AjaxPlugin, Loading, Divider } from 'vux';
    export default {
        data(){
            return {
                films: [],
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.isLoading
            })
        },
        components:{
            Loading,
            Divider,
            ShowingItem,
        },
        methods:{
            // 获取初始数据
            getInitData(){
                this.$store.commit('updateLoadingStatus', {isLoading: true});
                let isLoad = true;
                let oldDate = '';
                let data = localStorage.getItem('in_theaters_movie');
                let date = formatTime.toDate(new Date(), '/');
                
                if(data){
                    oldDate = data.substring(0, 10);
                    data = JSON.parse(data.substring(11));
                }
                if(data && oldDate == date){
                    isLoad = false;
                }
                if(isLoad){
                    var _this = this;
                    AjaxPlugin.$http.get(this.HOME+'/movie/in_theaters').then((res) => {
                        let result = date+'='+ JSON.stringify(res.data.subjects);
                        localStorage.setItem('in_theaters_movie', result);
                        _this.films = res.data.subjects;
                        _this.$store.commit('updateLoadingStatus', {isLoading: false});
                    });
                }else{
                    this.films = data;
                    console.log(data);
                    this.$store.commit('updateLoadingStatus', {isLoading: false});
                }
            },
        },
        mounted(){
            this.getInitData();
        },
    }
</script>
<template>
    <div>
        <ul id="showing">
            <li class="showing-li" v-for="(film, index) in films" :key="index">{{film.title}}
                <ShowingItem :film="film"></ShowingItem>
            </li>
            <loading v-model="isLoading"></loading>
            <Divider v-show="!isLoading">已经到底部啦</Divider>
        </ul>
        <loading v-model="isLoading"></loading>
    </div>    
</template>
<style>
ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    padding: 1rem 0.7rem 0;
    margin-bottom: 54px;
}
.showing-li {
    width: 100%;
}
</style>

