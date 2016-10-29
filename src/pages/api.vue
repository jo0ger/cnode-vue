<template lang="html">
    <div id="container">
        <main id="main">
            <el-row :gutter="20">
                <el-col :span="18" id="content" :offset="3" class="cv cv-100">
                    <div class="grid-content bg-purple">
                        <el-card class="box-card">
                            <header slot="header" class="clearfix" id="panel-header">
                                <span>Api</span>
                            </header>
                            <main>
                                <section class="markdown-body" v-html="apiContent"  v-if="apiContent">
                            </main>
                        </el-card>
                    </div>
                </el-col>
              </el-row>
        </main>
    </div>
</template>
<script>
import cvHead from "../components/header.vue";
import Markdown from "markdown";
import apimd from "../assets/api.md";
const markdown = Markdown.markdown;

export default {
    data() {
        return {
            apiContent: "",
            loading: {
                showLoading: false,
                show() {
                    this.showLoading = true;
                },
                hide() {
                    this.showLoading = false;
                }
            },
        }
    },
    computed: {},
    created() {
        this.fetchApiPage();
    },
    mounted() {},
    methods: {
        fetchApiPage() {
            this.setLoading(true);
            let self = this;
            $.get(apimd)
                .done(res => {
                    self.setLoading(false);
                    if (!res) {
                        //TODO 错误抛出
                        return;
                    }
                    let html = markdown.toHTML(res);
                    self.apiContent = html;
                })
                .fail(error => {
                    //TODO 错误抛出
                    self.setLoading(false);

                })
        },
        setLoading (state) {
            this.$store.commit("setLoading", state);
        }
    },
    components: {
        cvHead
    }
}
</script>
