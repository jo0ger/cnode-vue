<template lang="html">
<div id="container">
<cv-head></cv-head>
<main id="main">
    <el-row :gutter="20" id="container">
        <el-col :span="16" id="content">
            <div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div slot="header" class="clearfix index-nav">
                        <el-menu id="navbar" theme="light" :default-active="curTab" class="el-menu-demo" mode="horizontal" router>
                            <el-menu-item index="all" :route="{name: 'index', query: {tab: 'all'}}">全部</el-menu-item>
                            <el-menu-item index="good" :route="{name: 'index', query: {tab: 'good'}}">精华</el-menu-item>
                            <el-menu-item index="share" :route="{name: 'index', query: {tab: 'share'}}">分享</el-menu-item>
                            <el-menu-item index="ask" :route="{name: 'index', query: {tab: 'ask'}}">问答</el-menu-item>
                            <el-menu-item index="job" :route="{name: 'index', query: {tab: 'job'}}">招聘</el-menu-item>
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
</main>
</div>

</template>

<script>
export default {
    data() {
        return {
            articles: [],
            curTab: this.$route.query.tab || "",
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
            },
            scrollLock: false
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
        window.addEventListener("scroll", (e) => {
          this.scrollLoad();
        })
    },
    methods: {
        fetchTopics() {
            this.loading.show();
            let tab = this.$route.query.tab || "all",
                tabdiff = tab === this.queryData.tab;
                console.log(tab);
                console.log(this.queryData.tab);
            this.queryData.tab = tab;
            $.ajax({
                url: "https://cnodejs.org/api/v1/topics",
                type: "GET",
                data: this.queryData
            }).done((data) => {
                this.loading.hide();
                this.scrollLock = true;
                console.log(data);
                if (!data || !data.success) {
                    //TODO 错误抛出
                    return;
                }
                data.data.forEach((v, i) => {
                    v.typeClass = this.getTypeClass(v.top, v.good, v.tab);
                });
                if(!tabdiff){
                  this.articles = [];
                }
                this.articles = this.articles.concat(data.data);

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
        },
        scrollLoad: function(){
          if(!this.scrollLock)
            return;
          let body = document.body,
              height = body.clientHeight + body.scrollTop,
              scrollHeight = body.scrollHeight;
          if(height > scrollHeight - 10){
            this.scrollLock = false;
            this.queryData.page++;
            this.fetchTopics();
          }
        }

    },
    components: {
        "cv-head": require("../components/header.vue"),
        "cv-loading": require("../components/loading.vue"),
        "cv-aside": require("../components/aside.vue")
    }
}
</script>

<style lang="sass">
#content {
    .el-card__header {
        padding: 0;
        background-color: #eff2f7;
        .index-nav {}
    }
    .el-card__body{
      .article{
        border-top: 1px solid #f0f0f0;
        padding: 10px 0;
        &:nth-child(1) {
          border-top: none;
          padding-top: 0;
        }
        .creater-avatar{
          display: inline-block;
          img{
            width: 30px;
            height: 30px;
          }
        }
        .count{
          font-size: 10px;
          width: 70px;
          display: inline-block;
          text-align: center;
          .reply{
            font-size: 14px;
            color: #9e78c0;
          }
          .seperator{
            margin: 0 -3px;
          }
          .visit{

          }
        }
        .type{
          padding: 2px 4px;
          border-radius: 3px;
          font-size: 12px;
          &.hasColor{
            background: #80bd01;
            color: #fff;
          }
          &.noColor{
            background-color: #e5e5e5;
            color: #999;
          }
        }
        .title{
          max-width: 70%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
          vertical-align: middle;
          font-size: 16px;
          line-height: 30px;
        }
        .last-reply-time{
          float: right;
          text-align: right;
          min-width: 50px;
          display: inline-block;
          white-space: nowrap;
          color: #778087;
          font-size: 11px;
        }
      }
    }
  }
</style>
