import DataBus from '../databus'
// import rightHandShank from './righthandshank'
import Bullet1 from '../bullet/bullet1'
import Bullet2 from '../bullet/bullet2'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
import {
  bullets
} from '../utils/common'
import {
  rnd
} from '../utils/index'

let atlas4 = new Image()
let databus = new DataBus()
const PLAYER_WIDTH = 10
const PLAYER_HEIGHT = 20
atlas4.src = "images/bullet.png"
export default class Boom {
  constructor(x, y) {
    // 玩家默认处于屏幕底部居中位置
    // this.x = 100
    
  }
init(x,y){
  this.x = x
  this.y = y
  this.name = 'changeBullet'
  this.bullet = bullets[rnd(0, bullets.length)]
  this.visible = true
  this.isBoom = false
  this.boomTime = 1
  this.maxBoomTime = 1e3
  this.width = PLAYER_WIDTH
  this.height = PLAYER_HEIGHT
}
  drawToCanvas(ctx) {
    if (!this.isBoom) {//will booming
      ctx.save()
      ctx.translate(this.x, this.y)
      // if (databus.frame % 40 < 20) {
      //   ctx.scale(databus.frame % 40 / 20, databus.frame % 40 / 20);
      // }
      ctx.drawImage(
        this.bullet.img,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      )
      ctx.restore()
    } else {////be booming

    }
  }
  checkIsFingerOnEnemy(enemy) {
    return false
  }
  checkIsFingerOnAir(player) {
    let l = Math.sqrt(Math.pow((this.x - player.x), 2) + Math.pow((this.y - player.y), 2))
    return l > Math.abs(this.width - player.width);
  }
  update(player) {
    if (!this.visible)
      return 
    if (!this.checkIsFingerOnAir(player)) {
      databus.bulletClass = {
        name: this.bullet.bulletName,
        class: this.bullet.bulletClass
      } 
      this.boomTime = 0
      this.isBoom = true
    }
    if (this.isBoom) {
      this.boomTime += 1
    }
    if (this.boomTime > this.maxBoomTime) {
      databus.bulletClass = {
        name: 'bullet1',
        class: Bullet1
      } 
      this.visible = false
      databus.pools.recover(this.name, this)
    }
    // if (this.visible) {
    //   databus.gameTools = []
    //   delete this
    // }
  }
}

