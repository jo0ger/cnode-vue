<template lang="html">
    <div id="container">
        <main id="main">
            <el-row :gutter="20">
                <el-col :span="18" id="content" :offset="3">
                    <div class="grid-content bg-purple">
                        <el-card class="box-card">
                            <header slot="header" class="clearfix" id="panel-header">
                                <span>Api</span>
                            </header>
                            <main>
                                <transition name="transition">
                                <section class="markdown-body" v-html="apiContent"  v-if="apiContent">
                                </section>
                            </transition>
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
import cvLoading from "../components/loading.vue";
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
            this.loading.show();
            let self = this;
            $.get(apimd)
                .done(res => {
                    self.loading.hide();
                    if (!res) {
                        //TODO 错误抛出
                        return;
                    }
                    let html = markdown.toHTML(res);
                    self.apiContent = html;
                })
                .fail(error => {
                    //TODO 错误抛出
                    self.loading.hide();

                })
        }
    },
    components: {
        cvHead,
        cvLoading
    }
}
</script>
