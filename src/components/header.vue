<template lang="html">
  <header id="header">
    <a id="logo">
      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="" />
    </a>
    <el-menu id="navbar" theme="dark" :default-active="curTab" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="index" :route="{name: 'index', query: {tab: 'all'}}">首页</el-menu-item>
      <el-menu-item index="api" :route="{name: 'api'}">API</el-menu-item>
      <el-menu-item index="about" :route="{name: 'about'}">关于</el-menu-item>
      <el-menu-item index="login" :route="{name: 'login'}" v-if="!user.loginname">登录</el-menu-item>
      <el-submenu index="user" v-if="user.loginname">
        <template slot="title"><img :src="user.avatar" alt="" class="avatar"/>{{user.loginname}}</template>
        <el-menu-item index="" :route="{name: 'user', params: {name: user.loginname}}">个人主页</el-menu-item>
        <el-menu-item index=""><span>积分：</span>{{user.score}}</el-menu-item>
        <el-menu-item index=""><el-badge :value="user.message" class="item"><i class='el-icon-message'></i>消息</el-badge></el-menu-item>
        <el-menu-item index="" @click.native="logout"><i class="el-icon-upload2"></i>退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </header>
</template>

<script>
export default {
    data() {
        return {
            user: {
                loginname: localStorage.loginname || "",
                avatar: localStorage.avatar || "",
                id: localStorage.id || "",
                accesstoken: localStorage.accesstoken || "",
                score: localStorage.score || "",
                message: "",
            },
            curTab: this.$route.name || "index"
        }
    },
    computed: {},
    created () {
        if(this.user.loginname && !this.user.score)
            this.fetchUserInfo();
        if(this.user.loginname && !this.message)
            this.fetchMessage();
    },
    mounted() {},
    methods: {
        //获取用户信息 just for 获取用户积分
        fetchUserInfo (){
            let self = this;
            $.ajax({
                url: "https://cnodejs.org/api/v1/user/" + self.user.loginname,
                type: "GET",
            }).done((res) => {
                if(!res || !res.success){
                    //TODO 是否错误抛出  有待商榷
                    return;
                }
                this.user.score = localStorage.score = res.data.score;
            }).fail((error) => {
                //TODO 是否错误抛出  有待商榷
            });
        },
        //just for获取未读消息
        fetchMessage (){
            let self = this;
            $.ajax({
                url: "https://cnodejs.org/api/v1/message/count/",
                type: "GET",
                data: {
                    accesstoken: self.user.accesstoken
                }
            }).done((res) => {
                console.log(res);
                if(!res || !res.success){
                    //TODO 是否错误抛出  有待商榷
                    return;
                }
                this.user.message = localStorage.message = res.data;
            }).fail((error) => {
                //TODO 是否错误抛出  有待商榷
            });
        },
        //退出
        logout (){
            let self = this;
            localStorage.loginname = "";
            localStorage.avatar = "";
            localStorage.id = "";
            localStorage.accesstoken = "";
            this.$message({
                showClose: true,
                message: "退出成功",
                type: "success",
                onClose () {
                    // self.$router.go({name: "index"})
                    window.location.reload();
                }
            })
        }
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
      .avatar{
          width: 30px;
          height: 30px;
      }
    }
  }
</style>
