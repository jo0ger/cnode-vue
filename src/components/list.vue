<template lang="html">
        <div class="articles">
            <transition-group name="transition" class="article-list" tag="section">
                <!-- <section class="article-list"> -->
                <article class="topic" v-for="(item, index) in topicstran" v-if="topics" :key="index">
                    <router-link :to="{name: 'user', params: {name: item.author.loginname}}" class="creater-avatar avatar">
                        <img :src="item.author.avatar_url" alt="" />
                    </router-link>
                    <span class="count" v-if="!hideCount">
                        <span class="reply" v-text="item.reply_count || 0"></span>
                        <span class="seperator">/</span>
                        <span class="visit" v-text="item.visit_count || 0"></span>
                    </span>
                    <el-tag v-if="item.typeClass"
                    :type="item.typeClass"
                    :hit="false"
                    :class="item.typeClass">{{ item.top | getArticleType(item.good, item.tab) }}</el-tag>
                    <router-link :to="{name: 'topic', params: {id: item.id}}" class="title" v-text="item.title"></router-link>
                    <span class="last-reply-time" v-if="item.create_at">发布于 {{ item.create_at | getDateFromNow }}</span>
                </article>
                <!-- </section> -->
            </transition-group>
        </div>
</template>

<script>
export default {
  data () {
    return {
        topicstran: []
    }
  },
  props: ["topics", "hideCount"], //hideCount是否隐藏浏览量及回复量，因为在用户主页上api没有返回这两项
  computed: {},
  mounted () {
      this.topicstran = [].concat(this.topics);
  },
  watch: {
      "topics" (){
          this.topicstran = [].concat(this.topics);
      }
  },
  methods: {},
  components: {}
}
</script>

<style lang="sass">
    .slide-left-enter, .slide-right-leave-active{
        opacity: 0;
        transform: translate(30px, 0);
    }
    .slide-left-leave-active, .slide-right-enter{
        opacity: 0;
        transform: translate(-30px, 0);
    }
</style>
