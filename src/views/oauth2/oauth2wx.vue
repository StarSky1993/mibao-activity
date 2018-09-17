<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: 'oauth2wx',
    data()
    {
      return {
        code:this.$route.query.wx_code,
        oauth_from:localStorage.getItem('oauth_from'),
      }
    },
    methods: {
      process()
      {
        //保存微信code，返回来源
        localStorage.setItem('wx_code',this.code);
        window.location.replace(this.oauth_from);
      }
    },
    mounted()
    {
      this.process();
    }
  }
</script>

<style lang="less" scoped>

</style>
