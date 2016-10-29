<template lang="html">
    <div id="container">
        <main id="main">
            <el-row :gutter="20">
                <el-col :span="18" id="content" :offset="3" class="cv cv-100">
                    <div class="grid-content bg-purple">
                        <el-card class="box-card">
                            <header slot="header" class="clearfix" id="panel-header">
                                <span>关于</span>
                            </header>
                            <main>
                                <section class="markdown-body" v-if="aboutContent" v-html="aboutContent">
                                </section>
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
import aboutmd from "../assets/about.md";

const markdown = Markdown.markdown;

export default {
    data() {
        return {
            aboutContent: ""
        }
    },
    computed: {},
    created (){
        this.fetchAboutPage();
    },
    mounted() {},
    methods: {
        fetchAboutPage (){
            this.setLoading(true);
            let self = this;
            $.get(aboutmd)
                .done(res => {
                    this.setLoading(false);
                    if(!res){
                        //TODO 错误抛出
                        return;
                    }
                    let html = markdown.toHTML(res);
                    self.aboutContent = html;
                })
                .fail(error => {
                    //TODO 错误抛出
                    this.setLoading(false);
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

<style lang="sass">
</style>
