<template lang="html">
  <!-- <header id="navbar">
    <div id="navbar-inner">
      <div class="container">
        <a id="logo">
          <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="" />
        </a>
        <ul id="nav-menu">
          <router-link :to="{name: 'index', query: {tab: 'all'}}" tag="li" class="nav-item"><a>首页</a></router-link>
          <router-link :to="{name: 'api'}" tag="li" class="nav-item" exact><a>API</a></router-link>
          <router-link :to="{name: 'about'}" tag="li" class="nav-item" exact><a>关于</a></router-link> -->
          <!-- <router-link :to="{name: 'login'}" tag="li" class="nav-item" exact><a>登录</a></router-link> -->
        <!-- </ul>
      </div>
    </div>
  </header> -->
  <header id="header">
    <a id="logo">
      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="" />
    </a>
    <el-menu id="navbar" theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="1" :route="{name: 'index', query: {tab: 'all'}}" data-type="index">首页</el-menu-item>
      <el-menu-item index="2" :route="{name: 'api'}" data-type="api">API</el-menu-item>
      <el-menu-item index="3" :route="{name: 'login'}" data-type="login">登录</el-menu-item>
      <el-menu-item index="4" :route="{name: 'about'}" data-type="about">关于</el-menu-item>
    </el-menu>
  </header>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    computed: {},
    created () {
      console.log(111);
    },
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
