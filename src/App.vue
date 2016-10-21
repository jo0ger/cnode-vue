<template lang="html">
    <div>
        <router-view></router-view>
        <cv-backtotop></cv-backtotop>
    </div>
</template>

<script>
require("./assets/scss/normalize.scss");
require("./assets/scss/common.scss");
require("./assets/css/github-markdown.css");

export default {
  data () {
    return {
    }
  },
  computed: {},
  mounted () {},
  methods: {
  },
  components: {
      "cv-backtotop": require("./components/backToTop.vue")
  }
}
</script>

<style lang="sass">

</style>
