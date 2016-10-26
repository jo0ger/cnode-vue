<template lang="html">
    <div id="container">
    <cvHead></cvHead>
    <main id="main">
        <el-row :gutter="20">
            <el-col :span="18" id="content" :offset="3">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <header slot="header" class="clearfix">
                            <span v-if="editTopic.id">编辑话题</span>
                            <span v-else>发布话题</span>
                        </header>
                        <main>
                            <el-form :model="topicForm" :rules="rules" ref="topicForm" label-width="100px" class="topicForm">
                                <el-form-item label="版块" prop="tab">
                                    <el-select v-model="topicForm.tab" placeholder="请选择版块">
                                        <el-option label="分享" value="share"></el-option>
                                        <el-option label="问答" value="ask"></el-option>
                                        <el-option label="招聘" value="job"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="标题" prop="title">
                                  <el-input v-model="topicForm.title" placeholder="标题字数10字以上"></el-input>
                                </el-form-item>
                                <el-form-item label="内容" prop="content">
                                  <el-input type="textarea" v-model="topicForm.content" id="topiContent" placeholder="请输入内容"></el-input>
                                </el-form-item>
                                <el-form-item>
                                  <el-button type="primary" @click.native.prevent="submit" v-if="editTopic.id">编辑</el-button>
                                  <el-button type="primary" @click.native.prevent="submit" v-else>发布</el-button>
                                  <el-button @click.native.prevent="reset">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </main>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </main>
    <cvLoading :showLoading="loading.showLoading"></cvLoading>
    </div>
</template>

<script>
import cvHead from "../components/header.vue";
import cvLoading from "../components/loading.vue";

import "../assets/plugins/simplemde/simplemde.min.css";
import Simplemde from "../assets/plugins/simplemde/simplemde.min.js";
import tool from "../libs/tool";
import Markdown from "markdown";

let markdown = Markdown.markdown,
    simplemde = null;

