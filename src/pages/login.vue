<template lang="html">
    <div id="container">
    <cv-head></cv-head>
    <main id="main">
    <div class="content" id="content">
      <div class="panel" id="panel">
        <header id="index-nav">登录</header>
        <main id="container">
          <div class="input-area">
            <el-form ref="form" label-width="80px" @submit.prevent="login">
              <el-form-item label="token">
                <el-input v-model="at" :maxlength="36" :minlength='36'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click.native="login">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </main>
      </div>
    </div>
</main>
    <cv-loading :showLoading="loading.showLoading" :content="loading.content"></cv-loading>
  </div>
</template>

<script>
export default {
    data() {
        return {
            at: "",
            alert: {
                title: "",
                type: "",
                description: "",
            },
            loading: {
                showLoading: false,
                content: "loading...",
                show() {
                    this.showLoading = true;
                },
                hide() {
                    this.showLoading = false;
                }
            }
        }
    },
    computed: {},
    mounted() {},
    methods: {
        login() {
            let self = this;
            if (self.at === '') {
                self.$message({
                    showClose: true,
                    message: "token格式错误",
                    type: "error"
                })
                return;
            }
            this.loading.show();
            $.ajax({
                type: "POST",
                url: 'https://cnodejs.org/api/v1/accesstoken',
                dataType: 'json',
                data: {
                    accesstoken: self.at
                }
            }).done((data) => {
                this.loading.hide();
                if (!data || !data.success) {
                    self.$message({
                        showClose: true,
                        message: "登录出错，请稍候再试！",
                        type: "warning"
                    })
                    return;
                }
                localStorage.loginname = data.loginname;
                localStorage.avatar = data.avatar_url;
                localStorage.id = data.id;
                self.$message({
                    showClose: true,
                    message: "登录成功",
                    type: "success",
                    onClose () {
                        self.$router.replace({
                            name: "index",
                            query: {
                                tab: "all"
                            }
                        });
                    }
                });
            }).fail((error) => {
                //TODO 错误抛出
                this.loading.hide();
                self.$message({
                    showClose: true,
                    message: "登录出错，请稍候再试！",
                    type: "warning"
                })
            });
        }
    },
    components: {
        "cv-head": require("../components/header.vue"),
        "cv-loading": require("../components/loading.vue"),
    }
}
</script>

<style lang="sass">
#content {
    margin-right: 300px;
    padding: 0;
    #panel {
        #index-nav {
            padding: 10px;
            background-color: #f6f6f6;
            border-radius: 3px 3px 0 0;
        }
        #container {
            background-color: #fff;
            min-height: 400px;
            position: relative;
            padding: 24px;
            .input-area {
                position: relative;
                text-align: center;
                width: 50%;
                margin-left: 25%;
            }
        }
    }
}
</style>
