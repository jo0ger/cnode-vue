<template lang="html">
  <div>
      <cv-head></cv-head>
      <main id="main">
        <div class="content" id="content">
          <div class="panel" id="panel">
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
              <section class="markdown-body" v-html="topic.content">

              </section>
            </main>
          </div>
        </div>
      </main>
    <cv-loading :showLoading="loading.showLoading" :content="loading.content"></cv-loading>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topicId: this.$route.params.id || "",
      topic: {},
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
  created (){
    console.log(this.topicId);
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
        console.log(res);
        if(!res || !res.success){
          return;
        }
        res.data.type = this.getTypeClass(res.data.top, res.data.good, res.data.tab);
        this.topic = res.data;
        console.log(this.topic);
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
    }
  },
  components: {
    "cv-head": require("../components/header.vue"),
    "cv-loading": require("../components/loading.vue"),
  }
}
</script>

<style lang="sass">
  #content{
    margin-right: 300px;
    padding: 0;
    #panel{
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
          width: 75%;
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
  }
</style>
