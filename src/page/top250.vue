<script>
import { Tab, TabItem } from 'vux'
export default {
    components: {
        Tab,
        TabItem,
    },
    data(){
        return {}
    },
    methods:{
        onItemClick (index) {
            console.log('on item click:', index)
        },
    },
}
</script>
<template>
    <div>
        <tab>
            <tab-item selected @on-item-click="onItemClick">已发货</tab-item>
            <tab-item @on-item-click="onItemClick">未发货</tab-item>
            <tab-item @on-item-click="onItemClick">全部订单</tab-item>
        </tab>
    </div>
</template>
<style>

</style>

