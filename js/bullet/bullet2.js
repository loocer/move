import Sprite from '../base/sprite'
import DataBus from '../databus'
import { getRoteImg } from '../utils/index'
const BULLET_IMG_SRC = 'images/bullet.png'
import {
  groundWidth,
  groundHeight,
  screenWidth,
  screenHeight
} from '../utils/common'
const BULLET_WIDTH = 1
const BULLET_HEIGHT = 20


let databus = new DataBus()
export default class Bullet extends Sprite {
  constructor() {
    super(BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT)
  }
  _movePosition() {
    let centerX = this.x + this.width / 2
    let centerY = this.y + this.height / 2
    let tempx = Math.abs((x - centerX) / 20) > 2 ? 1 : .5
    let tempy = Math.abs((y - centerY) / 20) > 2 ? 1 : .5
    if(tempx == tempy&&tempx == .5){
      tempx = 1
      tempy = 1
    }
    databus.moveX = x > centerX ? tempx : -tempx
    databus.moveY = y > centerY ? tempy : -tempy
    
  }
  init(x, y, speed, mx, my) {
    this.x = x
    this.y = y
    this.name = 'bullet2'
    this.moveX = mx
    this.moveY = my
    // databus.createSpeed = 20
    this.speed = speed
    getRoteImg({
      x1: this.x + this.moveX,
      x2: this.x,
      y1: this.y + this.moveY,
      y2: this.y,
    },
      this
    )
    this.visible = true
  }
  // drawToCanvas(ctx) {
  //   if (!this.visible)
  //     return
  //   ctx.save()
  //   ctx.translate(this.x, this.y)
  //   ctx.rotate(this.rotate * Math.PI / 180)
  //   ctx.beginPath()
  //   ctx.shadowBlur = 2;
  //   ctx.shadowColor = '#f30e0e'
  //   ctx.fillStyle = '#fff' // 矩形颜色
  //   ctx.fillRect(-3, -30, 3, 30)
  //   ctx.stroke()

  //   ctx.restore()

  // }
  // 每一帧更新子弹位置
  update() {
    if (!this.visible)
      return 
    getRoteImg({
      x1: this.x + this.moveX,
      x2: this.x,
      y1: this.y + this.moveY,
      y2: this.y,
    },
      this
    )
    this.y += this.moveY * this.speed
    this.x += this.moveX * this.speed
    // 超出屏幕外回收自身
    if (this.y < 0
      || this.y > groundHeight
      || this.x < 0
      || this.x > groundWidth
    ){
      this.visible = false
      databus.pools.recover(this.name, this)
      // databus.pools.recover('bullet', this)
    }
      
      // databus.removeBullets(this)
      // delete this
  }
}
