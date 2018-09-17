<template>
	<div class="allround" v-if="isShow">
	    <div class="mf-loading-container">
	        <img :src="loadImg">
	    </div>
    </div>
</template>
<script>
  const COMPONENT_NAME = 'loading'
  export default {
    name: COMPONENT_NAME,
    props: {
    	isShow: {
    		type: Boolean,
    		default: false,
    	}
    },
    data() {
    	return {
	    	loadImg: require('../../assets/img/comm/loading.gif')
	    }
    }
  }
</script>
<style lang="less" scoped>
.allround {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 999;
	display:flex;
	justify-content: center;
	align-items: center;
	background: rgba(0,0,0,0.7);
	.mf-loading-container {
		img {
			width: 30px;
			height: 30px;
			display: block;
		}
	}
}
</style>
