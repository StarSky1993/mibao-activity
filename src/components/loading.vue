<template>
  <div class="mf-loading-container">
    <img src="../assets/img/comm/loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'loading'
  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="scss" scoped>
  .mf-loading-container {
    img {
      width: 30px;
      height: 30px;
      display: block;
    }
  }
</style>