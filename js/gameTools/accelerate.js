import DataBus from '../databus'
// import rightHandShank from './righthandshank'


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
import {
  speedIcon
} from '../utils/common'

let atlas4 = new Image()
let databus = new DataBus()
const PLAYER_WIDTH = 30
const PLAYER_HEIGHT = 30
atlas4.src = "images/accelerate.png"
export default class Boom {
  constructor(x, y) {
  }
  init( x, y) {
    // 玩家默认处于屏幕底部居中位置
    // this.x = 100
    this.x = x
    this.speedIcon = speedIcon()
    this.name='accelerate'
    this.y = y
    this.visible = true
    this.isBoom = false
    this.boomTime = 1
    this.maxBoomTime = 1e2//最大爆炸范围
    this.width = PLAYER_WIDTH
    this.height = PLAYER_HEIGHT
  }
  drawToCanvas(ctx) {
    if (!this.isBoom) {//will booming
      ctx.save()
      ctx.translate(this.x, this.y)
      if (databus.frame % 40 < 20) {
        ctx.scale(databus.frame % 20 / 20, databus.frame % 20 / 20);
      }
      ctx.drawImage(
        this.speedIcon,
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
    if (!this.checkIsFingerOnAir(player) && !this.isBoom) {
      // databus.createSpeed+=1
      databus.playerSpeed++
      // player.lifeValue++
      this.boomTime = 0
      this.isBoom = true
    }
    if (this.isBoom) {
      this.boomTime += 1
    }
    if (this.boomTime > this.maxBoomTime) {
      databus.playerSpeed-=.5
      this.visible = false
      databus.pools.recover(this.name, this)
    }
    // if (this.visible) {
    //   databus.gameTools = []
    //   delete this
    // }
  }
}

