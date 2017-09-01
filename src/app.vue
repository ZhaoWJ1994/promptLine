<template>
    <div class="workspace">
        <ComponentsBox></ComponentsBox>
        <Screens></Screens>
    </div>
</template>
<script>
import ComponentsBox from "pages/components"
import Screens from "pages/Screens"
export default{
    name : "app",
    data(){
        return{
        }
    },
    mounted(){
    },
    components:{
        Screens,
        ComponentsBox
    }
}
</script>
<style>
@reset-global pc;
body {
    font-family: 'Microsoft YaHei','Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB',SimSun,sans-serif;
    overflow: auto;
    font-weight: 400;
    font-size :14px;
    -webkit-font-smoothing: antialiased;
    background: #f9f9f9;
}

label{
    display:inline-block
}

* {
    box-sizing: border-box;
}

.workspace {
    position: fixed 0 0 *;
    size:100% 100%;
    background: #f0f0f2;
    transition: all 0.15s ease-in-out;
}

.rtoggle ,.ltoggle {
    background: #888888;
    position: absolute;
    display: block;
    top: 50%;
    margin-top: -16px;
    z-index: 10;
    cursor: pointer;
    font-size: 21px;
    color: white;
    opacity: 0.8;
    border-radius: 100%;
    width: 26px;
    height: 26px;

    & i {
        line-height: 24px;
        margin-left: 10px;
    }
    &:hover{
        opacity:1
    }
}

.rtoggle{
  left: -13px;
}
.ltoggle{
  right:-15px;
}
</style>