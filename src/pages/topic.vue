<template lang="html">
  <div id="container">
  <cv-head></cv-head>
  <main id="main" v-if="!topicerror">
      <el-row :gutter="20">
        <el-col :span="18">
            <el-row>
                <el-col :span="24" id="topic-detail">
                    <div class="grid-content bg-purple">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <div class="topic-title">
                                    <el-tag :type="topic.typeClass" :hit="false" :class="topic.typeClass">{{ topic.top | getArticleType(topic.good, topic.tab) }}</el-tag>
                                    <h1 v-text="topic.title" class="title"></h1>
                                </div>
                                <p class="topic-info">
                                    <span>发布于 {{topic.create_at | getDateFromNow}}</span>
                                    <!-- 这里必须加v-if="topic.author" 不然console会报错，暂不清楚为什么 还有下面cv-aside处 -->
                                    <span v-if="topic.author">作者 {{topic.author.loginname}}</span>
                                    <span>{{topic.visit_count}} 次浏览</span>
                                    <span>{{topic.replies.length}} 评论</span>
                                    <span>来自 {{ topic.top | getArticleType(topic.good, topic.tab) }}</span>
                                    <el-button class="editBtn actionBtn" type="text" @click.native="topicEdit" v-if="user.loginname && user.loginname == topic.author.loginname">
                                        <i class="el-icon-edit"></i>编辑
                                    </el-button>
                                    <el-button class="collectBtn actionBtn" type="text" @click.native="topicCollect" v-if="user.loginname">
                                        <i :class="collectBtn[collectBtn.type]"></i>
                                        {{ topic.is_collect && '已' || ''}}收藏
                                    </el-button>
                                </p>
                            </div>
                            <main class="markdown-body topic-content" v-html="topic.content">
                            </main>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
            <cv-comment :topic="topic" :comment-list="topic.replies" :comment-count="topic.reply_count"></cv-comment>
            <el-row  id="reply-panel" class="cv-panel">
                <el-col :span="24" id="topic-detail">
                    <div class="grid-content bg-purple">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>回复评论</span>
                            </div>
                            <main class="markdown-body reply-content">
                                <cv-reply :topic.sync="topic"></cv-reply>
                            </main>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <cv-aside :topic-id="topic.id"
                    :hasRecent="true"
                    :author-name="topic.author.loginname"
                    v-if="topic.author"></cv-aside>
            </div>
        </el-col>
    </el-row>
  </main>
  <cv-loading :show-loading="loading.showLoading"></cv-loading>
  </div>
</template>

<script>
export default {
    data() {
        return {
            topic: {
                id: this.$route.params.id,
                author: {
                    loginname:""
                }
            },
            collectBtn: {
                type: "off",
                on: "el-icon-star-on",
                off: "el-icon-star-off",
                load: "el-icon-loading",
                lock: false, //防止用户多次点击
                switch (load) {
                    this.type = load || "on";
                }
            },
            user: {
                accesstoken: localStorage.accesstoken || "",
                loginname: localStorage.loginname || ""
            },
            loading: {
                showLoading: false,
                show() {
                    this.showLoading = true;
                },
                hide() {
                    this.showLoading = false;
                }
            },
            topicerror: false
        }
    },
    computed: {},
    created() {
        this.fetchTopicData();
    },
    mounted() {},
    watch: {
        "$route" (to, from) {
            //如果路由从一个主题进入到另一个主题，此时只改变了hash，因此需要异步加载主题详情
            if(to.name === from.name){
                this.topic.id = to.params.id;
                this.collectBtn.type = "off";
                this.fetchTopicData();
            }
        }
    },
    methods: {
        //获取主题详情
        fetchTopicData() {
            let self = this;
            self.loading.show();
            $.ajax({
                url: "https://cnodejs.org/api/v1/topic/" + self.topic.id,
                type: "GET",
                dataType: "json",
                data: {
                    mdrender: true,
                    accesstoken: self.user.accesstoken
                }
            }).done((res) => {
                self.loading.hide();
                if (!res || !res.success) {
                    //TODO 是否错误抛出  有待商榷
                    return;
                }
                self.topic = res.data || self.topic;
                self.topic.typeClass = this.getTypeClass(self.topic.top, self.topic.good, self.topic.tab)
                if (self.topic.is_collect) {
                    self.collectBtn.type = "on";
                }
            }).fail((error) => {
                //TODO 是否错误抛出  有待商榷
                self.loading.hide();
                self.topicerror = true;
                self.$message({
                  showClose: true,
                  message: JSON.parse(error.responseText).error_msg || "获取数据失败",
                  type: "warning"
                });
            });
        },
        //收藏主题
        topicCollect() {
            if (this.collectBtn.lock) {
                return;
            }
            let self = this,
                url = "https://cnodejs.org/api/v1/topic_collect/collect",
                isCollected = self.collectBtn.type === "on";
            self.collectBtn.switch("load");
            self.collectBtn.lock = true;
            //取消收藏的url
            if (isCollected) {
                url = "https://cnodejs.org/api/v1/topic_collect/de_collect";
            }
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    topic_id: self.topic.id,
                    accesstoken: self.user.accesstoken
                }
            }).done((res) => {
                if (!res || !res.success) {
                    //TODO 是否错误抛出  有待商榷
                    self.$message({
                        showClose: true,
                        message: "操作失败",
                        type: "warning"
                    });
                    return;
                }
                self.$message({
                    showClose: true,
                    message: (isCollected && "取消" || "") + "收藏成功",
                    type: "success"
                });
                self.collectBtn.switch(isCollected && "off" || "on");
                self.topic.is_collect = !isCollected;
                self.collectBtn.lock = false;
            }).fail((error) => {
                //TODO 是否错误抛出  有待商榷
                self.error = true;
                self.$message({
                    showClose: true,
                    message: "操作失败",
                    type: "warning"
                });
            });
        },
        //编辑主题
        topicEdit (){
            if(!this.user.accesstoken){
                this.$router.push({name: "login", query: {redirect: encodeURIComponent(this.$route.path)}});
            }else{
                let editTopic = {
                    tab: this.topic.tab,
                    title: this.topic.title,
                    content: ""
                };
                localStorage.editTopic = JSON.stringify(editTopic);
                this.$router.push({name: "edittopic", params: {id: this.topic.id}});
            }
        },
        getTypeClass(top, good, tab) {
            if (top) {
                return "success";
            } else if (good) {
                return "danger";
            } else if (tab == "ask") {
                return "primary";
            } else if (tab == "job") {
                return "warning";
            } else if (tab == "share") {
                return "";
            } else if (!top && !good && !tab || (this.$route.query.tab === tab)) {
                return "hidden";
            } else {
                return "";
            }
        },
    },
    components: {
        "cv-head": require("../components/header.vue"),
        "cv-aside": require("../components/aside.vue"),
        "cv-comment": require("../components/comment.vue"),
        "cv-reply": require("../components/reply.vue"),
        "cv-loading": require("../components/loading.vue")
    }
}
</script>

<style lang="sass">
#container {
    #topic-detail {
        .title {
            font-size: 18px;
            display: inline;
        }
        .topic-info {
            margin-top: 10px;
            position: relative;
            span {
                font-size: 12px;
                margin-left: 10px;
                display: inline-block;
                color: #838383;
                &:before {
                    content: "•";
                    margin-right: 5px;
                }
            }
            .actionBtn {
                color: #20a0ff;
                position: absolute;
                bottom: -12px;
                right: 0;
                &.editBtn{
                    right: 60px;
                }
            }
        }
    }
}
</style>
