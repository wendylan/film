<script>
import { Rater } from "vux";
export default {
    components: {
        Rater
    },
    props: ["score"],
    data() {
        return {
            rating: 0
        };
    },
    filters: {
        formatScore: value => {
            return value.toFixed(1);
        }
    },
    mounted() {
        this.rating = this.score / 2;
    }
};
</script>
<template>
    <div>
        <div class="rate" v-if="score!=0">
            <Rater v-model="rating" disabled :margin="-2">
            </Rater>
            <span class="score">{{score | formatScore}}</span>
        </div>
        <div class="rate" v-else>暂无评分</div>
    </div>
</template>
<style lang="less">
.rate {
    margin: 0.15rem 0;
    .score {
        color: #f90;
    }
}
</style>

