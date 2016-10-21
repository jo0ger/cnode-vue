<template lang="html">
  <div id="back-to-top">
      <i :class="type"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
        type: "el-icon-arrow-up"
    }
  },
  computed: {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style lang="sass">
    #back-to-top{
        position: fixed;
        right: 10px;
        bottom: 10px;
    }
</style>
