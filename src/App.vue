<template lang="html">
    <div>
        <cvHeader></cvHeader>
        <transition :name="transition">
            <router-view class="router-view"></router-view>
        </transition>
        <cvLoading :show="loading"></cvLoading>
        <cvBacktotop></cvBacktotop>
    </div>
</template>

<script>
import cvHeader from "./components/header.vue";
import cvBacktotop from "./components/backToTop.vue";
import cvLoading from "./components/loading.vue";
import "./assets/scss/normalize.scss";
import "./assets/scss/common.scss";
import "./assets/scss/animation.scss";
import "./assets/css/github-markdown.css";
import {mapGetters} from "vuex";
export default {
    data (){
        return {
            transition: "slide-left"
        };
    },
    computed: mapGetters({
        loading: "getLoading"
    }),
    watch: {
        "$route"(to, from){
            this.transition = this.checkDirecition(to.name, from.name) && "slide-left" || "slide-right";
        }
    },
    methods: {
        checkDirecition(to, from) {
            let map = ["index", "api", "about", "login", "personal", "message", "newtopic"];
            return (map.indexOf(to) - map.indexOf(from)) > 0;
        }
    },
    components: {
        cvHeader,
        cvLoading,
        cvBacktotop
    }
}
</script>
<style lang="sass">
    .router-view{
        width: 100%;
        position: absolute;
        -webkit-transition: all .3s cubic-bezier(.55,0,.1,1);
        -moz-transition: all .3s cubic-bezier(.55,0,.1,1);
        -ms-transition: all .3s cubic-bezier(.55,0,.1,1);
        -o-transition: all .3s cubic-bezier(.55,0,.1,1);
        transition: all .3s cubic-bezier(.55,0,.1,1);
    }

</style>
