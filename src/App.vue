<template>
  <div id="app">
    <div id="app-main">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted()
  {
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

  #app-main
  {
    height: 100%;
    overflow-y: auto;
    position: relative;
   // -webkit-overflow-scrolling: touch;
  }
}
input,textarea {
	-webkit-appearance: none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
</style>
