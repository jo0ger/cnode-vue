<template lang="html">
    <div id="container">
        <cvHead></cvHead>
        <main id="main">
            <el-row :gutter="20">
                <el-col :span="18" id="content" :offset="3">
                    <div class="grid-content bg-purple">
                        <el-card class="box-card">
                            <header slot="header" class="clearfix" id="panel-header">
                                <span>关于</span>
                            </header>
                            <main>
                                <section class="markdown-body" v-html="aboutContent">

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
            let self = this;
            $.get(aboutmd)
                .done(res => {
                    if(!res){
                        //TODO 错误抛出
                        return;
                    }
                    let html = markdown.toHTML(res);
                    self.aboutContent = html;
                })
                .fail(error => {
                    //TODO 错误抛出
                })
        }

    },
    components: {
        cvHead
    }
}
</script>

<style lang="sass">
</style>
