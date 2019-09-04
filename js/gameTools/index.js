import DataBus from '../databus'
// import rightHandShank from './righthandshank'


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


let atlas4 = new Image()
let databus = new DataBus()
const PLAYER_WIDTH = 30
const PLAYER_HEIGHT = 30
atlas4.src = 'images/return.png'

export default class GameTools {
  constructor() {
    // 玩家默认处于屏幕底部居中位置
    // this.x = 100
    this.x = 100
    this.y = 100

    
    this.width = PLAYER_WIDTH
    this.height = PLAYER_HEIGHT
  }
  checkIsFingerOnEnemy(enemy) {
    return false
  }
  drawToCanvas(ctx) {
    // if (!this.visible)
    //   return
    ctx.save()
    ctx.translate(this.x, this.y)
    if (databus.frame % 40 <20) {
      ctx.scale(databus.frame % 40/20, databus.frame % 40/20);
    }
    ctx.drawImage(
      atlas4,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    )
  
    
    // if (databus.frame % 40 !== 0) {
    //   ctx.scale(2, 2);
    // }
    ctx.restore()

  }


  checkIsFingerOnAir(player) {
    let l = Math.sqrt(Math.pow((this.x - player.x), 2) + Math.pow((this.y - player.y ), 2))
    return l > Math.abs(this.width - player.width); 
  }
  update(player) {
    if (!this.checkIsFingerOnAir(player)){
      databus.shootSpeed =10
      databus.gameTools = []
      delete this
    }
  }
}

