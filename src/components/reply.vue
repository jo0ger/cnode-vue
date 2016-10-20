<template lang="html">
    <el-row :gutter="20" id="reply-panel" class="cv-panel">
        <el-col :span="17" :offset="1" id="reply-detail">
            <div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>回复评论</span>
                    </div>
                    <main class="markdown-body reply-content">

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
  props: ["topicId"],
  computed: {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style lang="sass">
</style>
