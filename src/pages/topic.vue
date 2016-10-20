<template lang="html">
  <div>
      <cv-head></cv-head>
      <main id="main">
        <cv-aside :username="topic.author.loginname" :avatar="topic.author.avatar_url" :userid="topic.author_id"></cv-aside>
        <div class="content" id="content">
          <div class="panel" id="topic-panel">
            <header id="topic-header">
              <span id="header-title">
                <span :class="['type', topic.type]">{{ topic.top | getArticleType(topic.good, topic.tab) }}</span>
                <span class="topic-title" v-text="topic.title"></span>
              </span>
              <div class="infos">
                <span class="info">发布于 {{ topic.create_at | getDateFromNow }}</span>
                <span class="info">作者 {{ topic.author.loginname }}</span>
                <span class="info">{{ topic.visit_count }} 次浏览</span>
                <span class="info">来自 {{ topic.tab | getTypeName }}</span>
              </div>
            </header>
            <main id="topic-container">
              <section class="markdown-body topic-content" v-html="topic.content">

              </section>
            </main>
          </div>
          <div class="panel" id="comment-panel" v-if="topic.replies">
              <section class="topic-comment">
                  <header id="comment-header" class="panel-header">
                    <span v-text=" topic.reply_count + '条回复'" v-if="topic.reply_count"></span>
                  </header>
                  <main id="comment-content" class="comments content">
                      <article class="comment" v-for="comment in topic.replies">
                          <router-link :to="{name:'user', params: {loginname: comment.author.loginname}}" class="comment-img">
                            <img :src="comment.author.avatar_url" alt="" />
                            <span v-text="comment.author.loginname" class="comment-username"></span>
                          </router-link>
                          <div class="comment-body">
                            <div class="text markdown-body">
                              <p v-html="comment.content">111</p>
                            </div>
                            <p class="attribution"><span class="time">发布于 {{ comment.create_at | formatDate }}</span></p>
                          </div>
                        </article>
                  </main>
              </section>
          </div>

          <div class="panel" id="reply-panel" v-if="topic.replies">
              <section class="topic-reply">
                  <header id="reply-header" class="panel-header">
                      <span>添加回复</span>
                  </header>
                  <main id="reply-container">
                      <textarea id="reply-content" rows="8" class="text"
                          v-model="reply_content"
                          placeholder='回复支持Markdown语法,请注意标记代码'>
                      </textarea>
                      <a href="javascript:" id="reply" @click="reply">回复</a>
                  </main>
              </section>
          </div>

        </div>
      </main>
    <cv-loading :showLoading="loading.showLoading" :content="loading.content"></cv-loading>
  </div>
</template>

<script>
let tool = require("../libs/tool"),
    markdown = require("markdown").markdown;
    console.log(markdown);
