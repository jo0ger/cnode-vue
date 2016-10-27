<template lang="html">
    <div>
        <router-view></router-view>
        <cvBacktotop></cvBacktotop>
    </div>
</template>

<script>
import cvBacktotop from "./components/backToTop.vue";
import "./assets/scss/normalize.scss";
import "./assets/scss/common.scss";
import "./assets/css/github-markdown.css";
export default {
    data() {
        return {}
    },
    components: {
        cvBacktotop
    }
}
</script>
