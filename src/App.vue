<template lang="html">
    <div>
        <cvHeader></cvHeader>
        <transition name="slide-left">
        <router-view></router-view>
        </transition>
        <cvBacktotop></cvBacktotop>
    </div>
</template>

<script>
import cvHeader from "./components/header.vue";
import cvBacktotop from "./components/backToTop.vue";
import "./assets/scss/normalize.scss";
import "./assets/scss/common.scss";
import "./assets/css/github-markdown.css";
export default {
    data() {
        return {}
    },
    components: {
        cvHeader,
        cvBacktotop
    }
}
</script>
<style lang="sass">
    .slide-left-enter, .slide-right-leave-active{
        opacity: 0;
        transform: translate(30px, 0);
    }
    .slide-left-leave-active, .slide-right-enter{
        opacity: 0;
        transform: translate(-30px, 0);
    }
</style>
