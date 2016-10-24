<template lang="html">
    <div>
        <router-view></router-view>
        <cvBacktotop></cvBacktotop>
    </div>
</template>

<script>
import cvBacktotop from "./components/backToTop.vue";
require("./assets/scss/normalize.scss");
require("./assets/scss/common.scss");
require("./assets/css/github-markdown.css");
export default {
  data () {
    return {
    }
  },
  components: {
      cvBacktotop
  }
}
</script>

<style lang="sass">

</style>