export default {
  data () {
    return {
      topicId: this.$route.params.id || "",
      topic: {
          author: {} //去掉后会报错，不清楚为什么
      },
      reply_content: "",
      loading: {
        showLoading: false,
        content: "loading...",
        show () {
          this.showLoading = true;
        },
        hide () {
          this.showLoading = false;
        }
    },
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
    authorTxt:'<br/><br/><a class="form" href="http://www.bubblypoker.com">from cnode-vue</a>',
    }
  },
  computed: {},
  created (){
    this.fetchData();
  },
  mounted () {},
  methods: {
    fetchData () {
      this.loading.show();
      $.ajax({
        url: "https://cnodejs.org/api/v1/topic/" + this.topicId,
        dataType: "json",
      }).done((res) => {
        this.loading.hide();
        if(!res || !res.success){
          return;
        }
        res.data.type = this.getTypeClass(res.data.top, res.data.good, res.data.tab);
        this.topic = res.data;
      })
      .fail((error) => {

      });
    },
    getTypeClass(top, good, tab) {
        if (top || good) {
            return "hasColor";
        } else if (!top && !good) {
            return "hidden";
        }
    },
    reply (){
        if(!this.reply_content){
            this.alert.show("请填写回复！");
            return;
        }
        let time = new Date(),
            linkUsers = tool.linkUsers(this.reply_content),
            html = markdown.toHTML(linkUsers) + this.authorTxt;
            addHtml = $('<div class="markdown-text"></div>').append(html)[0].outerHTML;
        $.ajax({
            url: "" + this.topicId + "/replies",
            accesstoken: sessionStorage.getItem("at"),
            content: this.reply_content + this.authorTxt,
        }).done((res) => {

        }).fail(() => {

        })
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
  #content{
    margin-right: 300px;
    padding: 0;
    #topic-panel{
      #topic-header{
        background-color: #fff;
        padding: 10px;
        border-radius: 3px 3px 0 0;
        border-bottom: 1px solid #f0f0f0;
        #header-title{
          font-size: 22px;
          font-weight: 700;
          margin: 8px 0;
          display: inline-block;
          vertical-align: bottom;
          line-height: 130%;
          .topic-header{
            font-size: 22px;
            font-weight: 700;
            margin: 8px 0;
            display: inline-block;
            vertical-align: bottom;
            width: 75%;
            line-height: 130%;
            .topic-title{
              margin-left: 10px;
            }
          }
        }
        .infos{
          .info{
            font-size: 12px;
            color: #838383;
            &:before{
              content: "•";
            }
          }
        }
      }
      #topic-container{
        background-color: #fff;
        min-height: 400px;
        position: relative;
        padding: 24px;
        border-radius: 0 0 3px 3px;
      }
    }
    .panel-header{
        color: #51585c;
        border-radius: 3px 3px 0 0;
        background-color: #f6f6f6;
        padding: 10px;
    }
    .panel{
        margin-top: 20px;
        #comment-content{
            padding: 10px;
            border-radius: 0 0 3px 3px;
            background-color: #f3eee9;
            position: relative;
            .comment{
                overflow: hidden;
                padding: 0 0 1em;
                border-bottom: 1px solid #ddd;
                margin: 0 0 1em;
                *zoom: 1;
                position: relative;
                .comment-img {
                    float: left;
                    margin-right: 24px;
                    border-radius: 5px;
                    overflow: hidden;
                    text-decoration: none;
                    color: #778087;
                    img{
                        display: block;
                        width: 50px;
                        height: 50px;
                    }
                    .comment-username{
                        width: 60px;
                        height: 20px;
                        line-height: 20px;
                        display: block;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
                .comment-body{
                    overflow: hidden;
                    .text{
                        padding: 10px;
                        border: 1px solid #e5e5e5;
                        border-radius: 5px;
                        background: #fff;
                        p:last-child{
                            margin: 0;
                        }
                        &:before{
                        top: 18px;
                        left: 78px;
                        width: 9px;
                        height: 9px;
                        border-width: 0 0 1px 1px;
                        border-style: solid;
                        border-color: #e5e5e5;
                        background: #fff;
                        -webkit-transform: rotate(45deg);
                        -moz-transform: rotate(45deg);
                        -ms-transform: rotate(45deg);
                        -o-transform: rotate(45deg);
                        }
                    }
                    .attribution {
                        margin: 0.5em 0 0;
                        font-size: 14px;
                        color: #666;
                    }
                }
            }
        }
    }
  }
  .comments:before,
   .comment:before,
   .comment .text:before {
       content: "";
       position: absolute;
       top: 0;
       left: 65px;
   }

   .comments:before {
       width: 3px;
       top: 30px;
       bottom: 25px;
       left: 75px;
       background: rgba(0,0,0,0.1);
   }

   .comment:before {
       width: 9px;
       height: 9px;
       border: 3px solid #fff;
       border-radius: 100px;
       margin: 16px 0 0 -6px;
       box-shadow: 0 1px 1px rgba(0,0,0,0.2), inset 0 1px 1px rgba(0,0,0,0.1);
       background: #ccc;
   }

   .comment:hover:before {
       background: orange;
   }

   .comment .text:before {
       top: 18px;
       left: 78px;
       width: 9px;
       height: 9px;
       border-width: 0 0 1px 1px;
       border-style: solid;
       border-color: #e5e5e5;
       background: #fff;
       -webkit-transform: rotate(45deg);
       -moz-transform: rotate(45deg);
       -ms-transform: rotate(45deg);
       -o-transform: rotate(45deg);
   }

   .topic-reply{
       #reply-container{
           padding: 10px;
           border-radius: 0 0 3px 3px;
           background-color: #fff;
           position: relative;
           textarea{
               display: block;
                -webkit-box-flex: 1;
                width: 100%;
                border: 1px solid #d5dbdb;
                background-color: #fff;
                font-size: 14px;
                color: #313131;
                resize: none;
           }
           #reply{
               display: block;
               text-decoration: none;
               color: #fff;
               background-color: #08c;
               padding: 10px 10px;
               border-radius: 3px;
               margin-top: 10px;
               text-align: center;

           }
       }
   }
</style>
