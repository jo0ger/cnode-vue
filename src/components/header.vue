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
          <router-link :to="{name: 'login'}" tag="li" class="nav-item" exact><a>登录</a></router-link>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
    data() {
        return {
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
#navbar {
    width: 100%;
    background: #444;
    font-size: 13px;
    #navbar-inner {
        width: 100%;
        max-width: 1400px;
        padding: 5px;
        margin: 0 auto;
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
