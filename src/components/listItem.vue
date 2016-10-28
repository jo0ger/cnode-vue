<template lang="html">
    <article class="topic">
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
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ["item", "hideCount"],
  computed: {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style lang="sass">
    .topic{
      border-top: 1px solid #f0f0f0;
      padding: 10px 0;
      &:nth-of-type(1) {
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
        margin-left: 10px;
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
</style>
