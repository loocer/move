import Animation from '../base/animation'
import DataBus from '../databus'
import Corpses from './corpses.js'
import { getRoteImg } from '../utils/index'

const ENEMY_WIDTH = 30
const ENEMY_HEIGHT = 30

let databus = new DataBus()
let atlas = new Image()
atlas.src = 'images/on-fire.png'
export default class Enemy extends Animation {
  constructor() {
    super("", ENEMY_WIDTH, ENEMY_HEIGHT)
    this.initExplosionAnimation()
  }
  setImage(imgs) {
    let temps = []
    for(let img of imgs){
      let imgObj = new Image()
      imgObj.src = img
      temps.push(imgObj)
    }
    return temps
  }
  init(speed, lifeValue, x, y, imgSrcs, del1s) {
    this.x = x
    this.y = y
    // this.srcImg = srcImg
    this.imgs = this.setImage(imgSrcs)
    // this.img.src = imgSrc
    this.del1s = del1s
    this.frame = 0
    this.frameSpeed = 1/speed*5
    this.score = lifeValue
    this.lifeValue = lifeValue
    this.speed = speed
    this.visible = true
    this.onlive = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    // let frames = []
    // const EXPLO_IMG_PREFIX  = 'images/explosion'
    // const EXPLO_FRAME_COUNT = 400
    // for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
    //   // frames.push(EXPLO_IMG_PREFIX + 1 + '.png')
    //   frames.push('images/bg1.jpg')
    // }
    // // frames.push('images/bg1.jpg')
    // this.initFrames(frames)
  }
  playOvers() {
    let corpses = databus.pools.getItemByClass('corpses', Corpses)
    corpses.init(atlas, this.x - 20, this.y - 20, this.del1s)
    databus.corpses.add(corpses)
  }
  getPosition(player) {
    let px = player.x + player.width / 2
    let py = player.y + player.height / 2
    let lpx = Math.abs(this.x - player.x)
    let lpy = Math.abs(this.y - player.y)
    let tempx = 0
    let tempy = 0
    if (lpx > lpy) {
      tempx = player.x > this.x ? this.x + this.speed : this.x - this.speed
      tempy = player.y > this.y ? this.y + lpy / lpx : this.y - lpy / lpx
    } else {
      tempy = player.y > this.y ? this.y + this.speed : this.y - this.speed
      tempx = player.x > this.x ? this.x + lpx / lpy : this.x - lpx / lpy
    }
    this.x = tempx
    this.y = tempy
    getRoteImg({
      x1: this.x,
      x2: player.x,
      y1: this.y,
      y2: player.y
    },
      this
    )
  }
  drawToCanvas(ctx) {
    if (!this.visible)
      return
    // ctx.translate(-(this.x - databus.transX + this.width / 2), -(this.y - databus.transY + this.height / 2))
    // ctx.translate(this.x - databus.transX + this.width/2, this.y - databus.transY+ this.height/2)
    // ctx.translate(-this.x , -this.y)

    // ctx.drawImage(
    //   this.img,
    //   this.x,
    //   this.y,
    //   this.width,
    //   this.height
    // )
    if (this.frame % this.frameSpeed < this.frameSpeed/2) {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotate * Math.PI / 180)
      ctx.drawImage(
        this.imgs[0],
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      )
      ctx.restore()
    }
    if (this.frame % this.frameSpeed >= this.frameSpeed / 2) {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotate * Math.PI / 180)
      ctx.drawImage(
        this.imgs[1],
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      )
    }
    // ctx.save()
    // ctx.translate(this.x, this.y)
    // ctx.rotate(this.rotate * Math.PI / 180)
    // ctx.drawImage(
    //   this.img,
    //   -this.width / 2,
    //   -this.height / 2,
    //   this.width,
    //   this.height
    // )
    // ctx.beginPath();
    // ctx.lineWidth = 5;
    // ctx.arc(0, 0, 15+2 * this.lifeValue , 0, 2 * Math.PI);
    // ctx.stroke();
    ctx.restore()

  }
  // 每一帧更新子弹位置
  update(player) {
    if (!this.visible)
      return 
    this.frame++
    this.width = ENEMY_WIDTH + this.lifeValue * 4
    this.height = ENEMY_HEIGHT + this.lifeValue * 4
    this.getPosition(player)
    // this.y += this.speed
    // 对象回收
    // if ( this.y > window.innerHeight + this.height )
    //   // databus.pools.recover('enemy', this)
    //   delete this
    //   // databus.removeEnemey(this)
  }
}
