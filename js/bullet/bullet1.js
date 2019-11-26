import Sprite from '../base/sprite'
import DataBus from '../databus'
import {
  getRoteImg
} from '../utils/index'
import Music from '../runtime/music'
const BULLET_IMG_SRC = 'images/bullet.png'
const BULLET_WIDTH = 16
const BULLET_HEIGHT = 30
import {
  groundWidth,
  groundHeight,
  screenWidth,
  screenHeight
} from '../utils/common'


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
    databus.moveX = x > centerX ? tempx : -tempx
    databus.moveY = y > centerY ? tempy : -tempy
  }
  init(x, y, speed, mx, my) {
    this.name = 'bullet1'
    this.zx = x
    this.zy = y
    this.x = x
    this.y = y
    // databus.createSpeed = 20
    this.moveX = mx
    this.moveY = my
    this.speed = speed
    this.points = []
    this.visible = true
  }
  drawToCanvas(ctx) {

    ctx.save()
    if (!this.visible)
      return

    ctx.strokeStyle = '#fff';
    for (let i = 0; i < this.points.length; i++) {
      let rb = i / this.points.length * 1
      ctx.lineCap = "butt";
      // ctx.lineWidth = 2;
      if (i == 0) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.zx, this.zy)
        ctx.globalAlpha = rb;
        ctx.lineTo(this.points[0].x, this.points[0].y)
        ctx.stroke();
      } else {
        ctx.lineWidth = 5;
        if (i == this.points.length - 1) {
          ctx.lineCap = "round";
        }
        ctx.beginPath();
        ctx.globalAlpha = rb;
        ctx.moveTo(this.points[i - 1].x, this.points[i - 1].y)
        ctx.lineTo(this.points[i].x, this.points[i].y)
        ctx.stroke();
      }

    }
    // ctx.globalAlpha = "1";
    ctx.restore()
  }
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
    this.points.push({
      x: this.x,
      y: this.y
    })
    this.points = this.points.length > 3 ? this.points.slice(this.points.length - 3, this.points.length - 1) : this.points
    // 超出屏幕外回收自身
    // console.log(this.points, '====================')
    if (this.y < 0 ||
      this.y > groundHeight ||
      this.x < 0 ||
      this.x > groundWidth
    ) {
      this.visible = false
      databus.pools.recover(this.name, this)
      // databus.pools.recover('bullet', this)
    }
    // databus.removeBullets(this)

    // delete this
  }
}