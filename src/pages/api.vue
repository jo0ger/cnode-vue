<template lang="html">
    <div id="container">
        <cv-head></cv-head>
        <main id="main">
            <el-row :gutter="20">
                <el-col :span="18" id="content" :offset="3">
                    <div class="grid-content bg-purple">
                        <el-card class="box-card">
                            <header slot="header" class="clearfix" id="panel-header">
                                <span>Api</span>
                            </header>
                            <main>
                                <section class="markdown-body" v-html="apiContent">

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
let apimd = require("../assets/api.md");
console.log(apimd);
let markdown = require("markdown").markdown;
export default {
    data() {
        return {
            apiContent: ""
        }
    },
    computed: {},
    created (){
        this.fetchApiPage();
    },
    mounted() {},
    methods: {
        fetchApiPage (){
            let self = this;
            $.get(apimd)
                .done(res => {
                    if(!res){
                        //TODO 错误抛出
                        return;
                    }
                    let html = markdown.toHTML(res);
                    self.apiContent = html;
                })
                .fail(error => {
                    //TODO 错误抛出
                })
        }

    },
    components: {
        "cv-head": require("../components/header.vue")
    }
}
</script>

<style lang="sass">
</style>
