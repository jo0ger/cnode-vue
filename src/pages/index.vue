<template lang="html">
  <div>
      <cv-head></cv-head>
      <main id="main">
        <cv-aside :username="user.loginname" :avatar="user.avatar" :userid="user.id" :isIndex="true"></cv-aside>
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
      </main>
    <cv-loading :showLoading="loading.showLoading" :content="loading.content"></cv-loading>
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
                content: "loading...",
                show() {
                    this.showLoading = true;
                },
                hide() {
                    this.showLoading = false;
                }
            },
            user:{
                loginname: localStorage.getItem("loginname") || "",
                avatar: localStorage.getItem("avatar") || "",
                id: localStorage.getItem("id") || ""
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
        window.addEventListener("scroll", () => {
            this.scrollLoad();
        });
    },
    methods: {
        fetchTopics() {
            this.loading.show();
            let tab = this.$route.query.tab || "all",
                tabdiff = tab === this.queryData.tab;
            this.queryData.tab = tab;
            $.ajax({
                url: "https://cnodejs.org/api/v1/topics",
                type: "GET",
                data: this.queryData
            }).done((data) => {
                this.loading.hide();
                this.scrollLock = false;
                console.log(data);
                if (!data || !data.success) {
                    //TODO 错误抛出
                    return;
                }
                data.data.forEach((v, i) => {
                    v.typeClass = this.getTypeClass(v.top, v.good, v.tab);
                });
                if (!tabdiff)
                    this.articles = [];
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
        scrollLoad() {
            if (this.scrollLock)
                return;
            let body = document.body,
                height = body.clientHeight + body.scrollTop,
                scrollHeight = body.scrollHeight;
            if (height > scrollHeight - 10) {
                this.scrollLock = true;
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
    margin-right: 300px;
    padding: 0;
    #panel {
        #index-nav {
            padding: 10px;
            background-color: #f6f6f6;
            border-radius: 3px 3px 0 0;
            .item {
                text-decoration: none;
                color: #80bd01;
                margin: 0 10px;
                &.router-link-active {
                    background-color: #80bd01;
                    color: #fff;
                    padding: 3px 4px;
                    border-radius: 3px;
                }
            }
        }
        #articles {
            background-color: #fff;
            .article {
                padding: 10px;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #f0f0f0;
                position: relative;
                display: block;
                color: #333;
                &:last-child {
                    border: none;
                }
                .avatar {
                    float: left;
                    img {
                        width: 30px;
                        height: 30px;
                        border-radius: 3px;
                        max-width: 100%;
                        vertical-align: middle;
                    }
                }
                .count {
                    width: 70px;
                    text-align: center;
                    display: inline-block;
                    float: left;
                    .seperator {
                        color: #9e78c0;
                        font-size: 10px;
                        margin: 0 -3px;
                    }
                    .reply {
                        color: #9e78c0;
                    }
                    .visit {
                        font-size: 10px;
                    }
                }

                .title {
                    max-width: 65%;
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    float: left;
                    margin-left: 10px;
                    text-decoration: none;
                    color: #333;
                }
                .last-reply-time {
                    float: right;
                    position: absolute;
                    bottom: 0;
                    right: 10px;
                    font-size: 0.8em;
                    display: inline-block;
                    margin-left: 20px;
                    color: #777;
                }
            }
        }
    }
}
</style>
