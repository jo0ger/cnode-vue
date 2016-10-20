<template lang="html">
  <header id="header">
    <a id="logo">
      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="" />
    </a>
    <el-menu id="navbar" theme="dark" :default-active="curTab" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="index" :route="{name: 'index', query: {tab: 'all'}}">首页</el-menu-item>
      <el-menu-item index="api" :route="{name: 'api'}">API</el-menu-item>
      <el-menu-item index="login" :route="{name: 'login'}">登录</el-menu-item>
      <el-menu-item index="about" :route="{name: 'about'}">关于</el-menu-item>
    </el-menu>
  </header>
</template>

<script>
export default {
    data() {
        return {
            curTab: this.$route.name || "index"
        }
    },
    computed: {},
    mounted() {},
    methods: {
    },
    components: {}
}
</script>

<style lang="sass">
  #header{
    background-color: #324057;
    #logo{
      width: 120px;
      padding: 10px 55px;
      height: 28px;
      display: block;
      float: left;
      img{
        max-width:100%;
        max-height: 100%;
      }
    }
    #navbar{
      background-color: transparent;
    }
  }
</style>