export default {
  data () {
      //自定义校验
      let checkTitle = (rule, value, callback) => {
          setTimeout(() => {
              if(value.length <= 10){
                  callback(new Error("标题字数太少，需10字以上！"));
              }else {
                  callback();
              }
          }, 300);
      };
      let checkContent = (rule, value, callback) => {
          if(!simplemde.value()){
              callback(new Error("内容不能为空"));
          }else {
              callback();
          }
      };

      //编辑话题
      let editTopic = JSON.parse(localStorage.editTopic || "{}");
    return {
        user: {
            accesstoken: localStorage.accesstoken || ""
        },
        tagText: '<br/><br/><a class="tag" target="new" href="https://github.com/BubblyPoker/cnode-vue">来自 cnode-vue</a>',
        loading: {
            showLoading: false,
            show() {
                this.showLoading = true;
            },
            hide() {
                this.showLoading = false;
            }
        },
        topicForm: {
            tab: "",
            title: "",
            content: ""
        },
        rules: {
            tab: [
                { required: true, message: '请输入板块名称', trigger: 'change' }
            ],
            title: [
                {required: true, message: '请输入话题标题', trigger: 'blur'},
                {validator: checkTitle, trigger: 'change'}
            ],
            //由于simplemde的介入，导致content无法通过required: true校验，改为自定义校验
            content: [
                {required: false},
                {validator: checkContent, trigger: 'blur'}
            ]
        },
        editTopic: {
            id: this.$route.params.id,
            tab: editTopic.tab,
            title: editTopic.title,
            content: editTopic.content
        }
    }
  },
  computed: {},
  created (){
      //有id，说明是编辑话题
      if(this.editTopic.id){
          this.topicForm.tab = this.editTopic.tab;
          this.topicForm.title = this.editTopic.title;
          this.fetchUnmdTopic();
      }
  },
  mounted () {
      simplemde = new Simplemde({
          element: document.getElementsByClassName('el-textarea__inner')[0],
          forceSync: true,
          toolbarTips: true,
          showIcons: ["bold", "italic", "strikethrough", "heading", "heading-smaller", "heading-bigger", "heading-1", "heading-2", "heading-3", "code", "quote", "unordered-list", "ordered-list", "clean-block", "link", "image", "table", "horizontal-rule", "preview", "side-by-side", "fullscreen", "guide"]
      })
  },
  methods: {
      reset() {
        this.$refs.topicForm.resetFields();
        simplemde.value("");
      },
      //新建主题
      submit() {
          if(!this.user.accesstoken){
              this.$router.push({name: "login", query: {redirect: encodeURIComponent(this.$route.path)}});
          }else {
              this.$refs.topicForm.validate((valid) => {
                  if (!valid) {
                      return false;
                  }
                  let self = this;
                  self.loading.show();
                  let content = simplemde.value() || "",
                      post_data = {
                          accesstoken: self.user.accesstoken,
                          tab: self.topicForm.tab,
                          title: self.topicForm.title,
                          content: content + (content.indexOf(self.tagText) == -1 && self.tagText || "")
                      },
                      queryUrl = "https://cnodejs.org/api/v1/topics";
                  if(self.editTopic.id){
                      post_data.topic_id = self.editTopic.id;
                      queryUrl += "/update"
                  }
                  //每天请求上限为7次，超出后服务器端会提示
                  $.ajax({
                      url: queryUrl,
                      type: "POST",
                      dataType: "json",
                      data: post_data
                  }).done(res => {
                      self.loading.hide();
                      console.log(res);
                      if(!res || !res.success){
                          //TODO 错误抛出
                          self.$message({
                              showClose: true,
                              message: "操作失败，" + (JSON.parse(error.responseText).error_msg) + ", 请稍后再试",
                              type: "warning"
                          });
                          return;
                      }
                      if(!res.topic_id){
                          //TODO 没有返回主题ID，错误抛出
                          return;
                      }
                      if(self.editTopic.id){
                          self.$message({
                              showClose: true,
                              message: "编辑成功！",
                              type: "success",
                          });
                          this.$confirm('是否前往该话题详情页面', '提示', {
                              type: 'succsss'
                        }).then(() => {
                            self.$router.push({name: "topic", params: {id: self.editTopic.id}});
                        }).catch(() => {
                            return;
                        });
                      }else{
                          self.$message({
                              showClose: true,
                              message: "发布成功！将自动跳转到主题详情页面",
                              type: "success",
                              onClose (){
                                  self.$router.push({name: "topic", params: {id: res.topic_id}});
                              }
                          });
                      }
                  }).fail(error => {
                      self.loading.hide();
                      self.$message({
                          showClose: true,
                          message: "操作失败，" + (JSON.parse(error.responseText).error_msg) + ", 请稍后再试",
                          type: "warning"
                      });
                  })
              });
          }
      },
      //获取没有被渲染过的topic
      fetchUnmdTopic (){
          let self = this;
          self.loading.show();
          $.ajax({
              url: "https://cnodejs.org/api/v1/topic/" + self.editTopic.id,
              type: "GET",
              dataType: "json",
              data: {
                  mdrender: false,
                  accesstoken: self.user.accesstoken
              }
          }).done((res) => {
              self.loading.hide();
              if (!res || !res.success) {
                  //TODO 是否错误抛出  有待商榷
                  return;
              }
              self.topicForm.content = res.data.content;
              simplemde.value(res.data.content);
          }).fail((error) => {
              //TODO 是否错误抛出  有待商榷
              self.loading.hide();
              self.$message({
                showClose: true,
                message: JSON.parse(error.responseText).error_msg || "获取数据失败",
                type: "warning"
              });
          });
      }
  },
  components: {
      cvHead,
      cvLoading,
  }
}
</script>

<style lang="sass">
    #content {
        margin-right: 300px;
        padding: 0;
        #panel {
            #panel-header {
                padding: 10px;
                background-color: #f6f6f6;
                border-radius: 3px 3px 0 0;
            }
            #container {
                background-color: #fff;
                min-height: 400px;
                position: relative;
                padding: 24px;

            }
        }
    }
</style>
