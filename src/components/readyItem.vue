<script>
import Rate from "./rate.vue";
export default {
    props: ["film"],
    components: {
        Rate
    },
    data() {
        return {};
    },
    methods: {
        clickItem: function() {
            this.$router.push({
                path: "/filmInfo",
                query: { id: this.film.id }
            });
            this.$store.commit("updateBackStatus", { isShowBack: true });
        }
    },
    mounted() {
        this.$store.commit("updateBackStatus", { isShowBack: false });
    }
};
</script>
<template>
    <div class="ready-item" @click="clickItem">
        <img class="poster" :src="film.images.medium">
        <h4 class="title">{{film.title}}</h4>
        <Rate :score="film.rating.average"></Rate>
    </div>
</template>
<style lang="less">
.ready-item {
    padding: .625rem .5rem .25rem;
    margin-bottom: 1rem;
    text-align: center;
    border: 1px solid rgb(209, 229, 221);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    border-radius: 0.3em;

    .poster {
        width: 9.375rem;
        height: 13.125rem;
    }
    .title {
        font-size: 1.1rem;
        width: 9.375rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>

