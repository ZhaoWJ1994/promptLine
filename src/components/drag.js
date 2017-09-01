/**
 * Created by ylf on 2017/2/17.
 */
/**
 * 底层拖拽类
 * @author yelingfeng
 */
import Component from "vue-class-component"
const int = (n)=>{
  return parseInt(n,10)
}
@Component({
  props :{
    options:{
      type:Object
    },
  },
  watch:{
    "options.size":{
      deep:true,
      handler(newVal,oval){
        if(newVal){
          this.setSize(newVal)
        }
      }
    },
  }
})
export default class DragClass{
  data(){
    return {
      handlers:[],
      isEditor:false,
      model:"dragging",
      minWidth: 20,
      minHeight: 20,
      oPos:{},
      top:0,
      left:0,
      w:0,
      h:0,
      boxOffset:{},
      axis:"both",
      title:"",
      titleProp:{},
      speed:5,
      transition : ''
    }
  }
  created(){
    this.top = int(this.options.size.y );
    this.left = int(this.options.size.x);
    this.w = int(this.options.size.width);
    this.h = int(this.options.size.height);
  }
  mounted(){
    this.box = $(this.$el);
    this.id = this.options.id;
    this.handlers['dragging'] = this.handlerDrag.bind(this);
    this.handlers['resizing'] = this.handlerResize.bind(this);
    this.handlers['complete'] = this.handlerComplete.bind(this);
    this.intBound()
    $(document).on('click',(e)=>{
      this.isEditor = false;
      e.stopPropagation();
    })
  }

  intBound(){
    // init 父容器bound
    this.parent = this.box.parent() ;
    this.parentOffset = this.parent.offset();
    this.parentOffset.left +=  parseInt(this.parent.css('border-left-width'),10)||0;
    this.parentOffset.top  +=  parseInt(this.parent.css('border-top-width'),10)||0;
    this.curBound = {
      left : this.parentOffset.left ,
      top : this.parentOffset.top ,
      right : this.parentOffset.left + this.parent.width() ,
      bottom : this.parentOffset.top + this.parent.height()
    }
  }

  handlerMouseDown(e){
    this._start(e,'dragging');
    // 鼠标按下时候的位置
    this.oPos = { x: e.pageX||0 ,y:e.pageY || 0}

    e.stopPropagation();
    // e.preventDefault();
  }


  handlerDrag(e){
    this.removeTransition()
    this.boxOffset.left = this._boundx(this.boxOffset.left + e.pageX - this.oPos.x, -this.w);
    this.boxOffset.top = this._boundy(this.boxOffset.top + e.pageY - this.oPos.y ,-this.h);
    this.oPos = {x: e.pageX , y:e.pageY}
    this.adjustBox(this.boxOffset.left - this.parentOffset.left , this.boxOffset.top - this.parentOffset.top)
  }

  handlerResize(e){
    this.removeTransition()
    let i = {
      x : this._boundx(e.pageX),
      y : this._boundy(e.pageY)
    }
    if(this.axis == "x"){
      if(this.vector.x === -1) this.boxOffset.left = Math.min(i.x , this.boxOffset.right - this.minWidth);
      if(this.vector.x === 1) this.boxOffset.right = Math.max(i.x, this.boxOffset.left + this.minWidth);
    }
    else if(this.axis == "both"){
      if(this.vector.x === -1) this.boxOffset.left = Math.min(i.x , this.boxOffset.right - this.minWidth);
      if(this.vector.x === 1) this.boxOffset.right = Math.max(i.x, this.boxOffset.left + this.minWidth);
      if(this.vector.y === -1) this.boxOffset.top = Math.min(i.y, this.boxOffset.bottom - this.minHeight);
      if(this.vector.y === 1) this.boxOffset.bottom = Math.max(i.y, this.boxOffset.top + this.minHeight);
    }

    let left = this.boxOffset.left - this.parentOffset.left ;
    let top = this.boxOffset.top - this.parentOffset.top;
    let width = this.boxOffset.right - this.boxOffset.left;
    let height = this.boxOffset.bottom - this.boxOffset.top;
    this.adjustBox(left,top,width,height )
    e.stopPropagation();
    e.preventDefault();
  }

  handlerComplete(e){
    $(document).off('mousemove',this.handlers[this.model]);
    $(document).off('mouseup',this.handlers['complete']);
    $(document).off('mousedown',this.handlerMouseDown);

    this.rbScaleMouseUp();
    e.stopPropagation();
    e.preventDefault();
  }

  handlerClick(e){
    this.isEditor = true;
    this.$emit('handlerClick',{
        w: this.w,
        h: this.h,
        x : this.left,
        y : this.top
    });
    e.stopPropagation();
  }

  handleContextMenu(e){
    this.$emit('handlerRight',e);
    e.stopPropagation();
  }


