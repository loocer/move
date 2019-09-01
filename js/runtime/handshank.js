import DataBus from '../databus'
// import rightHandShank from './righthandshank'


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


let atlas = new Image()
let atlas2 = new Image()
let atlas3 = new Image()
let atlas4 = new Image()
let databus = new DataBus()
let y = 30
const PLAYER_WIDTH = 120
const PLAYER_HEIGHT = 120
atlas.src = 'images/handshank.png'
atlas2.src = 'images/on-fire.png'
atlas3.src = 'images/32.png'
atlas4.src = 'images/on-way.png'
// atlas4.src = 'images/bg1.jpg'

export default class HandShank {
  constructor(rightHandShank) {
    // 玩家默认处于屏幕底部居中位置
    // this.x = 100
    this.rightHandShank = rightHandShank
    this.x = 100
    this.y = screenHeight - PLAYER_HEIGHT - 40

    this.touchedx = 0
    this.touchedy = 0

    this.width = PLAYER_WIDTH
    this.height = PLAYER_HEIGHT

    this.isInsite = false

    this.tx = 100
    this.ty = screenHeight - PLAYER_HEIGHT - 40
    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.bullets = []

    this.touchstartEvent = null
    this.touchmoveEvent = null
    // 初始化事件监听
    this.initEvent()
  }

  renderHandShank(ctx, player) {
    ctx.drawImage(
      atlas,
      0, 0, 300, 300,
      this.x,
      this.y,
      this.width, this.height
    )
    ctx.drawImage(
      atlas2,
      0, 0, 300, 300,
      this.tx,
      this.ty,
      this.width, this.height
    )
    ctx.save()
    ctx.translate(this.x + this.width/2, this.y + this.height/2)
    // console.log(player.rotate)
    ctx.rotate(player.rotate * Math.PI / 180)
    ctx.drawImage(
      atlas4,
      0, 0, 300, 184,
      -60,
      -74,
      120, 94
    )
    ctx.restore()
   
    if (this.touched && databus.x){
      ctx.drawImage(
        atlas3,
        0, 0, 300, 300,
        100 + databus.transX,
        screenHeight - PLAYER_HEIGHT - 40 + databus.transY,
        this.width, this.height
      )
    }
    
  }
  _formatMovePosition(x,y){
    databus.x = x
    databus.y = y
    let centerX = ~~(this.x - databus.transX + this.width / 2)
    let centerY = ~~(this.y - databus.transY + this.height / 2)
    let tempx = Math.abs((x - centerX) / 20) > 2 ? 2 : 1
    let tempy = Math.abs((y - centerY) / 20) > 2 ? 2 : 1
    databus.moveX = x > centerX ? tempx : -tempx
    databus.moveY = y > centerY ? tempy : -tempy

  }
  /**
    * 当手指触摸屏幕的时候
    * 判断手指是否在飞机上
    * @param {Number} x: 手指的X轴坐标
    * @param {Number} y: 手指的Y轴坐标
    * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
    */
  checkIsFingerOnAir(x, y) {
    console.log(console.log(x,y,'++++++++++++++++++++++'))
    let thisx = this.x - databus.transX
    let thisy = this.y - databus.transY
    const deviation = 30
    return !!(x >= thisx - deviation
      && y >= thisy - deviation
      && x <= thisx + this.width + deviation
      && y <= thisy + this.height + deviation)
  }


  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    this.touchstartEvent = (e) => {
      // wx.showToast({
      //   title: '成功',
      //   icon: 'success',
      //   duration: 2000
      // })
      console.log(e)
      e.preventDefault()
      for (let p of e.touches) {
        let x = p.clientX
        let y = p.clientY
        //
        if (this.checkIsFingerOnAir(x, y)) {
          this.touched = true
          this.isInsite = true
          this.touchedx = x
          this.touchedy = y
          this._formatMovePosition(x, y)
        }
        if (this.rightHandShank.checkIsFingerOnAir(x, y)) {
          this.rightHandShank.touched = true
          this.rightHandShank._formatMovePosition(x, y)
          this.rightHandShank.touchedx = x
          this.rightHandShank.touchedy = y
        }
      }

    }
    // canvas.addEventListener('touchstart', ((e) => {
    //   console.log(e)
    //   e.preventDefault()
    //   for (let p of e.touches){
    //     let x = p.clientX
    //     let y = p.clientY
    //     //
    //     if (this.checkIsFingerOnAir(x, y)) {
    //       this.touched = true
    //       this.touchedx = x
    //       this.touchedy = y
    //       this._formatMovePosition(x, y)
    //     }
    //     if (this.rightHandShank.checkIsFingerOnAir(x,y)){
    //       this.rightHandShank.touched = true
    //       this.rightHandShank._formatMovePosition(x, y)
    //       this.rightHandShank.touchedx = x
    //       this.rightHandShank.touchedy = y
    //     }
    //   }

    // }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()
      for (let p of e.touches) {
        let x = p.clientX
        let y = p.clientY
        let lleft = (x - this.touchedx) * (x - this.touchedx) + (y - this.touchedy) * (y - this.touchedy)
        let lright = (x - this.rightHandShank.touchedx) * (x - this.rightHandShank.touchedx) + (y - this.rightHandShank.touchedy) * (y - this.rightHandShank.touchedy)
        if(lleft < lright){
          // this.tx = x
          // this.ty = y
          this._formatMovePosition(x,y)
          let l = Math.pow(160 - x, 2) + Math.pow(screenHeight - PLAYER_HEIGHT +20 - y, 2)
          // console.log(140 - x, screenHeight - 120 - y,l)
          if (l<3600) {
            // this.handShank.tx = databus.x + databus.transX - 30
            // this.handShank.ty = databus.y + databus.transY - 30
            this.isInsite = true
            // this.handShank.tx = databus.x + databus.transX - 30
          }else{
            // console.log(this.tx,'出去了。。。。。')
            this.isInsite = false
          }
        }else{
          this.rightHandShank._formatMovePosition(x,y)
        }
      }
      
    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      console.log(e)
      for (let obj of e.changedTouches){
        let x = obj.clientX
        let y = obj.clientY
        let lleft = (x - this.touchedx) * (x - this.touchedx) + (y - this.touchedy) * (y - this.touchedy)
        let lright = (x - this.rightHandShank.touchedx) * (x - this.rightHandShank.touchedx) + (y - this.rightHandShank.touchedy) * (y - this.rightHandShank.touchedy)
        if (lleft < lright) {
          this.tx = 100 + databus.transX
          this.ty = screenHeight - PLAYER_HEIGHT - 40 + databus.transY
          this.isInsite = false
          this.touched = false
        }else{
          this.rightHandShank.touched = false
        }
      }
    }).bind(this))
  }
}

