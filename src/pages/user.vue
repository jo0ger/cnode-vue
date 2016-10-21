<template lang="html">
    <div id="container">
        <cv-head></cv-head>
        <main id="main">
            <el-row :gutter="20">
              <el-col :span="18">
                  <el-row>
                      <el-col :span="24">
                          <div class="grid-content bg-purple">
                              <el-card class="box-card">
                                  <div slot="header" class="clearfix">
                                      <div>
                                         <span v-if="loginname">基本信息</span>
                                      </div>
                                  </div>
                                  <main class="basic-info">
                                      <img :src="user.avatar_url" alt="" class="user-avatar"/>
                                      <section class="info">
                                          <p class="info-list" v-if="user.loginname">
                                              <span>用户名：</span><span>{{user.loginname}}</span>
                                          </p>
                                          <p class="info-list" v-if="user.score || user.score == 0">
                                              <span>积分：</span><span>{{user.score}}</span>
                                          </p>
                                          <p class="info-list" v-if="user.githubUsername">
                                              <span>Github：</span><a class="github" target="new" :href="'https://github.com/' + user.githubUsername">@{{user.githubUsername}}</a>
                                          </p>
                                          <p class="info-list" v-if="user.create_at">
                                              <span>创建于：</span><span>{{user.create_at | getDateFromNow}} （{{user.create_at | formatDate}}）</span>
                                          </p>
                                      </section>
                                  </main>
                              </el-card>
                          </div>
                      </el-col>
                  </el-row>
                  <el-row class="cv-panel">
                      <el-col :span="24">
                          <div class="grid-content bg-purple">
                              <el-card class="box-card">
                                  <div slot="header" class="clearfix">
                                      <div>
                                         <span>最近创建的话题</span>
                                      </div>
                                  </div>
                                  <main class="recent_topics">
                                      <cv-list :topics="user.recent_topics"></cv-list>
                                  </main>
                              </el-card>
                          </div>
                      </el-col>
                  </el-row>
                  <el-row class="cv-panel">
                      <el-col :span="24">
                          <div class="grid-content bg-purple">
                              <el-card class="box-card">
                                  <div slot="header" class="clearfix">
                                      <div>
                                         <span>最近参与的话题</span>
                                      </div>
                                  </div>
                                  <main class="recent_replies">
                                      <cv-list :topics="user.recent_replies"></cv-list>
                                  </main>
                              </el-card>
                          </div>
                      </el-col>
                  </el-row>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <cv-aside :author-name="loginname" :score="user.score" v-if="loginname"></cv-aside>
                  </div>
              </el-col>
          </el-row>
        </main>
        <cv-loading :show-loading="loading.showLoading"></cv-loading>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginname: this.$route.params.name || "",
            user: {},
            loading: {
                showLoading: false,
                show() {
                    this.showLoading = true;
                },
                hide() {
                    this.showLoading = false;
                }
            },
        }
    },
    computed: {},
    created (){
        if (this.loginname) {
            this.fetchUserInfo();
        }
    },
    mounted() {},
    watch: {
        "$route" (to, from) {
            //如果路由从一个主题进入到另一个主题，则异步加载主题详情
            if(to.name === from.name){
                this.loginname = to.params.name;
                this.fetchUserInfo();
            }
        }
    },
    methods: {
        //获取用户信息
        fetchUserInfo() {
            this.loading.show();
            let self = this;
            $.ajax({
                url: "https://cnodejs.org/api/v1/user/" + self.loginname,
                type: "GET",
            }).done((res) => {
                this.loading.hide();
                if (!res || !res.success) {
                    //TODO 是否错误抛出  有待商榷
                    return;
                }
                this.user = res.data;
            }).fail((error) => {
                //TODO 是否错误抛出  有待商榷
            });
        }
    },
    components: {
        "cv-head": require("../components/header.vue"),
        "cv-aside": require("../components/aside.vue"),
        "cv-list": require("../components/list.vue"),
        "cv-loading": require("../components/loading.vue")
    }
}
</script>

<style lang="sass">
    .basic-info{
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        flex-flow: row nowrap;
        .user-avatar{
            max-width: 100px;
        }
        .info{
            flex-grow: 1;
            margin-left: 10px;
            display: -webkit-flex;
            display: -ms-flex;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            .info-list{
                span:first-of-type{
                color: #838383;
                width: 70px;
                display: inline-block;
                text-align: right;
                font-size: 12px;
                }
                .github{
                    color: #20a0ff;
                    text-decoration: underline;
                }
            }
        }
    }
</style>
