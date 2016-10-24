<template lang="html">
    <div id="container">
    <cvHead></cvHead>
    <main id="main">
        <el-row :gutter="20">
            <el-col :span="18" id="content" :offset="3">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <header slot="header" class="clearfix" id="panel-header">
                            <span>登录</span>
                        </header>
                        <main>
                            <div class="input-area">
                              <el-form ref="form" label-width="80px" @submit.prevent="login">
                                <el-form-item label="token">
                                  <el-input v-model="at" :maxlength="36" :minlength='36' placeholder="请输入个人accesstoken..."></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click.native="goBack" v-if="redirect"><i class="el-icon-caret-left"></i>返回上一页</el-button>
                                  <el-button type="primary" @click.native="login">登录</el-button>
                                </el-form-item>
                              </el-form>
                            </div>
                        </main>
                    </el-card>
                </div>
            </el-col>
          </el-row>
    </main>
    <cvLoading :showLoading="loading.showLoading" :content="loading.content"></cvLoading>
  </div>
</template>

<script>
import cvHead from "../components/header.vue";
import cvLoading from "../components/loading.vue";

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
            },
            redirect: this.$route.query.redirect || ""
        }
    },
    computed: {},
    mounted() {},
    methods: {
        goBack() {
            let redirect = decodeURIComponent(this.$route.query.redirect);
            this.$router.replace(redirect);
        },
        login() {
            let self = this;
            if (self.at === '') {
                self.$message({
                    showClose: true,
                    message: "token格式错误，可从官网个人设置页面获取",
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
                localStorage.accesstoken = self.at;
                self.$message({
                    showClose: true,
                    message: "登录成功",
                    type: "success",
                    onClose() {
                        let redirect = decodeURIComponent(self.$route.query.redirect || "/");
                        self.$router.replace(redirect);
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
        cvHead,
        cvLoading
    }
}
</script>

<style lang="sass">
    .input-area {
        position: relative;
        text-align: center;
        width: 50%;
        margin-left: 25%;
    }
</style>
