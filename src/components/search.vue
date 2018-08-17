<script>
    import { AjaxPlugin, Search } from 'vux';
    export default {
        components:{
            Search,
        },
        data(){
            return{
                value: '',
                results: [],
            }
        },
        methods:{
            getResult(value){
                let that = this;
                AjaxPlugin.$http.get(this.HOME+'/movie/search?q='+ value +'&count=10').then((res)=>{
                    that.results = res.data.subjects.map((item) => {
                        return {title: item.title, key: item.id}
                    })
                });
            },
            onSubmit(val){
                console.log('val--------', val);
                if(this.value == ''){
                    return;
                }
                if(this.id == ''){
                    this.id = this.results[0].key;
                }
                this.value = '';
                this.$refs.search.setBlur();
                this.$router.push({ path: '/filmInfo', query: { id: this.id } });
                this.$store.commit('updateBackStatus', {isShowBack: true});
            },
            resultClick(item){
                console.log('item------', item);
                this.value = item.title;
                this.id = item.key;
                this.$refs.search.setFocus();
            },
        },
    }
</script>
<template>
    <search
        v-model="value"
        position="absolute"
        top="46px"
        ref="search"
        :auto-fixed="true"
        :results="results"
        @on-change="getResult"
        @on-submit="onSubmit"
        @on-result-click="resultClick">
    </search>
</template>
<style>

</style>

