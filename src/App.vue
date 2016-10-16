<template lang="html">
  <div id="app">
    <!-- <cv-head></cv-head> -->
    <!-- <main id="main"> -->
      <router-view></router-view>
    <!-- </main> -->
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
  }
}
</script>

<style lang="sass">

</style>
