<template>
    <tabbar>
        <tabbar-item selected link="/">
            <i slot="icon" class="fa fa-home"></i>
            <span slot="label">正在热映</span>
        </tabbar-item>
        <tabbar-item link="/ready">
            <i slot="icon" class="fa fa-film"></i>
            <span slot="label">即将上映</span>
        </tabbar-item>
        <tabbar-item link="/top">
            <i slot="icon" class="fa fa-tree"></i>
            <span slot="label">Top250</span>
        </tabbar-item>
    </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
export default {
    components: {
        Tabbar,
        TabbarItem
    }
};
</script>

<style>
.weui-tabbar {
  position: fixed!important;
}
</style>
