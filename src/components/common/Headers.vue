<template>
    <div class="view-header" id="view-header">
        <ul class="header">
            <li>
                <span class="back" @click.stop.prevent="backEmit()"></span>
            </li>
            <li class="li2">
                <span class="title">{{headers.title}}</span>
            </li>
            <li class="li3">
                <span class="text" @click.stop.prevent="skipEmit()">{{headers.skip}}</span>
            </li>
            <slot name="righIcon"></slot>
        </ul>
    </div>
</template>
<script>
    export default{
        props: {
            headers: {
                type: Object,
                default: {}
            }
        },
        methods: {
            backEmit(){
                this.$emit('back-click');
            },
            skipEmit(){
                this.$emit('skip-click');
            }
        }
    }
</script>
<style lang="less" scoped>
    .view-header {
      position: fixed;
      top:0;
      left:0;
      width: 100%;
      height:44px;
      z-index: 200;

      .header {

            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding:0;
            background: #fff;
            height:44px;
            //box-shadow: 0 0 0.02rem rgba(0,0,0,.2);
            margin:0;
            li {
                width: 20%;
                display: flex;
                &.li2 {
                    width: 60%;
                    align-items: center;
                    justify-content: center;
                }
                &.li3 {
                    align-items: flex-end;
                    justify-content: flex-end;
                }
                &:first-child{
                    padding-left: 16px;
                }
            }
            .back {
                width: 12px;
                height: 12px;
                transform: rotate(45deg);
                border-left: 1px solid #666;
                border-bottom: 1px solid #666;
                align-self: flex-start;
            }
            .title {
                font-size: 16px;
                color: #333;
                align-self: center;
            }
            .text {
                font-size: 12px;
                color: #333;
            }
        }

    }
</style>
