<template lang="html">
  <div id="aside" class="aside" v-if="username">
    <header id='aside-header' class="aside-header">
      <span v-text="isIndex && '个人信息' || '作者'"></span>
    </header>
    <main id="aside-content" class="aside-content">
      <div class="user-area">
        <router-link :to="{name:'user', params: {id: userid}}" class="avatar">
          <img :src="avatar" alt="" />
        </router-link>
        <div class="right-wrap">
          <router-link :to="{name:'user', params: {id: userid}}" class="name">
            <span v-text="username"></span>
          </router-link>
          <span class="score" v-if="author">积分：{{ author.score }}</span>
          <a href="javascript:" @click="logout" v-if="isIndex">退出</a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
    data() {
        return {
            author: {}
        }
    },
    props: ["username", "avatar", "userid", "isIndex"],
    computed: {},
    created () {
        this.fetchUser();
    },
    mounted() {},
    methods: {
        logout() {
            localStorage.removeItem("id");
            localStorage.removeItem("loginname");
            localStorage.removeItem("avatar");
            window.location.reload();
        },
        fetchUser () {
            if(!this.username){
                return;
            }
            $.ajax({
                url: "https://cnodejs.org/api/v1/user/" + this.username,
                dataType: "json",
            }).done((res) => {
                console.log(res);
                if(!res || !res.data)
                    return;
                this.author = res.data;
            }).fail((error) => {

            })
        }
    },
    components: {}
}
</script>

<style lang="sass">
#aside {
    width: 290px;
    font-size: 14px;
    float: right;
    #aside-header {
        color: #51585c;
        border-radius: 3px 3px 0 0;
        background-color: #f6f6f6;
        padding: 10px;
    }
    #aside-content {
        padding: 10px;
        border-radius: 0 0 3px 3px;
        background-color: #fff;
        .user-area {
            width: 100%;
            height: 50px;
            .avatar {
                width: 48px;
                height: 48px;
                display: block;
                float: left;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .right-wrap {
                margin-left: 60px;
                a {
                    text-decoration: none;
                    color: #778087;
                }
                .name{

                }
                .score{
                    display:block;
                }
            }
        }
    }
}
</style>
