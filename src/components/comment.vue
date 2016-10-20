<template lang="html">
    <el-row :gutter="20" id="comment-panel" class="cv-panel">
        <el-col :span="17" :offset="1" id="comment-detail">
            <div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span v-show="commentCount">{{commentCount}} 条评论</span>
                    </div>
                    <main class="markdown-body comment-content">

                    </main>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ["commentList", "commentCount"],
  computed: {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style lang="sass">
    
</style>
