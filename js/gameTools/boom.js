import DataBus from '../databus'
// import rightHandShank from './righthandshank'


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
import {
  boom1
} from '../utils/common'

let atlas4 = new Image()
let databus = new DataBus()
const PLAYER_WIDTH = 30
const PLAYER_HEIGHT = 30
atlas4.src = "images/boom.png"
export default class Boom {
  constructor(x,y) {
    // 玩家默认处于屏幕底部居中位置
    // this.x = 100
    
  }
  init(x, y) {
    this.x = x
    this.y = y
    this.name = 'boom'
    this.visible = true
    this.isBoom = false
    this.boom1 = boom1
    this.boomTime = 1
    this.maxBoomTime = 80//最大爆炸范围
    this.width = PLAYER_WIDTH
    this.height = PLAYER_HEIGHT
  }
  drawToCanvas(ctx) {
    if (!this.isBoom) {//will booming
      ctx.save()
      ctx.translate(this.x, this.y)
      if (databus.frame % 40 < 10) {
        ctx.scale(databus.frame % 40 / 20, databus.frame % 40 / 20);
      }
      ctx.drawImage(
        atlas4,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      )
      ctx.restore()
    } else {////be booming
      ctx.save()
      ctx.translate(this.x, this.y)
      if (this.boomTime<19){
        ctx.drawImage(
          this.boom1[19 - Math.ceil(this.boomTime)],
          -100/ 2,
          -100 / 2,
          100,
          100
        )
        
      }
      for (let i = 0; i < 10; i++) {
        let aplte = i / 10
        ctx.beginPath();
        ctx.strokeStyle = "rgba(206, 118, 46, " + aplte * ((50 - this.boomTime) / 50) + ")";
        ctx.lineWidth = 4;
        // ctx.shadowOffsetX = 1;
        // ctx.shadowOffsetY = 1;
        // ctx.shadowBlur = 20;
        // ctx.shadowColor = "#ce762ea1";
        ctx.arc(0, 0, this.boomTime + i+20, 0, 2 * Math.PI);
        ctx.stroke();
      }
      ctx.restore()
    }
    


    // if (databus.frame % 40 !== 0) {
    //   ctx.scale(2, 2);
    // }


  }
  checkIsFingerOnEnemy(enemy) {
    if (this.isBoom) {
      let l = Math.sqrt(Math.pow((this.x - enemy.x), 2) + Math.pow((this.y - enemy.y), 2))
      return l < this.boomTime + 25 + enemy.width / 2 - 10;
    } else {
      return false
    }
  }

  checkIsFingerOnAir(player) {
    let l = Math.sqrt(Math.pow((this.x - player.x), 2) + Math.pow((this.y - player.y), 2))
    return l > player.width;
  }
  update(player) {
    if (!this.visible)
      return 
    if (!this.checkIsFingerOnAir(player)) {
      this.isBoom = true
    }
    if (this.isBoom) {
      this.boomTime += .5
    }
    if (this.boomTime > this.maxBoomTime) {
      this.visible = false
      databus.pools.recover(this.name, this)
    }
    // if (this.visible) {
    //   databus.gameTools = []
    //   delete this
    // }
  }
}