  _start(e,model){
    this.model = model;
    // 当前el 相对父el的偏移
    this.boxOffset = this.box.offset();
    this.boxOffset.right = this.boxOffset.left + this.w;
    this.boxOffset.bottom = this.boxOffset.top + this.h ;

    $(document).on({
      'mousemove':this.handlers[this.model],
      'mouseup':this.handlers['complete']
    })
    e.stopPropagation();
    //e.preventDefault();
  }

  _reszie(e,direction){
    if(!e || !this._setDirection(direction))return ;
    this._start(e,'resizing')
    return false;
  }

  _setDirection(direction){
    switch(direction){
      case 'w': this.vector = {x:-1 ,y:0}; break;  // 左
      case 'e': this.vector = {x:1 ,y:0}; break;   // 右
      case 'n': this.vector = {x:0 ,y:-1}; break;  // 上
      case 's': this.vector = {x:0 ,y:1}; break;   // 下
      case 'nw': this.vector = {x:-1 ,y:-1};break; // 左上
      case 'sw': this.vector = {x:-1 ,y:1}; break; // 左下
      case 'ne': this.vector = {x:1 ,y:-1};break;  // 右上
      case 'se': this.vector = {x:1 ,y:1 };break;  // 右下
      default:return false;
    }
    return true;
  }

  // 调整盒子
  adjustBox(left,top , width = this.w || 0, height = this.h || 0, up){
    this.left = int(left) ;
    this.top = int(top);
    this.w = int(width) ;
    this.h = int(height) ;
    let _this = this
    let op = {
      x : _this.left,
      y : _this.top,
      width : _this.w,
      height : _this.h
    }
    if (up) {
      if (window.PosLine) {
        window.PosLine.destroyLine()
      }
      return
    }
    _this.$emit('moveContinued',op)
  }

  _boundx(x = 0,extra = 0){
    return Math.max(Math.min(x , this.curBound.right + extra),this.curBound.left)
  }
  _boundy(y = 0,extra = 0){
    return Math.max(Math.min(y , this.curBound.bottom + extra),this.curBound.top)
  }

  beforeDestroy(){
    this.box.off()
  }

  rbScaleMouseDown(rb,e){
    this._reszie(e,rb);
    e.stopPropagation();
  }
  rbScaleMouseUp(e){
    let op = this.getSizeOp();
    this.$emit('handlerResize',e,op);
    // this.addTransition()
    op = this.changeBySpeed(op)
    this.adjustBox(op.left, op.top, op.w, op.h, true)
  }
  addTransition(){
    this.transition = 'all 0.2s'
  }
  removeTransition(){
    this.transition = ''
  }

  changeBySpeed(op){
    let me = this
    for(let key in op){
      op[key] = Math.round(op[key]/me.speed) * me.speed
    }
    return op
  }
  getSizeOp(){
    return {
      w : this.w,
      h : this.h ,
      left : this.left,
      top : this.top
    }
  }

  getBoundSize(){
    let layoutBox = $("#canvas-container");
    let boxoffset = this.box.offset();
    let obj = {};
    obj.parentWidth = layoutBox.width();
    obj.parentHeight = layoutBox.height();
    obj.top = Math.floor(boxoffset.top - this.parentOffset.top);
    obj.left = Math.floor(boxoffset.left - this.parentOffset.left);
    obj.right = layoutBox.outerWidth(true) - this.w - boxoffset.left ;
    obj.bottom =( layoutBox.outerHeight(true) + this.parentOffset.top ) - this.h - boxoffset.top;
    obj.w = this.w;
    obj.h = this.h;
    return obj;
  }


  render(h){
    const rbRadius = ['nw','n','ne','e','w','sw','s','se']
    let rbMap = <div class="ylf-rb"  style={{display:this.isEditor?"block":"none"}} >
                {
                  rbRadius.map((it)=>{
                    return <div class={"ylf-rb__radius ylf-rb--"+it+"-resize"}
                            onMousedown={this.rbScaleMouseDown.bind(this,it)}>
                          </div>
                  })
                }
               </div>
    return (
      <div class="ylf-element" id={this.options.id}
           onMousedown={this.handlerMouseDown} onClick={this.handlerClick}  onContextmenu={this.handleContextMenu}
           style={this.boxStyle}>
           {this.$slots.default}
           {rbMap}
      </div>
    )
  }

  get boxStyle(){
    let styleObj = {
        width: this.w +'px',
        height: this.h +'px',
        left: this.left +"px",
        top : this.top + "px",
        transition : this.transition
    }
    return styleObj;

  }
  get contentBoxStyle(){
    return {
      width :this.w +'px',
      height : this.h  + "px"
    }
  }

  setSize(size){
    this.top = int(size.y);
    this.left = int(size.x);
    this.w = int(size.width);
    this.h = int(size.height);
  }
}
