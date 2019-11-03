import Sprite   from '../base/sprite'
import Bullet from '../bullet/bullet1'
import DataBus  from '../databus'
import Halo from './halo'
import {
  playerImag
} from '../utils/common'
const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/player.png'
const PLAYER_WIDTH   = 30
const PLAYER_HEIGHT  = 30

let databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕底部居中位置
    this.init()
    // 初始化事件监听
    // this.initEvent()
  }
  init(){
    this.x = databus.playTempX
    this.y = databus.playTempY
    this.bodyImg = playerImag(1)
    this.lagImg1 = playerImag(2)
    this.lagImg2 = playerImag(3)
    this.lifeValue = 1e2
    this.allLifeValue = 1e2
    // this.x = 0
    // this.y = 0
    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.bullets = []
  }
  drawToCanvas(ctx) {
    if (!this.visible)
      return
   
    let bu  = null
    if (databus.touched){
      bu = databus.frame % 10 > 5 ? this.lagImg1 : this.lagImg2
    }else{
      bu = this.lagImg1
    }
    // let bu = this.lagImg1
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotateLag * Math.PI / 180)
    ctx.drawImage(
      bu,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    )
    ctx.restore()

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotateBody * Math.PI / 180 + 45.15)
    ctx.drawImage(
      this.bodyImg,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    )
    ctx.restore()

    
    // ctx.beginPath();
    // ctx.lineWidth = 5;
    // ctx.arc(0, 0, 15+2 * this.lifeValue , 0, 2 * Math.PI);
    // ctx.stroke();
    

  }
  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(   x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation  )
  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    let disY = y - this.height / 2

    if ( disX < 0 )
      disX = 0

    else if ( disX > screenWidth - this.width )
      disX = screenWidth - this.width

    if ( disY <= 0 )
      disY = 0

    else if ( disY > screenHeight - this.height )
      disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if ( this.checkIsFingerOnAir(x, y) ) {
        this.touched = true

        this.setAirPosAcrossFingerPosZ(x, y)
      }

    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      if ( this.touched )
        this.setAirPosAcrossFingerPosZ(x, y)

    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false
    }).bind(this))
  }

  /**
   * 玩家射击操作
   * 射击时机由外部决定
   */
  shoot() {
    // if (databus.frame % 30 > 20) {
    //   return
    // }
    let mx = databus.shootX
    let my = databus.shootY

    // this.x = this.x - 1
    // this.y = this.x - 1
    if (mx == 0 && my==0){}else{
      // let bullet = databus.pools.getItemByClass('bullet', Bullet)
      // bullet.init(
      //   this.x,
      //   this.y,
      //   databus.shootSpeed,
      //   mx,
      //   my
      // )
      // databus.bullets.push(bullet)
      // let bullet = databus.pool.getItemByClass('bullet', Bullet)
      let bullet = databus.pools.getItemByClass(databus.bulletClass.name, databus.bulletClass.class)
      // let bullet = new Bullet()
      let px = this.x + 27 * Math.cos(this.rotateBody * Math.PI / 180 -45.3)
      let py = this.y + 27 * Math.sin(this.rotateBody * Math.PI / 180 - 45.3)
      bullet.init(
        px,
        py,
        databus.shootSpeed,
        mx,
        my
      )
      databus.bullets.add(bullet)
    }
    
  }
}
