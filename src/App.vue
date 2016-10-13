<template lang="html">
  <div id="app">
    <cv-head></cv-head>
    <main id="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
require("./assets/scss/normalize.scss");
require("./assets/scss/common.scss");

export default {
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {},
  components: {
    "cv-head": require("./components/header.vue")
  }
}
</script>

<style lang="sass">
  #main{
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 15px auto;
    min-height: 400px;
  }
</style>
