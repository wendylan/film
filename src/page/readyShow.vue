<script>
import formatTime from '../utils/formatTime.js';
import ReadyItem from '../components/readyItem.vue';
import { mapState } from "vuex";
import { AjaxPlugin, Loading, Divider } from "vux";
export default {
    components:{
        ReadyItem,
        Loading,
        Divider,
    },
    data() {
        return {
            films: []
        };
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading
        })
    },
    methods: {
        getInitData() {
            this.$store.commit("updateLoadingStatus", { isLoading: true });
            let isLoad = true;
            let oldDate = "";
            let data = localStorage.getItem("coming_soon_movie");
            let date = formatTime.toDate(new Date(), "/");

            if (data) {
                oldDate = data.substring(0, 10);
                data = JSON.parse(data.substring(11));
            }
            if (data && oldDate == date) {
                isLoad = false;
            }
            if (isLoad) {
                var _this = this;
                AjaxPlugin.$http.get(this.HOME + "/movie/coming_soon").then(res => {
                    let result = date + "=" + JSON.stringify(res.data.subjects);
                    localStorage.setItem("coming_soon_movie", result);
                    _this.films = res.data.subjects;
                    _this.$store.commit("updateLoadingStatus", {
                        isLoading: false
                    });
                });
            } else {
                this.films = data;
                console.log(data);
                this.$store.commit("updateLoadingStatus", { isLoading: false });
            }
        }
    },
    mounted() {
        this.getInitData();
    }
};
</script>
<template>
    <ul id="ready">
        <li v-for="(film, index) in films" :key="index">
            <ReadyItem :film="film"></ReadyItem>
        </li>
        <loading v-model="isLoading"></loading>
        <Divider v-show="!isLoading">已经到底部啦</Divider>
    </ul>
</template>
<style scoped>
ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    padding: 1rem 0.7rem 0;
    margin-bottom: 54px;
}
</style>

