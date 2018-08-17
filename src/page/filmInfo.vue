<script>
import { mapState } from 'vuex';
import { AjaxPlugin, Loading, Blur } from 'vux';
import Rate from '../components/rate.vue';
    export default {
        name: 'filmInfo',
        components:{
            Rate,
            Blur,
            Loading,
        },
        computed:{
            ...mapState({
                isLoading: state => state.isLoading
            })
        },
        data(){
            return{
                film: null,
                director: '',
                cast: '',
                type: ''
            }
        },
        methods: {
            getFilmData(){
                this.$store.commit('updateLoadingStatus', { isLoading: true});
                let that = this;
                AjaxPlugin.$http.get(this.HOME + '/movie/subject/'+this.$route.query.id).then((res)=>{
                    console.log(res.data);
                    that.initData(res.data);
                    that.$store.commit('updateLoadingStatus', { isLoading: false});
                });
            },
            initData: function (film) {
                this.film = film
                this.director = this.film.directors.map((value) => {
                    return value.name
                }).join(' / ')
                this.cast = this.film.casts.map((value) => {
                    return value.name
                }).join(' / ')
                this.type = this.film.genres.join(' / ')
            },
        },
        mounted(){
            this.$store.commit('updateBackStatus', {isShowBack: true});
            this.getFilmData();
        },
    }
</script>
<template>
    <div v-if="film!=null">
        <blur :blur-amount=40 :height=340 :url="film.images.large">
            <img class="film-image" :src="film.images.large" >
        </blur>
        <div class="title-info">
            <div class="title-year">
                <span class="title">{{film.title}}</span>
                <span class="year">{{film.year}}</span>
            </div>
            <p class="director">导演 {{director}}</p>
            <p class="cast">主演 {{cast}}</p>
            <p class="type">类型 {{type}}</p>
        </div>
        <div class="douban-rate">
            <p class="rate-title">豆瓣评分</p>
            <Rate :score="film.rating.average"></Rate>
            <p class="nums">{{film.ratings_count}}人评价</p>
        </div>
        <div class="desc">
            <p class="desc-title">简介</p>
            <p class="content">{{film.summary}}</p>
        </div>
        <loading v-model="isLoading"></loading>
    </div>
</template>
<style lang="less">
.film-image {
    width: 210px;
    height: 300px;
    display: table;
    margin: 20px auto;
}
.title-info {
    padding: 0.5rem;
    overflow: hidden;
    font-size: 0.9rem;
    color: #444;
    .title-year {
        padding: 0.6rem 0;
        .title {
            font-weight: bold;
            font-size: 1.2rem;
            color: #000;
        }
    }
}
.douban-rate {
    padding: 0.5rem 0.5rem 0.8rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .rate-title {
        font-size: 0.95rem;
        color: #333;
        padding: 0.2rem 0;
    }
    .nums {
        font-size: 0.9rem;
        color: #555;
    }
}
.desc {
    padding: 0.5rem 0.5rem 0.8rem;
    .desc-title {
        font-size: 0.95rem;
        color: #333;
        padding: 0.2rem 0;
    }
    .content {
        color: #222;
    }
}
</style>

