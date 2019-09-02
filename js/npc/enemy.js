import Animation from '../base/animation'
import DataBus   from '../databus'
import { getRoteImg } from '../utils/index'


const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()



export default class Enemy extends Animation {
  constructor(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT) {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
    this.initExplosionAnimation()
  }

  init(speed, lifeValue,x ,y ) {
    this.x = x
    this.y = y
    this.score = lifeValue
    this.lifeValue = lifeValue
    this[__.speed] = speed
    this.visible = true
  }
  
  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []
    const EXPLO_IMG_PREFIX  = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19
    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }
    this.initFrames(frames)
  }
  getPosition(player){
    let px = player.x + player.width/2
    let py = player.y + player.height/2
    let lpx = Math.abs(this.x - player.x)
    let lpy = Math.abs(this.y - player.y)
    let tempx = 0
    let tempy = 0
    if(lpx>lpy){
      tempx = player.x > this.x ? this.x+this[__.speed]:this.x-this[__.speed]
      tempy = player.y > this.y ? this.y + lpy / lpx : this.y - lpy / lpx
    }else{
      tempy= player.y > this.y ? this.y+this[__.speed] : this.y-this[__.speed]
      tempx = player.x > this.x ? this.x + lpx / lpy : this.x - lpx / lpy
    }
    this.x = tempx 
    this.y = tempy 
    // console.log(this.x, tempx * this[__.speed], tempx, this[__.speed],'+++++++++++++++++++')
    getRoteImg({
      x1 : this.x,
      x2 : player.x,
      y1 : this.y,
      y2 : player.y
    },
      this
    )
  }
  // 每一帧更新子弹位置
  update(player) {
    this.getPosition(player)
    // this.y += this[__.speed]
    // 对象回收
    if ( this.y > window.innerHeight + this.height )
      delete this
      // databus.removeEnemey(this)
  }
}
