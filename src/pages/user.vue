<template lang="html">
    <div id="container">
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
                                  <main class="new_topics">
                                      <cvList :topics="user.recent_topics" :hideCount="hideCount"></cvList>
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
                                      <cvList :topics="user.recent_replies"  :hideCount="hideCount"></cvList>
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
                                         <span>收藏的话题</span>
                                      </div>
                                  </div>
                                  <main class="collect_topics">
                                      <cvList :topics="collectedTopics"></cvList>
                                  </main>
                              </el-card>
                          </div>
                      </el-col>
                  </el-row>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <cvAside :author-name="loginname" :hasRecent="false" v-if="loginname"></cvAside>
                  </div>
              </el-col>
          </el-row>
        </main>
    </div>
</template>

<script>
import cvHead from "../components/header.vue";
import cvList from  "../components/list.vue";
import cvAside from  "../components/aside.vue";

export default {
    data() {
        return {
            loginname: this.$route.params.name || "",
            user: {},
            collectedTopics: [],
            loading: {
                showLoading: false,
                show() {
                    this.showLoading = true;
                },
                hide() {
                    this.showLoading = false;
                }
            },
            hideCount: true
        }
    },
    computed: {},
    created (){
        if (this.loginname) {
            this.fetchUserInfo();
            this.fetchCollectedTopics();
        }
    },
    mounted() {},
    watch: {
        "$route" (to, from) {
            //如果路由从一个主题进入到另一个主题，则异步加载主题详情
            if(to.name === from.name){
                this.loginname = to.params.name;
                this.fetchUserInfo();
                this.fetchCollectedTopics();
            }
        }
    },
    methods: {
        //获取用户信息
        fetchUserInfo() {
            this.setLoading(true);
            let self = this;
            $.ajax({
                url: "https://cnodejs.org/api/v1/user/" + self.loginname,
                type: "GET",
            }).done((res) => {
                self.setLoading(false);
                if (!res || !res.success) {
                    //TODO 是否错误抛出  有待商榷
                    return;
                }
                this.user = res.data;
            }).fail((error) => {
                self.setLoading(false);
                //TODO 是否错误抛出  有待商榷
            });
        },
        //获取收藏话题
        fetchCollectedTopics (){
            let self = this;
            $.ajax({
                url: "https://cnodejs.org/api/v1/topic_collect/" + self.loginname,
                type: "GET",
            }).done((res) => {
                if (!res || !res.success) {
                    //TODO 是否错误抛出  有待商榷
                    return;
                }
                res.data.forEach((v, i) => {
                    v.typeClass = self.getTypeClass(v.top, v.good, v.tab);
                });
                this.collectedTopics = res.data;
            }).fail((error) => {
                //TODO 是否错误抛出  有待商榷
            });
        },
        getTypeClass(top, good, tab) {
            if (top) {
                return "success";
            } else if ( good) {
                return "danger";
            } else if (tab == "ask") {
                return "primary";
            } else if (tab == "job") {
                return "warning";
            } else if (tab == "share") {
                return "gray";
            }else if (!top && !good && !tab || (this.$route.query.tab === tab)) {
                return "hidden";
            } else {
                return "";
            }
        },
        setLoading (state) {
            this.$store.commit("setLoading", state);
        }
    },
    components: {
        cvHead,
        cvAside,
        cvList
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
