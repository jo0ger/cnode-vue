<template lang="html">
  <div id="aside" class="aside" v-if="loginname">
    <header id='aside-header' class="aside-header">
      <span>个人信息</span>
    </header>
    <main id="aside-content" class="aside-content">
      <div class="user-area">
        <router-link :to="{name:'user', params: {id: id}}" class="avatar">
          <img :src="avatar" alt="" />
        </router-link>
        <div class="right-wrap">
          <router-link :to="{name:'user', params: {id: id}}" class="name">
            <span v-text="loginname"></span>
          </router-link>
          <a href="javascript:" @click="logout">退出</a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
    data() {
        return {
          loginname: localStorage.loginname || "",
          avatar: localStorage.avatar || "",
          id: localStorage.id || ''
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
  #aside{
    width: 290px;
    font-size: 14px;
    float: right;
    #aside-header{
      color: #51585c;
      border-radius: 3px 3px 0 0;
      background-color: #f6f6f6;
      padding: 10px;
    }
    #aside-content{
      padding: 10px;
      border-radius: 0 0 3px 3px;
      background-color: #fff;
      .user-area{
        width: 100%;
        height: 50px;
        .avatar{
          width: 48px;
          height: 48px;
          display: block;
          float: left;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
        .right-wrap{
          margin-left: 60px;
          a{
            text-decoration: none;
            color: #778087;
          }
        }
      }
    }
  }
</style>
