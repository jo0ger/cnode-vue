<template lang="html">
    <div id="container">
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
    <cvLoading :showLoading="loading"></cvLoading>
  </div>
</template>

<script>
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
            loading: false,
            redirect: this.$route.query.redirect || ""
        }
    },
    mounted() {},
    methods: {
        goBack() {
            let redirect = decodeURIComponent(this.$route.query.redirect);
            this.$router.replace(redirect);
        },
        login() {
            let self = this,
                accesstoken = self.at;
            if (!accesstoken) {
                self.$message({
                    showClose: true,
                    message: "token格式错误，可从官网个人设置页面获取",
                    type: "error"
                })
                return;
            }

            self.loading = true;

            $.ajax({
                type: "POST",
                url: 'https://cnodejs.org/api/v1/accesstoken',
                dataType: 'json',
                data: {
                    accesstoken: accesstoken
                }
            }).done((res) => {
                self.loading = false;
                if (!res || !res.success) {
                    self.errorHandle();
                    return;
                }
                let user = {
                    id: res.id,
                    loginname: res.loginname,
                    avatar: res.avatar_url,
                    accesstoken: accesstoken,
                    score: null,
                    message: null
                };
                //由于vuex在页面刷新时会把state清空（什么鬼呀）
                //所以此处得把user信息存入localStorage
                Object.keys(user).forEach(v => {
                    localStorage[v] = user[v];
                });
                this.$store.dispatch("setUserInfo", user).then(() => {
                    self.$message({
                        showClose: true,
                        message: "登录成功",
                        type: "success",
                        onClose() {
                            let redirect = decodeURIComponent(self.$route.query.redirect || "/");
                            self.$router.replace(redirect);
                        }
                    });
                });
            }).fail((error) => {
                self.loading = false;
                self.errorHandle();
            });
        },
        errorHandle (){
            self.$message({
                showClose: true,
                message: "登录出错，请稍候再试！",
                type: "warning"
            });
        }
    },
    components: {
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
