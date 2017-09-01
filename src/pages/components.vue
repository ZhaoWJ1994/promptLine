<template>
    <div :class="['ylf-compArea',isModel ? 'model':'']">
        <div :class="['ylf-compArea__containers',isModel ? 'model':'']">
            <div class="items">
                <div class="item" v-for="(item,index) in compItems" @click="clickAction(item)">
                    <div class="component">
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from "lodash"
export default{
    data(){
        return{
            compItems:[],
            isModel:false
        }
    },
    mounted(){
        let comps = [
           {type:1 ,name:"文本",size:{width:150,height:50}},
           {type:2 ,name:"按钮",size:{width:80,height:40}},
           {type:3 ,name:"图片",size:{width:50,height:50}}
        ]
        this.compItems = comps;
    },
    methods:{

        createUUID(){
            function S4() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        },
        clickAction(it){
            let x = _.random(100,200);
            let y = _.random(10,200);
            it.size.x = x;
            it.size.y = y;
            let config = {
               id : this.createUUID(),
               type : it.type,
               size : it.size
            }
            this.$store.dispatch("global/addAction",config)
        }
    },
    components:{
    }
}
</script>
<style>
@component-namespace ylf {
    @b compArea {
        position: fixed;
        left: 0;
        top: 0;
        box-sizing: border-box;
        bottom: 0px;
        width: 180px;
        z-index: 4;
        border-right: 1px solid #aaaaaa;
        transition: all 0.15s ease-in-out;

        @e containers {
            margin-right: auto;
            margin-left: auto;
            overflow-y: auto;
            overflow-x: hidden;
            box-sizing: border-box;
            width: 100%;
            text-align: center;
            position: absolute;
            top: 0;
            bottom: 46px;
            background-color: #f7f7f7;
            padding: 0;
            & .items{
                width: 180px;

                & .group{
                    clear:both;

                    & .title{
                        line-height: 30px;
                        border-bottom: 1px solid #cccccc;
                        color: #666666;
                        margin: 10px 20px;
                    }
                }

                & .item:hover{
                  background: RGBA(255, 255, 255, 0.8)
                }
                & .item{
                    float: left;
                    opacity: 1;
                    margin: 0px;
                    cursor: pointer;
                    padding: 15px;
                    & .component{
                        background: white;
                        border: 1px solid #efefef;
                        width: 120px;
                        height: 30px;
                    }
                    & span{
                        color: #555555;
                        font-size: 14px;
                        line-height: 28px;
                    }
                }
            }
        }

        @e footer{
            height: 46px;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            text-align: center;
            line-height: 46px;
            background: #e3e8ea;
            border-top: 1px solid #aaaaaa;
            color: #888888;
            & a{
                color: #888888;
                text-decoration: none;
                font-size: 14px;
                width: 60px;
                display: inline-block;
                cursor: pointer;
                & i{
                 font-size: 20px;
                }
            }
        }
    }
}

.ylf-compArea.model{
    width:80px;
}

.ylf-compArea__containers.model .items{
    width : 50px
}
.ylf-compArea__containers.model .item{
    width: 50px;
    height: 50px;
    padding: 8px;
    margin-bottom: 10px;
    overflow: hidden;
    & .component{
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
}


</style>