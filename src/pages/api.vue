<template lang="html">
    <div id="container">
        <cvHead></cvHead>
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
<<<<<<< HEAD
import cvHead from "../components/header.vue";

let apimd = require("../assets/api.md"),
    markdown = require("markdown").markdown;
=======
let apimd = require("../assets/api.md");
console.log(apimd);
let markdown = require("markdown").markdown;
>>>>>>> 276e568e229bf0849e45458f5cef00f1c63fe3e3
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
        cvHead
    }
}
</script>

<style lang="sass">
</style>
