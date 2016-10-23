<template lang="html">
    <div id="container">
        <cv-head></cv-head>
        <main id="main">
            <el-row :gutter="20">
                <el-col :span="18" id="content" :offset="3">
                    <div class="grid-content bg-purple">
                        <el-card class="box-card">
                            <header slot="header" class="clearfix" id="panel-header">
                                <span>关于</span>
                            </header>
                            <main>
                                暂未做好
                            </main>
                        </el-card>
                    </div>
                </el-col>
              </el-row>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {},
    mounted() {},
    methods: {},
    components: {
        "cv-head": require("../components/header.vue")
    }
}
</script>

<style lang="sass">
</style>
