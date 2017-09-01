<template>
    <div class="line-container"></div>
</template>
<script>
import { mapGetters } from "vuex"
import posLine from './posLine'
import _ from 'lodash'
export default{
    computed:{
        ...mapGetters({
            allElementsOption:'global/getAllElementsOption'
        })
    },
    watch:{
        allElementsOption : {
            deep:true,
            handler(e){
                if (window.PosLine) {
                    window.PosLine.upDate(e['selectId'], 'ylf-element')
                }
            }
        }
    }
}
</script>
<style>
    .line-container{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        -webkit-user-drag: none;
        pointer-events: none;

    & .vertical_line {
          height: 100%;
          position: absolute;
          top: 0;
          left: 100px;
          width: 1px;
          border-left: 1px dashed #334456;
          z-index: 9;
          display: block;
      }
    & .horizon_line {
          width: 110%;
          position: absolute;
          top: 100px;
          left: -5%;
          height: 1px;
          border-top: 1px dashed #334456;
          z-index: 9;
          display: block;
      }
    & .select_horizonLine{
          border-top: 1px solid #00ccff;
      }
    & .select_verticalLine{
          border-left: 1px solid #00ccff;
      }
    }
</style>