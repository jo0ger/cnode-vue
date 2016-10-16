<template lang="html">
  <header id="navbar">
    <div id="navbar-inner">
      <div class="container">
        <a id="logo">
          <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="" />
        </a>
        <ul id="nav-menu">
          <router-link :to="{name: 'index', query: {tab: 'all'}}" tag="li" class="nav-item"><a>首页</a></router-link>
          <router-link :to="{name: 'api'}" tag="li" class="nav-item" exact><a>API</a></router-link>
          <router-link :to="{name: 'about'}" tag="li" class="nav-item" exact><a>关于</a></router-link>
          <router-link :to="{name: 'login'}" tag="li" class="nav-item" v-if="!loginname" exact><a>登录</a></router-link>
          <li class="nav-item" v-if="loginname" @click="logout"><a>退出</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
    data() {
        return {
          loginname: localStorage.getItem("loginname") || ""
        }
    },
    computed: {},
    mounted() {},
    methods: {
      logout () {
        localStorage.removeItem("id");
        localStorage.removeItem("loginname");
        localStorage.removeItem("avatar");
        window.location.reload();
      }
    },
    components: {}
}
</script>

<style lang="sass">
#navbar {
    width: 100%;
    background: #444;
    font-size: 13px;
    #navbar-inner {
      background: 0 0;
      border-radius: 0;
      border: none;
      box-shadow: none;
      width: 90%;
      margin: auto;
      padding: 5px;
        .container {
            width: 100%;
            clear: both;
            display: table;
            &:after,
            &:before {
                display: table;
                line-height: 0;
                content: "";
            }
            #logo {
                width: 120px;
                height: 28px;
                padding: 3px 20px;
                display: block;
                float: left;
                margin-left: -20px;
            }
            #nav-menu {
                float: right;
                margin: 10px 0 0 0;
                .nav-item {
                    display: inline-block;
                    list-style: none;
                    padding: 0 10px 15px;
                    a {
                      color: #fff;
                      text-decoration: none;
                      cursor: pointer;
                    }
                    &.router-link-active{
                      a{
                        color: red;
                      }
                    }
                }
            }
        }
    }
}
</style>
