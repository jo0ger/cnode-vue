<template lang="html">
  <el-card :body-style="bodyStyle" v-if="author.loginname">
      <div slot="header" class="clearfix">
        <span>作者信息</span>
      </div>
      <div class="text">
          <router-link :to="{name:'user', params: {name: author.loginname}}" class="author-avatar">
              <img :src="author.avatar_url" alt="" class="img"/>
          </router-link>
          <section class="author-info">
              <router-link :to="{name:'user', params: {name: author.loginname}}" class="author-name">
                  <span v-text="author.loginname"></span>
              </router-link>
              <p class="author-detail">
                  <span class="author-score">积分：{{author.score}}</time>
              </p>
          </section>
          <section class="author-recent-topic">
              <header class="title">
                  <span>最近文章</span>
              </header>
              <main class="topic-list">
                  <ul>
                      <li v-for="topic in author.recent_topics">
                          <a @click="goToTopic(topic.id)">{{ topic.title }}</a>
                      </li>
                  </ul>
              </main>
          </section>
      </div>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            author: {},
            bodyStyle: {
                display: "-webkit-flex",
                display: "ms-flex",
                display: "flex",
                padding: 0,
                flexDirection: "column",
                position: "relative"
            }
        }
    },
    props: ["authorName"],
    computed: {},
    created() {
        this.fetchUserInfo();
    },
    mounted() {},
    methods: {
        //获取用户信息
        fetchUserInfo() {
            let self = this;
            $.ajax({
                url: "https://cnodejs.org/api/v1/user/" + self.authorName,
                type: "GET",
            }).done((res) => {
                if (!res || !res.success) {
                    //TODO 是否错误抛出  有待商榷
                    return;
                }
                this.author = res.data;
            }).fail((error) => {
                //TODO 是否错误抛出  有待商榷
            });
        },
        goToTopic (topicId){
            if(!topicId)
                return;
            this.$router.replace({name: "topic", params: {id: topicId}});
        }
    },
    components: {}
}
</script>

<style lang="sass">
.author-avatar {
    max-width: 100%;
    display: block;
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid rgba(160,160,160,0.2);
    img {
        width: auto;
        max-width: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
}
.author-info {
    padding: 20px;
    border-bottom: 1px solid rgba(160,160,160,0.2);
    .author-name {
        line-height: 48px;
        font-size: 24px;
        font-weight: 300;
        color: #212121;
        &:hover {
            text-decoration: underline;
        }
    }
    .author-detail {
        .author-score {
            color: #838383;
        }
    }
}
.author-recent-topic{
    .title{
        padding: 18px 20px;
        border-bottom: 1px solid rgba(160,160,160,0.2);
    }
    .topic-list{
        ul{
            list-style: none;
            li{
                line-height: 1.5;
                border-bottom: 1px solid rgba(160,160,160,0.2);
                padding: 10px 10px;
                a{
                    color: #838383;
                    &:active{
                        background-color: #fff;
                    }
                }
            }
        }
    }
}
</style>
