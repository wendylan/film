<script>
import { Flexbox, FlexboxItem, Divider } from "vux";
import Rate from '../components/rate.vue';
export default {
    props: ["film"],
    components: {
        Rate,
        Flexbox,
        FlexboxItem,
        Divider
    },
    data() {
        return {
            director: '',
            cast: '',
        };
    },
    methods:{
        clickItem: function () {
            this.$router.push({ path: '/filmInfo', query: { id: this.film.id } });
            this.$store.commit('updateBackStatus', {isShowBack: true});
        },
        getData(){
            this.director = this.film.directors.map((value) => {
                return value.name;
            }).join(' / ');
            this.cast = this.film.casts.map((value) => {
                return value.name;
            }).join(' / ');
        },
    },
    mounted(){
        this.getData();
        this.$store.commit('updateBackStatus', {isShowBack: false})
    },
};
</script>
<template>
    <div class="film_box" @click="clickItem">
        <flexbox>
            <flexbox-item :span="3">
                <img class="image" :src="film.images.medium">
            </flexbox-item>
            <flexbox-item>
                <div class="title-year">
                    <span class="title">{{film.title}}</span>
                    <span class="year">{{film.year}}</span>
                </div>
                <div class="rate">
                    <Rate :score="film.rating.average"></Rate>
                    <span class="num">({{film.collect_count}}人评价)</span>
                </div>
                <p class="director">导演 {{director}}</p>
                <p class="cast">主演 {{cast}}</p>
            </flexbox-item>
        </flexbox>
    </div>
</template>
<style lang="less">
.film_box{
    font-size: 1rem;
    overflow: hidden;
    margin-bottom: 1rem;
    border: 0.02rem solid #DDD;
    border-radius: 0.3em;
    width: 100%;
    background-color: #FFF;
}
.image {
    width: 7.5rem;
    height: 10.5rem;
    line-height: 10.5rem;
    border-radius: 0.3em;
}
.title-year {
    margin: 0.5rem 0;
    .title {
        font-size: 1.05rem;
    }
    .year {
        font-size: 0.9rem;
        color: #666;
    }
}
.director {
    margin-top: 0.8rem;
}

.director, .cast {
    width: 67%; 
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
}
</style>

