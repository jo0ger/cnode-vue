<template>
  <div v-loading.fullscreen="showLoading"></div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    props:["showLoading"]
  };
</script>

<style lang="sass">
  .el-loading-demo{
    border: 1px solid #999;
    border-radius: 4px;
    height: 100px;
  }
</style>
