<template>
    <div class="ylf-screens ps-container">
        <div class="ylf-screens__container"id="screen-container">
            <div class="screen">
                <div class="canvas" id="canvas-container" @click="clearPosLine">
                    <div class="sgrid"></div>
                    <lineContainer ref="lineBox"></lineContainer>
                    <elementBox :options="comp" v-for="comp in getComps"></elementBox>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import elementBox from "components/element.js"
import lineContainer from "components/autoPosLine.vue"
import { mapGetters } from "vuex"
export default{
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters({
            getComps:'global/getComponents'
        })
    },
    methods: {
        clearPosLine() {
            if (window.PosLine) {
                window.PosLine.destroyLine()
            }
        }
    },
    components:{
        elementBox,
        lineContainer
    }
}
</script>
<style>

.btn{
}
.ylf {
   background:url("../assets/images/ylf.png")
}

.ps-container{
   overflow: hidden !important;
}

.iScrollHorizontalScrollbar{
    bottom: 5px  !important;
    display:block;
}

@component-namespace ylf {
    @b screens{
        position: fixed;
        left: 180px;
        bottom: 0;
        box-sizing: border-box;
        overflow: auto;
        z-index: 2;
        background: #f0f0f2;
        width:80%;
        @e container{
            position: relative;
            z-index: -100;
            width: 100%;
            height: 600px;
            & .screen{
                z-index: -100;
                background: #e3e8ea;
                border: 1px solid #bbbbbb;
                border-radius: 10px;
                position: absolute;
                padding: 19px 19px 39px 19px;
                transform-origin: center 0;
                transition: all 0.3s ease-in-out;
                width:100%;
                height:600px;
                & .sgrid{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAB9JREFUOBFj0LNwa2AYBaMhMBoCoyEwGgKjIUB5CAAAbb0BLe8mjoMAAAAASUVORK5CYII=");
                    pointer-events: none
                }

                & .canvas{
                    border: 1px solid #c2c2c3;
                    width: 100%;
                    height: 100%;
                    background:#f0f0f2 repeat top left;
                    background-size: 100% auto;
                    overflow: visible;
                    position: relative;
                    z-index: -65535;
                }
                & .actions{
                    position: absolute;
                    left: 0;
                    bottom: 0px;
                    height: 39px;
                    width: 100%;
                    text-align: center;
                    z-index: -65536;
                    & .resizer_y{
                        position: absolute 0 * * 0;
                        size :100%;
                        line-height: 36px;
                        color: #888888;
                        & .enlarge ,& .reduce{
                            display: inline-block;
                            width: 30px;
                            cursor: pointer;
                        }
                        & .tip{
                            cursor: ns-resize;
                        }
                    }
                }

            }
        }

        @e minimap{
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 1;
            width: 100px;
            height: 50px;
            border: 1px solid #ccc;
            border-right:none;
            border-bottom:none;
            background-color:#fff;
            @m indicator {
                position: absolute;
                z-index: 1;
                border: 1px solid #fe0;
                box-shadow: 0 0 5px #000;
                background: rgba(255,255,255,0.15);
                transform: translateZ(0);
                cursor:pointer;
            }
        }

    }


    @b element{
        position: absolute;
        text-align: center;
        padding: 0;
        z-index: 15;
    }
    @b rb {
        @e scale{
            position: absolute * 0 0 *;
            size: 20px;
            background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=') bottom right no-repeat;
            padding: 0 3px 3px 0;
            background-origin: content-box;
            box-sizing: border-box;
            cursor: se-resize;
        }

        &:before{
             position: absolute;
             top: -2px;
             left: -2px;
             display: block;
             width: 100%;
             height: 100%;
             content: "";
             border: 1px solid rgba(49,143,214,.60);
             z-index: -1;
       }

       @e radius{
          circle:5px #fff;
          border: 1px solid #08a1ef;
          position: absolute;
       }

       @m nw-resize{
         cursor: nw-resize;
         left: -4px;
         top: -4px;
       }

       @m n-resize{
         cursor: n-resize;
         left: 50%;
         margin-left: -4px;
         margin-top: -4px;
         top: 0;
       }

       @m ne-resize {
         cursor: ne-resize;
         margin-right: -4px;
         margin-top: -4px;
         right: 0;
         top: 0;
       }
       @m w-resize {
         cursor: w-resize;
         left: 0;
         margin-left: -4px;
         margin-top: -3px;
         top: 50%;
       }
       @m e-resize{
         cursor: e-resize;
         margin-right: -4px;
         margin-top: -3px;
         right: 0;
         top: 50%;
       }
       @m sw-resize{
         bottom: 0;
         cursor: sw-resize;
         left: 0;
         margin-bottom: -4px;
         margin-left: -4px;
       }
       @m s-resize{
         bottom: 0;
         cursor: s-resize;
         left: 50%;
         margin-bottom: -4px;
         margin-left: -3px;
       }
       @m se-resize{
         bottom: 0;
         cursor: se-resize;
         margin-bottom: -4px;
         margin-right: -4px;
         right: 0;
       }
    }
}



</style>