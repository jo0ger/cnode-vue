<template lang="html">
    <section class="reply-panel">
        <textarea :id="'answereditor' + flag" :placeholder="placeholder" autofocus></textarea>
        <el-button type="primary" @click.native="reply">{{ btnText }}</el-button>
    </section>
</template>

<script>
import "../assets/plugins/simplemde/simplemde.min.css";
import Simplemde from "../assets/plugins/simplemde/simplemde.min.js";
import tool from "../libs/tool";
import Markdown from "markdown";

let markdown = Markdown.markdown,
    simplemde = null;

export default {
    data() {
        return {
            user: {
                loginname: localStorage.loginname || "",
                accesstoken: localStorage.accesstoken || "",
                id: localStorage.id || "",
                avatar: localStorage.avatar || ""
            },
            flag: new Date().getTime(), //这里是为了将多个评论框区分开
            tagText: '<br/><br/><a class="tag" target="new" href="https://github.com/BubblyPoker/cnode-vue">来自 cnode-vue</a>',
            placeholder: "请输入评论...",
            btnText: "评论",
            replyCache: localStorage.replyCache || "" //如果用户未登录，暂存已编写好的评论
        }
    },
    props: ["topic", "replyId", "replyTo"],
    computed: {},
    created (){
        if(!this.user.loginname){
            this.placeholder = "您未登录，评论将暂存...";
            this.btnText = "登录后评论";
        }
        // $("body").animate({
		// 	scrollTop : $("body").offset().top
		// }, 500)
    },
    mounted() {
        if(this.replyId){
            let editor_top = $("#answereditor" + this.flag).offset().top,
                window_top = $(window).scrollTop(),
                window_height = $(window).height();
            if(editor_top > window_top + window_height){
                $("body").animate({
                    scrollTop: $("#answereditor" + this.flag).offset().top - window_height / 3
                }, 500);
            }
        }
        simplemde = new Simplemde({
            element: document.getElementById('answereditor' + this.flag),
            forceSync: true,
            toolbarTips: true,
            showIcons: ["bold", "italic", "strikethrough", "heading", "heading-smaller", "heading-bigger", "heading-1", "heading-2", "heading-3", "code", "quote", "unordered-list", "ordered-list", "clean-block", "link", "image", "table", "horizontal-rule", "preview", "side-by-side", "fullscreen", "guide"]
        })
        this.replyTo && simplemde.value("@" + this.replyTo);
        if(this.topic.id === localStorage.topicId){
            this.replyCache && simplemde.value(this.replyCache);
        }



    },
    methods: {
        unLoginHandle (){
            let replyTmp = document.getElementById("answereditor" + this.flag).value;
            if(replyTmp){
                localStorage.topicId = this.topic.id;
                localStorage.replyCache = replyTmp;
            }
            this.$router.replace({name: "login", query: {redirect: encodeURIComponent(this.$route.path)}});
        },
        clearReplyCache () {
            this.replyCache = "";
            localStorage.removeItem("topicId");
            localStorage.removeItem("replyCache");
        },
        reply() {
            if(!this.user.loginname){
                this.unLoginHandle();
            }else{
                let self = this,
                //这里不能使用simplemde.value()，
                //如果评论里的回复框一旦有一个以上打开过，则simplemde的codemirror将这个框的值映射过来
                //导致话题评论框点击发表时，replyContent的值是刚打开过的评论回复框的值
                replyContent = document.getElementById("answereditor" + this.flag).value || "";
                if (!replyContent) {
                    self.$message({
                        showClose: true,
                        message: "请输入评论内容",
                        type: "warning"
                    });
                    return;
                }
                let linkUsers = tool.linkUsers(replyContent),
                htmlText = markdown.toHTML(linkUsers) + self.tagText,
                rendered_reply_content = $('<div class="markdown-text"></div>').append(htmlText)[0].outerHTML,
                post_date = new Date(),
                post_data = {
                    accesstoken: self.user.accesstoken,
                    content: replyContent + self.tagText,
                };
                if (self.replyId) {
                    post_data.reply_id = self.replyId;
                }
                $.ajax({
                    url: "https://cnodejs.org/api/v1/topic/" + self.topic.id + "/replies",
                    type: "POST",
                    dataType: "json",
                    data: post_data
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
                        message: "评论成功",
                        type: "success"
                    });
                    self.topic.replies.push({
                        id: res.reply_id,
                        author: {
                            loginname: self.user.loginname,
                            avatar_url: self.user.avatar
                        },
                        content: rendered_reply_content,
                        ups: [],
                        create_at: post_date
                    });
                    //评论完后将评论框内容清空
                    simplemde.value("");
                    //告诉comment.vue组件，关闭每个comment上的reply区域
                    self.$emit("hideReplyPanel");
                    //登录成功后，清除评论缓存
                    this.clearReplyCache();
                }).fail((error) => {
                    //TODO 是否错误抛出  有待商榷
                    self.$message({
                        showClose: true,
                        message: "操作失败",
                        type: "warning"
                    });
                });
            }
        }
    },
    components: {}
}
</script>

<style lang="sass"></style>
