<script>
    import { Search } from 'vux';
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
                console.log('value-----', value);
            },
            onSubmit(val){
                console.log('val--------', val);
            },
            resultClick(item){
                console.log('item------', item);
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

