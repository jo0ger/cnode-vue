<template lang="html">
  <div>
      <cv-head></cv-head>
      <main id="main">
        <div class="content" id="content">
          <div class="panel" id="panel">
            <header id="index-nav">登录</header>
            <main id="container">
              <div class="input-area">
                <el-form ref="form" label-width="80px" @submit.prevent="login">
                  <el-form-item label="token">
                    <el-input v-model="at" :maxlength="36" :minlength='36'></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click.native="login">登录</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </main>
          </div>
        </div>
      </main>
    <cv-alert :content="alert.content" :show="alert.show"></cv-alert>
    <cv-loading :showLoading="loading.showLoading" :content="loading.content"></cv-loading>
  </div>
</template>

<script>
export default {
  data () {
    return {
      at: "",
      alert: {
        content: "loading...",
        show: false,
        timeShow (content, time, cb) {
          var self = this;
          self.content = content || "loading...";
          self.show = true;
          let timer = setTimeout(() => {
            self.show = false;
            cb && cb();
          }, time || 2000)
        },
      },
      loading: {
        showLoading: false,
        content: "loading...",
        show () {
          this.showLoading = true;
        },
        hide () {
          this.showLoading = false;
        }
      }
    }
  },
  computed: {},
  mounted () {},
  methods: {
    login () {
      let self = this;
      if(self.at === ''){
        self.alert.timeShow("token格式错误", 2000);
        return;
      }
      $.ajax({
        type: "POST",
        url:'https://cnodejs.org/api/v1/accesstoken',
        dataType: 'json',
        data: {accesstoken: self.at}
      }).done((data) => {
        if(!data || !data.success){
          self.alert.timeShow("登录出错，请稍候再试！")
          return;
        }
        localStorage.loginname = data.loginname;
        localStorage.avatar = data.avatar_url;
        localStorage.id = data.id;
        localStorage.at = this.at;
        self.alert.timeShow("登录成功", 2000, function() {
          //暂未想好怎么实现重定向到上一个页面，先回到首页，留坑
          this.$router.replace({name: "index", query: {tab: "all"}});
          // this.$router.replace(decodeURIComponent(self.$route.query.redirect));
        }.bind(self))
      }).fail((error) => {
        //TODO 错误抛出
        self.alert.timeShow("登录出错，请稍候再试！")
      });
    }
  },
  components: {
    "cv-head": require("../components/header.vue"),
    "cv-alert": require("../components/alert.vue"),
    "cv-loading": require("../components/loading.vue"),
  }
}
</script>

<style lang="sass">
  #content{
    margin-right: 300px;
    padding: 0;
    #panel{
      #container{
        background-color: #fff;
        min-height: 400px;
        position: relative;
        padding: 24px;
        .input-area{
          position: relative;
          text-align: center;
          width: 50%;
          margin-left: 25%;
        }
      }
    }
  }
</style>
