<template lang="html">

  <el-card :body-style="{ padding: '0px' }" v-if="author.loginname">
      <router-link :to="{name:'user', params: {name: author.loginname}}" class="avatar">
        <img :src="author.avatar_url" alt="" class="img"/>
      </router-link>
      <div style="padding: 14px;">
        <router-link :to="{name:'user', params: {name: author.loginname}}" class="name">
          <span v-text="author.loginname"></span>
        </router-link>
        <div class="bottom clearfix">
          <span class="score">积分：{{author.score}}</time>
        </div>
      </div>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
          author: {}
        }
    },
    props: ["authorName"],
    computed: {},
    created (){
        this.fetchUserInfo();
    },
    mounted() {},
    methods: {
        //获取用户信息
        fetchUserInfo (){
            let self = this;
            $.ajax({
                url: "https://cnodejs.org/api/v1/user/" + self.authorName,
                type: "GET",
            }).done((res) => {
                if(!res || !res.success){
                    //TODO 是否错误抛出  有待商榷
                    return;
                }
                this.author = res.data;
            }).fail((error) => {
                //TODO 是否错误抛出  有待商榷
            });
        },
    },
    components: {}
}
</script>

<style lang="sass">

</style>
