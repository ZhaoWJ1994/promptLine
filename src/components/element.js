import Component from "vue-class-component"
import DragClass from './drag'

@Component({
     props:{
        options:{
            type:Object,
            default(){
                return {}
            }
        }
     }
})
export default class elementBox {
    data(){
      return {

      }
    }
    clickHandler(op){
       // 设置当前选中的尺寸
       this.$store.dispatch("global/selectorSize",{
         id :this.$refs.box.id,
         size :op
       })

    }

    // 移动组件中
    movingElement(op){
      this.$store.dispatch("global/setMovingPos",{
        id :this.$refs.box.id,
        moveObj :op
      })
    }

    changeElement(op){
        this.$store.dispatch("global/setAllElementsOption",{
            id : this.$refs.box.id,
            elementOption : op
        })
    }

    resizeDone(){

    }
    contextMenuHandler(){

    }
    render(h){
        let content ;
        if(this.options.type == "1"){
          content = <h1>1234567890</h1>
        }else if(this.options.type == "2"){
          content = <button class="btn">按钮</button>
        }else if(this.options.type == "3"){
          content = <img class="ylf" width="40" height="40"></img>
        }
        this.$store.dispatch("global/setAllElementsOption",{
            id :this.options.id,
            elementOption :this.options.size
        })
        return(
            <DragClass ref="box" options={this.options} onMoveElement={this.movingElement}
                 onHandlerClick={this.clickHandler}
                 onHandlerResize={this.resizeDone}
                 onHandlerRight={this.contextMenuHandler}
                 onMoveContinued={this.changeElement}>
              {content}
             </DragClass>
        )
    }
}
