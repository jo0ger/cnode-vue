<template lang="html">
  <!-- <div>
      <cv-aside></cv-aside>
      <div class="content" id="content">
        <div class="panel" id="panel">
          <nav id="index-nav">
            <router-link :to="{name: 'index', query: {tab: 'all'}}" class="item" exact>全部</router-link>
            <router-link :to="{name: 'index', query: {tab: 'good'}}" class="item" exact>精华</router-link>
            <router-link :to="{name: 'index', query: {tab: 'share'}}" class="item" exact>分享</router-link>
            <router-link :to="{name: 'index', query: {tab: 'ask'}}" class="item" exact>问答</router-link>
            <router-link :to="{name: 'index', query: {tab: 'job'}}" class="item" exact>招聘</router-link>
          </nav>
          <section id="articles">
            <article class="article" v-for="item in articles">
              <router-link :to="{name: 'user', params: {id: item.author_id}}" class="creater-avatar avatar">
                <img :src="item.author.avatar_url" alt="" />
              </router-link>
              <span class="count">
                  <span class="reply" v-text="item.reply_count"></span>
                  <span class="seperator">/</span>
                  <span class="visit" v-text="item.visit_count"></span>
              </span>
              <span :class="['type', item.typeClass]">{{ item.top | getArticleType(item.good, item.tab) }}</span>
              <router-link :to="{name: 'topic', params: {id: item.id}}" class="title" v-text="item.title"></router-link>
              <span class="last-reply-time">{{ item.last_reply_at | getDateFromNow }}</span>
            </article>
          </section>
        </div>
      </div>
    <cv-loading :showLoading="loading.showLoading" :content="loading.content"></cv-loading>
  </div> -->
<div>

  <el-row :gutter="20" id="container">
    <el-col :span="16" id="content">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix index-nav">
            <el-menu id="navbar" theme="light" default-active="1" class="el-menu-demo" mode="horizontal" router>
              <el-menu-item index="1" :route="{name: 'index', query: {tab: 'all'}}">全部</el-menu-item>
              <el-menu-item index="2" :route="{name: 'index', query: {tab: 'good'}}">精华</el-menu-item>
              <el-menu-item index="3" :route="{name: 'index', query: {tab: 'share'}}">分享</el-menu-item>
              <el-menu-item index="4" :route="{name: 'index', query: {tab: 'ask'}}">问答</el-menu-item>
              <el-menu-item index="4" :route="{name: 'index', query: {tab: 'job'}}">招聘</el-menu-item>
            </el-menu>
            <cv-loading :showLoading="loading.showLoading"></cv-loading>
          </div>
          <div v-for="o in 4" class="text item">
            <article class="article" v-for="item in articles">
              <router-link :to="{name: 'user', params: {id: item.author_id}}" class="creater-avatar avatar">
                <img :src="item.author.avatar_url" alt="" />
              </router-link>
              <span class="count">
                  <span class="reply" v-text="item.reply_count"></span>
                  <span class="seperator">/</span>
                  <span class="visit" v-text="item.visit_count"></span>
              </span>
              <span :class="['type', item.typeClass]">{{ item.top | getArticleType(item.good, item.tab) }}</span>
              <router-link :to="{name: 'topic', params: {id: item.id}}" class="title" v-text="item.title"></router-link>
              <span class="last-reply-time">{{ item.last_reply_at | getDateFromNow }}</span>
            </article>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">卡片名称</span>
            <el-button style="float: right;" type="primary">操作按钮</el-button>
          </div>
          <div v-for="o in 4" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</div>

</template>

<script>
export default {
    data() {
        return {
            articles: [],
            queryData: {
                page: 1,
                tab: "all",
                limit: 20,
                mdrender: true
            },
            loading: {
                showLoading: false,
                show() {
                    this.showLoading = true;
                },
                hide() {
                    this.showLoading = false;
                }
            }
        };
    },
    computed: {},
    created: function() {
        sessionStorage.setItem("tab", this.queryData.tab);
    },
    watch: {
        "$route": "fetchTopics"
    },
    mounted() {
        this.fetchTopics();
    },
    methods: {
        fetchTopics() {
            this.loading.show();
            let tab = this.$route.query.tab || "all";
            this.queryData.tab = tab;
            $.ajax({
                url: "https://cnodejs.org/api/v1/topics",
                type: "GET",
                data: this.queryData
            }).done((data) => {
                this.loading.hide();
                console.log(data);
                if (!data || !data.success) {
                    //TODO 错误抛出
                    return;
                }
                data.data.forEach((v, i) => {
                    v.typeClass = this.getTypeClass(v.top, v.good, v.tab);
                });
                this.articles = data.data;
            }).fail((error) => {
                this.showLoading = false;
                //TODO 错误抛出
            });
        },
        getTypeClass(top, good, tab) {
            if (top || good) {
                return "hasColor";
            } else if (!top && !good && !tab || (this.$route.query.tab === tab)) {
                return "hidden";
            } else {
                return "noColor";
            }
        }

    },
    components: {
        "cv-loading": require("../components/loading.vue"),
        "cv-aside": require("../components/aside.vue")
    }
}
</script>

<style lang="sass">
  #content{
    .el-card__header{
      padding: 0;
      background-color: #eff2f7;
      .index-nav{
      }
    }
  }
</style>
