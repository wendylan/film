<script>
    export default {
        data(){
            return{
                backTopShow: false,
            }
        },
        methods:{
            backTop() {
                let back = setInterval(() => {
                    if(document.documentElement.scrollTop||document.body.scrollTop){
                        document.body.scrollTop-=100;
                        document.documentElement.scrollTop-=100;
                    }else {
                        clearInterval(back)
                    }
                });
            },
            handleScroll(){
                if ((document.documentElement.scrollTop > 100) || (document.body.scrollTop > 100)) {
                    this.backTopShow=true;
                }
                else {
                    this.backTopShow=false;
                }
            },
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
        },
    }
</script>
<template>
    <div @click="backTop()" v-show="backTopShow" class="back-top">
        <i class="fa fa-chevron-up"></i>
    </div>
</template>
<style>
.back-top {
    position: fixed;
    right: 10px;
    bottom: 56px;
    background: #409eff;
    width: 35px;
    height: 35px;
    line-height: 35px;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    opacity: 0.7;
}
.back-top .fa{
    font-size: 20px;
}
</style>

