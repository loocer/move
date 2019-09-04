import DataBus from '../databus'
// import rightHandShank from './righthandshank'


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


let atlas4 = new Image()
let databus = new DataBus()
const PLAYER_WIDTH = 30
const PLAYER_HEIGHT = 30
atlas4.src = 'images/boom2.jpg'

export default class Boom {
  constructor() {
    // 玩家默认处于屏幕底部居中位置
    // this.x = 100
    this.x = 300
    this.y = 400
    this.isBoom = false
    this.boomTime = 1
    this.maxBoomTime = 30
    this.width = PLAYER_WIDTH
    this.height = PLAYER_HEIGHT
  }

  drawToCanvas(ctx) {
    // if (!this.visible)
    //   return
    if (!this.isBoom){
      ctx.save()
      ctx.translate(this.x, this.y)
      if (databus.frame % 40 < 20) {
        ctx.scale(databus.frame % 40 / 20, databus.frame % 40 / 20);
      }
      ctx.drawImage(
        atlas4,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      )
      
    }else{
      ctx.save()
      ctx.translate(this.x, this.y)
      
      for(let i=0;i<20;i++){
        let aplte = i/40
        ctx.beginPath();
        ctx.strokeStyle = "rgba(206, 118, 46, " + aplte+")";
        ctx.lineWidth = 4;
        // ctx.shadowOffsetX = 1;
        // ctx.shadowOffsetY = 1;
        // ctx.shadowBlur = 20;
        // ctx.shadowColor = "#ce762ea1";
        ctx.arc(-this.width / 2, -this.height / 2, this.boomTime+i, 0, 2 * Math.PI);
        ctx.stroke();
      }
      ctx.drawImage(
        atlas4,
        -this.width / 2 - (this.boomTime / 2 + 5)/2,
        -this.height/2 - (this.boomTime / 2 + 5) / 2,
        this.boomTime / 2 + 5,
        this.boomTime / 2 + 5
      )
    }
    ctx.restore()


    // if (databus.frame % 40 !== 0) {
    //   ctx.scale(2, 2);
    // }
   

  }
  checkIsFingerOnEnemy(enemy) {
    if (this.isBoom){
      let l = Math.sqrt(Math.pow((this.x - enemy.x), 2) + Math.pow((this.y - enemy.y), 2))
      return l < this.boomTime+20;
    }else{
      return false
    }
    
  }

  checkIsFingerOnAir(player) {
    let l = Math.sqrt(Math.pow((this.x - player.x), 2) + Math.pow((this.y - player.y), 2))
    return l > Math.abs(this.width - player.width);
  }
  update(player) {
    if (!this.checkIsFingerOnAir(player)) {
      this.isBoom = true
    }
    if(this.isBoom){
      this.boomTime+=0.2
    }
    if (this.boomTime > this.maxBoomTime){
      this.visible = true
    }
    if(this.visible){
      databus.gameTools = []
      delete this
    }
  }
}

