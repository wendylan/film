<script>
import Rate from './rate'
import { Flexbox, FlexboxItem} from 'vux';

export default {
    props: ['film', 'num', 'start'],
    data () {
        return {
            director: '',
            cast: '',
            type: ''
        }
    },
    components: {
        Rate,
        Flexbox,
        FlexboxItem,
    },
    mounted () {
        this.director = this.film.directors.map((value) => {
            return value.name
        }).join(' / ');
        this.cast = this.film.casts.map((value) => {
            return value.name
        }).join(' / ');
        this.type = this.film.genres.join(' / ');
    },
    methods: {
        clickItem: function () {
            this.$router.push({ path: '/filmInfo', query: { id: this.film.id } });
            this.$store.commit('updateBackStatus', {isShowBack: true});
        }
    }
}
</script>

<template>
    <div class="top-item" @click="clickItem">
        <!-- <div class="left">
            <div class="title-year">
                <span class="rank">No.{{start + num + 1}}</span>
                <span class="title">{{film.title}}</span>
                <span class="year">{{film.year}}</span>
            </div>
            <div class="rate">
                <Rate class="rating" :score="film.rating.average"></Rate>
                <span class="num">({{film.collect_count}}人评价)</span>
            </div>
            <p class="director">导演 {{director}}</p>
            <p class="cast">主演 {{cast}}</p>
            <p class="type">类型 {{type}}</p>
        </div>
        <div class="right">
        <img class="image" :src="film.images.medium" >
        </div> -->

        <flexbox>
            <flexbox-item>
                <div class="title-year">
                    <span class="rank">No.{{start + num + 1}}</span>
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
            <flexbox-item :span="4">
                <img class="image" :src="film.images.medium" >
            </flexbox-item>
        </flexbox>
    </div>
</template>

<style lang="less">
// .top-item {
//   overflow: hidden;
//   margin-bottom: 1rem;
//   border: 0.02rem solid #DDD;
//   border-radius: 0.3em;
//   width: 100%;
//   background-color: #FFF;
//   padding: 0.5rem;
//   box-sizing: border-box;
  
//   .left {
//     font-size: 0.9rem;
//     float: left;
//     color: #222;
//     width: 15rem;
//     margin-right: 0.8rem;
//     .title-year {
//       .rank {
//         display: inline-block;
//         box-sizing: border-box;
//         padding: 0.5rem;
//         background-color: #008040;
//         color: #FFF;
//         height: 100%;
//         font-weight: bold;
//         border-radius: 0.3em;
//         font-size: 1rem;
//       }
//       .title {
//         font-size: 1.05rem;
//       }
//       .year {
//         font-size: 0.9rem;
//         color: #666;
//       }
//     }
//     .num {
//       font-size: 0.8rem;
//       color: #666;
//     }
    
//   }
//   .right {
//     float: right;
//     width: 7.5rem;
//     height: 10.5rem;

//     .image {
//       width: 7.5rem;
//       height: 10.5rem;
//       border-radius: 0.3em;
//     }
//   }
// }
// .director, .cast, .type {
//   width: 100%;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }

// new
.top-item{
    overflow: hidden;
    margin-bottom: 1rem;
    border: 0.02rem solid #DDD;
    border-radius: 0.3em;
    width: 100%;
    background-color: #FFF;
    padding: 0.5rem;
    box-sizing: border-box;
}
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
    .rank {
        display: inline-block;
        box-sizing: border-box;
        padding: 0.5rem;
        background-color: rgb(64, 158, 255);
        color: #FFF;
        height: 100%;
        font-weight: bold;
        border-radius: 0.3em;
        font-size: 1rem;
    }
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
    width: 100%; 
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
}
</style>
