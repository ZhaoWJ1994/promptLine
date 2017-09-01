<template>
    <div class="input-group">
        <span class="input-group-addon" @click="minusClick"><i class="fa fa-minus"></i></span>
        <input type="text" v-model="val">
        <span class="input-group-addon" @click="plusClick"><i class="fa fa-plus"></i></span>
    </div>
</template>
<style>



.input-group{
    position: relative;
    display: table;
    border-collapse: separate;

    & input{
      text-align: center;
    }
    & input[type='text']{
        border: 1px solid #c1c3c6;
        margin: 0;
        padding: 4px 5px;
        width: 100%;
        height: 22px;
        font-size: 12px;
        line-height: 14px;
        outline: none;
        color: #666666;
        display: block;
    }

    & .input-group-addon{
        padding: 6px 12px;
        font-size: 14px;
        font-weight: normal;
        line-height: 1;
        color: #f55d54;
        text-align: center;
        background-color: #feeeed;
        border: 1px solid #f55d54;
        border-radius: 0px;
    }
}

.input-group-addon, .input-group-btn, .input-group .form-control{
   width: 1%;
   white-space: nowrap;
   vertical-align: middle;
   display: table-cell;
   &:first-child,&:last-child{
       border-bottom-right-radius: 0;
       border-top-right-radius: 0;
   }
}

</style>
<script>
export default{
    props:['model'],
    data(){
        return{
            val:0
        }
    },
    watch:{
        model:{
            handler(ov,nv){
                if(ov){
                    this.val = ov
                }
            }
        },
        val:{
            handler(ov,nv){
                if(ov){
                    //this.$emit('change',ov)
                }
            }
        }
    },
    methods:{
        minusClick(){
            this.val = parseInt(this.val,10) -  1;
        },
        plusClick(){
            this.val = parseInt(this.val,10) +  1;
        }
    }
}
</script>
