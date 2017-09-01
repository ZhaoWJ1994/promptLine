/**
 * Created by zhao on 2017/5/10.
 */
function uniq(arr) {
    let res = [];
    let json = {};
    for (let i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}
export default class promptLine {
    constructor() {
        this.speed = 5
        this.elementPos = {
            left: [],
            top: [],
            stLeft: [],
            stTop: []
        }
        this.leftStyle = []
        this.topStyle = []
        this.selectArrLeft = []
        this.selectArrTop = []
        this.styleArr = []
        this.selectId = ''
        this.getAppDom()
    }

    jumpSpeed(num) {
        return Math.round(num / this.speed) * this.speed
    }

    getAppDom() {
        this.dom = document.getElementsByClassName('line-container')[0]
        if (this.dom) {
            this.halfWidth = this.dom.clientWidth / 2
            this.halfHeight = this.dom.clientHeight / 2
        }
    }

    getChildDom(className) {
        this.child = Array.from(document.getElementsByClassName(className))
    }

    changeBySpeed() {
        let me = this
        this.selectArrLeft.forEach(item => {
            item.position = me.jumpSpeed(item.position)
        })
        this.selectArrTop.forEach(item => {
            item.position = me.jumpSpeed(item.position)
        })
    }

    upDate(id, className) {
        if (!this.dom) {
            this.getAppDom()
        }
        this.getChildDom(className)
        this.setSelectId(id)
        this.countElementPos(this.init())
        this.concatArr()
        this.createLine()
    }

    init() {
        let option = {}
        if (this.child instanceof Array) {
            this.child.forEach(item => {
                let cObj = {
                    height: item.style.height,
                    width: item.style.width,
                    x: item.style.left,
                    y: item.style.top
                }
                option[item.id] = cObj
            })
        }
        return option
    }

    createLine() {
        let domStr = `
                    <div class="vertical_line select_verticalLine" id="half_vertical_line" style="left:${this.halfWidth}px;"></div>
                    <div class="horizon_line select_horizonLine" id="half_horizon_line" style="top:${this.halfHeight}px;"></div>
                    `
        this.styleArr.forEach(item => {
            let lineStr
            if (item.type === 'left') {
                if (item.select) {
                    lineStr = `<div class="vertical_line" style="left:${item.position}px"></div>`
                } else {
                    lineStr = `<div class="vertical_line select_verticalLine" style="left:${item.position}px"></div>`
                }
            } else if (item.type === 'top') {
                if (item.select) {
                    lineStr = `<div class="horizon_line" style="top:${item.position}px"></div>`
                } else {
                    lineStr = `<div class="horizon_line select_horizonLine" style="top:${item.position}px"></div>`
                }
            }
            domStr += lineStr
        })
        this.putInDom(domStr)
    }

    putInDom(str) {
        if (this.dom) {
            this.dom.innerHTML = str
        }
        // 检测是否有中值
        this.checkHalfLine()
    }

    setSelectId(e) {
        this.selectId = e
    }

    countElementPos(e) {
        // 每次计算的时候都需要将以前数据清除
        this.clearElementPos()
        // 对对象进行循环
        for (let key in e) {
            let x = parseInt(e[key].x, 0)
            let y = parseInt(e[key].y, 0)
            let h = parseInt(e[key].height, 0)
            let w = parseInt(e[key].width, 0)
            let tTop = y
            let tBottom = y + h
            let lLeft = x
            let lRight = x + w
            this.centerLeft = x + w / 2
            this.centerTop = y + h / 2
            if (key === this.selectId) {
                this.elementPos.stLeft = this.elementPos.stLeft.concat([lLeft, lRight])
                this.elementPos.stTop = this.elementPos.stTop.concat([tTop, tBottom])
                this.selectArrLeft = [lLeft, lRight].map(item => {
                    return {
                        type: 'left',
                        position: item,
                        select: true
                    }
                })
                this.selectArrTop = [tTop, tBottom].map(item => {
                    return {
                        type: 'top',
                        position: item,
                        select: true
                    }
                })
            } else {
                this.elementPos.left = this.elementPos.left.concat([lLeft, lRight])
                this.elementPos.top = this.elementPos.top.concat([tTop, tBottom])
            }
        }
        this.checkCoincidence()
    }

    clearElementPos() {
        this.elementPos = {
            left: [],
            top: [],
            stLeft: [],
            stTop: []
        }
        this.leftStyle = []
        this.topStyle = []
    }

    clearSelectLine() {
        this.selectArrLeft = []
        this.selectArrTop = []
    }

    checkCoincidence() {
        let me = this

        // 检测是否有重复值
        let repeatObj = {
            lRepeat: me.judgeArrRepeat(me.elementPos.left, me.elementPos.stLeft),
            tRepeat: me.judgeArrRepeat(me.elementPos.top, me.elementPos.stTop)
        }
        me.highLightBox(repeatObj)
        for (let key in repeatObj) {
            if (repeatObj[key] instanceof Array && repeatObj[key].length > 0) {
                repeatObj[key].forEach(function(e) {
                    if (key === 'lRepeat') {
                        me.leftStyle.push({
                            type: 'left',
                            position: e,
                            select: false
                        })
                    } else if (key === 'tRepeat') {
                        me.topStyle.push({
                            type: 'top',
                            position: e,
                            select: false
                        })
                    }
                })
            }
        }
    }

    judgeArrRepeat(arr, reArr) {
        let resultArr = []
        let me = this
        reArr.forEach(check => {
            arr.forEach(source => {
                if (check - source < this.speed / 2 && -(this.speed / 2) < check - source) {
                    resultArr.push(me.jumpSpeed(check))
                }
            })
        })
        return uniq(resultArr)
    }

    checkHalfLine() {
        let domLeft = document.getElementById('half_vertical_line')
        if (this.centerLeft && domLeft) {
            if (this.centerLeft - this.halfWidth < this.speed / 4 && -(this.speed / 4) < this.centerLeft - this.halfWidth) {
                domLeft.style.display = 'block'
            } else {
                domLeft.style.display = 'none'
            }
        }
        let domTop = document.getElementById('half_horizon_line')
        if (this.centerTop && domTop) {
            if (this.centerTop - this.halfHeight < this.speed / 4 && -(this.speed / 4) < this.centerTop - this.halfHeight) {
                domTop.style.display = 'block'
            } else {
                domTop.style.display = 'none'
            }
        }
    }

    highLightBox(obj) {
        if (this.child instanceof Array) {
            this.child.forEach(item => {
                if (item.id === this.selectId) return
                let left = parseInt(item.style.left, 0)
                let right = parseInt(item.style.left, 0) + parseInt(item.style.width, 0)
                let top = parseInt(item.style.top, 0)
                let bottom = parseInt(item.style.top, 0) + parseInt(item.style.height, 0)
                let repeatArr = this.judgeArrRepeat([left, right], obj.lRepeat).concat(this.judgeArrRepeat([top, bottom], obj.tRepeat))
                if (repeatArr.length > 0) {
                    item.style.background = 'rgba(0, 147, 255, 0.5)'
                    item.style.opacity = 0.5
                } else {
                    item.style.background = null
                    item.style.opacity = 1
                }
            })
        }
    }

    clearStyleArr() {
        this.styleArr = []
    }

    concatArr() {
        this.clearStyleArr()
        this.styleArr = this.styleArr.concat(this.selectArrLeft, this.selectArrTop, this.leftStyle, this.topStyle)
    }

    destroyLine() {
        this.getAppDom()
        this.clearDomStyle()
        if (this.dom) {
            this.dom.innerHTML = ''
        }
    }

    clearDomStyle() {
        if (this.child instanceof Array) {
            this.child.forEach(item => {
                item.style.background = null
                item.style.opacity = 1
            })
        }
    }
}
