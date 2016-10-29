<template lang="html">
    <div id="container">
        <main id="main">
            <el-row :gutter="20">
              <el-col :span="18">
                  <el-row>
                      <el-col :span="24">
                          <div class="grid-content bg-purple">
                              <el-card class="box-card">
                                  <div slot="header" class="clearfix">
                                      <div>
                                         <span>新消息</span>
                                         <el-badge :value="messages.hasnot_read_messages.length" :max="99" class="mark"></el-badge>
                                         <el-button style="float:right;" @click.native="markAll">全部已读</el-button>
                                      </div>
                                  </div>
                                  <main class="hasnot-read-messages messages">
                                      <ul  class="hasnot-read-list" v-if="messages.hasnot_read_messages.length">
                                          <li v-for="item in messages.hasnot_read_messages" class="message-item hasnot-read-item">
                                              <router-link :to="{name: 'user', params: {name: item.author.loginname}}" class="messager-avatar">
                                                  <img :src="item.author.avatar_url" alt="" />
                                              </router-link>
                                              <router-link :to="{name: 'user', params: {name: item.author.loginname}}" class="messager-name link">
                                                  {{ item.author.loginname }}
                                              </router-link>
                                              <p class="message-content">
                                                  <span v-if="item.type == 'at'">在话题</span>
                                                  <span v-if="item.type == 'reply'">回复了您的话题</span>
                                                  <router-link :to="{name: 'topic', params: {id: item.topic.id}}" class="message-topic link">
                                                      {{ item.topic.title }}
                                                  </router-link>
                                                  <span v-if="item.type == 'at'">@了您</span>
                                              </p>
                                              <span class="message-time">{{ item.create_at | getDateFromNow }}</span>
                                          </li>
                                      </ul>
                                      <span class="noData" v-else>暂无消息</span>
                                  </main>
                              </el-card>
                          </div>
                      </el-col>
                  </el-row>
                  <el-row class="cv-panel">
                      <el-col :span="24">
                          <div class="grid-content bg-purple">
                              <el-card class="box-card">
                                  <div slot="header" class="clearfix">
                                      <div>
                                         <span>已读消息</span>
                                         <el-badge :value="messages.has_read_messages.length" :max="99" class="mark"></el-badge>
                                      </div>
                                  </div>
                                  <main class="has-read-messages messages">
                                      <ul  class="has-read-list" v-if="messages.has_read_messages.length">
                                          <li v-for="item in messages.has_read_messages" class="message-item has-read-item">
                                              <router-link :to="{name: 'user', params: {name: item.author.loginname}}" class="messager-avatar">
                                                  <img :src="item.author.avatar_url" alt="" />
                                              </router-link>
                                              <router-link :to="{name: 'user', params: {name: item.author.loginname}}" class="messager-name link">
                                                  {{ item.author.loginname }}
                                              </router-link>
                                              <p class="message-content">
                                                  <span v-if="item.type == 'at'">在话题</span>
                                                  <span v-if="item.type == 'reply'">回复了您的话题</span>
                                                  <router-link :to="{name: 'topic', params: {id: item.topic.id}}" class="message-topic link">
                                                      {{ item.topic.title }}
                                                  </router-link>
                                                  <span v-if="item.type == 'at'">@了您</span>
                                              </p>
                                              <span class="message-time">{{ item.create_at | getDateFromNow }}</span>
                                          </li>
                                      </ul>
                                      <span class="noData" v-else>暂无消息</span>
                                  </main>
                              </el-card>
                          </div>
                      </el-col>
                  </el-row>

              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <cvAside :author-name="user.loginname" :hasRecent="false" v-if="user.loginname"></cvAside>
                  </div>
              </el-col>
          </el-row>
        </main>
    </div>
</template>

<script>
import cvHead from "../components/header.vue";
import cvAside from  "../components/aside.vue";
import {mapGetters} from "vuex";

export default {
  data () {
    return {
        messages: {
            has_read_messages: [],
            hasnot_read_messages: []
        }
    }
  },
  computed: mapGetters({
      user: "getUserInfo"
  }),
  created (){
      if(this.user.accesstoken){
          this.fetchMessages();
      }
  },
  mounted () {},
  methods: {
      //获取已读和未读消息
      fetchMessages () {
          this.setLoading(true);
          let self = this;
          $.ajax({
              url: "https://cnodejs.org/api/v1/messages",
              type: "GET",
              data: {
                  accesstoken: self.user.accesstoken
              }
          }).done((res) => {
              self.setLoading(false);
              if (!res || !res.success) {
                  //TODO 是否错误抛出  有待商榷
                  self.$message({
                      showClose: true,
                      message: "数据获取失败，请稍后再试！",
                      type: "warning"
                  });
                  return;
              }
              self.messages = res.data || self.messages;
          }).fail((error) => {
              this.setLoading(false);
              //TODO 是否错误抛出  有待商榷
              self.$message({
                  showClose: true,
                  message: "数据获取失败，请稍后再试！",
                  type: "warning"
              })
          });
      },
      //消息全部已读
      markAll (){
          if(!this.user.accesstoken){
            return;
          }
          if(this.messages.hasnot_read_messages.length < 1){
              this.$message({
                  showClose: true,
                  message: "暂无未读消息",
                  type: "info"
              });
              return;
          }
          this.setLoading(true);
          let self = this;
          $.ajax({
              url: "https://cnodejs.org/api/v1/message/mark_all",
              type: "POST",
              dataType: "json",
              data: {
                  accesstoken: self.user.accesstoken
              }
          }).done((res) => {
              this.setLoading(false);
              if(!res || !res.success){
                  self.$message({
                      showClose: true,
                      message: "操作失败",
                      type: "warning"
                  });
                  return;
              }
              self.messages.has_read_messages = self.messages.hasnot_read_messages.concat(self.messages.has_read_messages);
              self.messages.hasnot_read_messages = [];
              self.$message({
                  showClose: true,
                  message: "消息全部设置已读！",
                  type: "success"
              });
              self.$store.commit("setValue", {
                  key: "message",
                  value: 0
              });
              localStorage.message = 0;
          }).fail((error) => {
              this.setLoading(false);
              self.$message({
                  showClose: true,
                  message: "操作失败",
                  type: "warning"
              });
          });
      },
      setLoading (state) {
          this.$store.commit("setLoading", state);
      }
  },
  components: {
      cvHead,
      cvAside
  }
}
</script>

<style lang="sass">
    .messages{
        .message-item{
            border-top: 1px solid #f0f0f0;
            padding: 10px 0;
            &:nth-of-type(1) {
              border-top: none;
              padding-top: 0;
            }
            .messager-avatar{
                display: inline-block;
                img{
                    width: 30px;
                    height: 30px;
                }
            }
            .link{
                color: #20a0ff;
            }
            .message-content{
                display: inline-block;
            }
            .message-time{
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
</style>
