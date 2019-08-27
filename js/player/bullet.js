import Sprite   from '../base/sprite'
import DataBus  from '../databus'

const BULLET_IMG_SRC = 'images/bullet.png'
const BULLET_WIDTH   = 16
const BULLET_HEIGHT  = 30
const screenWidth = window.innerWidth 
const screenHeight = window.innerHeight 
const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()
export default class Bullet extends Sprite {
  constructor() {
    super(BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT)
  }
  _movePosition(){
    let centerX = this.x + this.width / 2
    let centerY = this.y + this.height / 2
    let tempx = Math.abs((x - centerX) / 20) > 2 ? 1 : .5
    let tempy = Math.abs((y - centerY) / 20) > 2 ? 1 : .5
    databus.moveX = x > centerX ? tempx : -tempx
    databus.moveY = y > centerY ? tempy : -tempy
  }
  init(x, y, speed,mx,my) {
    this.x = x
    this.y = y
    this.moveX = mx
    this.moveY = my
    this[__.speed] = speed

    this.visible = true
  }

  // 每一帧更新子弹位置
  update() {
    this.y += this.moveY * this[__.speed]
    this.x += this.moveX * this[__.speed]
    // 超出屏幕外回收自身
    // console.log(this.y, this.moveY,'====================')
    if (this.y < 0
      || this.y > screenHeight
      ||this.x < 0
      ||this.x > screenWidth
     )
    // databus.removeBullets(this)
    delete this
  }
}
