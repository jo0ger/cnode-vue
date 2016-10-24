<template lang="html">
<div id="container">
<cvHead></cvHead>
<main id="main">
    <el-row :gutter="20" id="container">
        <el-col :span="18" id="content" :offset="3">
            <div class="grid-content bg-purple">
                <el-card class="box-card index">
                    <div slot="header" class="clearfix index-nav">
                        <el-menu id="navbar" theme="light" :default-active="curTab" class="el-menu-demo" mode="horizontal" router>
                            <el-menu-item index="all" :route="{name: 'index', query: {tab: 'all'}}">全部</el-menu-item>
                            <el-menu-item index="good" :route="{name: 'index', query: {tab: 'good'}}">精华</el-menu-item>
                            <el-menu-item index="share" :route="{name: 'index', query: {tab: 'share'}}">分享</el-menu-item>
                            <el-menu-item index="ask" :route="{name: 'index', query: {tab: 'ask'}}">问答</el-menu-item>
                            <el-menu-item index="job" :route="{name: 'index', query: {tab: 'job'}}">招聘</el-menu-item>
                        </el-menu>
                        <cvLoading :showLoading="loading.showLoading"></cvLoading>
                    </div>
                    <cvList :topics="topics"></cvList>
                    <section class="page">
                        <!-- <cvPage></cvPage> -->
                    </section>
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
import cvList from  "../components/list.vue";

export default {
    data() {
        return {
            topics: [],
            curTab: this.$route.query.tab || "all",
            queryData: {
                page: 1,
                tab: "all",
                limit: 20,
                mdrender: true
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
            scrollLock: false
        };
    },
    computed: {},
    created: function() {
        sessionStorage.setItem("tab", this.queryData.tab);
    },
    watch: {
        "$route" () {
            this.curTab = this.$route.query.tab || "all";
            this.fetchTopics();
        }
    },
    mounted() {
        this.fetchTopics();
        //上拉加载
        window.addEventListener("scroll", (e) => {
          this.scrollLoad();
      });
    },
    methods: {
        fetchTopics() {
            this.loading.show();
            let tab = this.$route.query.tab || "all",
                tabdiff = tab === this.queryData.tab;
            this.queryData.tab = tab;
            $.ajax({
                url: "https://cnodejs.org/api/v1/topics",
                type: "GET",
                data: this.queryData
            }).done((data) => {
                this.loading.hide();
                this.scrollLock = true;
                if (!data || !data.success) {
                    //TODO 错误抛出
                    return;
                }
                data.data.forEach((v, i) => {
                    v.typeClass = this.getTypeClass(v.top, v.good, v.tab);
                });
                if(!tabdiff){
                  this.topics = [];
                }
                this.topics = this.topics.concat(data.data);

            }).fail((error) => {
                this.showLoading = false;
                //TODO 错误抛出
            });
        },
        getTypeClass(top, good, tab) {
            if (top) {
                return "success";
            } else if ( good) {
                return "danger";
            } else if (tab == "ask") {
                return "primary";
            } else if (tab == "job") {
                return "warning";
            } else if (tab == "share") {
                return "";
            }else if (!top && !good && !tab || (this.$route.query.tab === tab)) {
                return "hidden";
            } else {
                return "";
            }


        },
        scrollLoad: function(){
          if(!this.scrollLock)
            return;
          let body = document.body,
              height = body.clientHeight + body.scrollTop,
              scrollHeight = body.scrollHeight;
          if(height > scrollHeight - 10){
            this.scrollLock = false;
            this.queryData.page++;
            this.fetchTopics();
          }
        }

    },
    components: {
        cvHead,
        cvLoading,
        cvList
    }
}


</script>

<style lang="sass">
#content {
    .index{
        .el-card__header {
            padding: 0;
            background-color: #eff2f7;
            .index-nav {}
            }
    }
  }
</style>
